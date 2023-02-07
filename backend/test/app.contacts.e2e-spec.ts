import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
    accountTest,
    contactShape,
    contactTest,
    loginTest,
    contactsTest,
    patchedContact,
    loginTest2,
    contactShapeUpdate,
} from './mocks/contacts';

describe('Integration Tests: contacts Routes', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let contact
    let token: string

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = app.get<PrismaService>(PrismaService);

        useContainer(app.select(AppModule), { fallbackOnErrors: true });
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

        await prisma.user.create({
            data: accountTest,
        });
        await app.init();
    });

    describe('POST ---> /contacts', () => {
        it('Should be able to create a contact', async () => {
            await request(app.getHttpServer())
                .post('/users')
                .send(accountTest);

            const response = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest);
            token = response.body.token
            const { status, body } = await request(app.getHttpServer())
                .post('/contacts')
                .send(contactTest[2])
                .set('Authorization', `Bearer ${token}`);
            contact = body
            expect(status).toBe(201);
            expect(body).toStrictEqual(contactShape);

        });

        it('Should not be able to create a contact without token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/contacts')
                .send(contactTest[0])
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to create a contact with incorrect body', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/contacts')
                .send(contactTest[1])
                .set('Authorization', `Bearer ${token}`);

            expect(status).toBe(400);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to create a contact name lower than 3 characters', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/contacts')
                .send(contactTest[1])
                .set('Authorization', `Bearer ${token}`);

            expect(status).toBe(400);
            expect(body).toHaveProperty('message');
        });
    });

    describe('GET ---> /contacts/:id', () => {
        it('Failed to list especific contact without authentication', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get(`/contacts/${accountTest.id}`)
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toStrictEqual({ "error": "Unauthorized", "message": "Invalid Token", "statusCode": 401 });
        });

        it('Failed to list especific contact with invalid id', async () => {
            const invalidId = '26aa9ab6-af31-42ba-9a83-5e79c33380e4';
            const userLoginResponse = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest);

            const { status, body } = await request(app.getHttpServer())
                .get(`/contacts/${invalidId}`)
                .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

            expect(status).toBe(404);
            expect(body).toStrictEqual({ "error": "Not Found", "message": "Contact does not exists!", "statusCode": 404 });
        });

        it('Failed to list especific user not contact', async () => {
            const userLoginResponse = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest);

            const { status, body } = await request(app.getHttpServer())
                .get(`/contacts/${accountTest.id}`)
                .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

            expect(status).toBe(404);
            expect(body).toStrictEqual({ "error": "Not Found", "message": "Contact does not exists!", "statusCode": 404 });
        });

        it('Should be able to returns especific contact', async () => {
            const userLoginResponse = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest);

            const { status, body } = await request(app.getHttpServer())
                .get(`/contacts/${contact.id}`)
                .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
            expect(status).toBe(200);
            expect(body).toStrictEqual(contactShape);
        });
    });

    describe('GET ---> /contacts/download/info', () => {
        it('Should not be able to show propeties by user with incorrect token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/contacts/download/info')
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to show propeties by user with incorrect email or password', async () => {
            const response = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest2);
            const { status, body } = await request(app.getHttpServer())
                .get('/contacts/user/info')
                .set('Authorization', `Bearer ${response.body.token}`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should be able to show all contacts from user by ID', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/contacts/user/info')
                .set('Authorization', `Bearer ${token}`);
            expect(status).toBe(200);
            expect(body).toHaveProperty('contacts');
            expect(body.contacts).toStrictEqual(
                expect.arrayContaining([contactShape]),
            );
        });
    });

    describe('GET ---> /contacts/user/info', () => {
        it('Should not be able to show propeties by user with incorrect token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/contacts/user/info')
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to show propeties by user with incorrect email or password', async () => {
            const response = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest2);
            const { status, body } = await request(app.getHttpServer())
                .get('/contacts/user/info')
                .set('Authorization', `Bearer ${response.body.token}`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should be able to show all contacts from user by ID', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/contacts/user/info')
                .set('Authorization', `Bearer ${token}`);
            expect(status).toBe(200);
            expect(body).toHaveProperty('contacts');
            expect(body.contacts).toStrictEqual(
                expect.arrayContaining([contactShape]),
            );
        });
    });

    describe('PATCH ---> /contacts/:id', () => {
        it('Should be able to update only owned contact', async () => {
            const { status, body } = await request(app.getHttpServer())
                .patch(`/contacts/${contact.id}`)
                .send(patchedContact)
                .set('Authorization', `Bearer ${token}`)

            expect(status).toBe(200)
            expect(body).toMatchObject({
                name: 'Felipe Almeida',
                email: 'felipee@mail.com',
                telephone: '+55 12 345678123'
            })
        })

        it('Should not be able to update a contact without token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .patch(`/contacts/${contact.id}`)
                .send(patchedContact)

            expect(status).toBe(401)
            expect(body).toHaveProperty('message')
        })
    })

    describe('DELETE ---> /contacts/:id', () => {
        it('Should not be able to delete contact with invalid token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .delete(`/contacts/${contact.id}`)
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should be able to delete contact with valid token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .delete(`/contacts/${contact.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(status).toBe(204);
            expect(body).toMatchObject({})
        });
    })
});
