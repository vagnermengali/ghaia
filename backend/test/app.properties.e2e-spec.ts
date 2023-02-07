import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
    accountTest,
    propertieShape,
    propertieTest,
    loginTest,
    propertiesTest,
    patchedPropertie,
    loginTest2,
    propertieShapeUpdate,
} from './mocks/properties';

describe('Integration Tests: Properties Routes', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let propertie
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

    describe('POST ---> /properties', () => {
        it('Should be able to create a propertie', async () => {
            await request(app.getHttpServer())
                .post('/users')
                .send(accountTest);

            const response = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest);
            token = response.body.token
            const { status, body } = await request(app.getHttpServer())
                .post('/properties')
                .send(propertieTest[0])
                .set('Authorization', `Bearer ${token}`);
            propertie = body
            expect(status).toBe(201);
            expect(body).toStrictEqual(propertieShape);

        });

        it('Should not be able to create a propertie without token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/properties')
                .send(propertieTest[0])
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to create a propertie with incorrect body', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/properties')
                .send(propertieTest[1])
                .set('Authorization', `Bearer ${token}`);

            expect(status).toBe(400);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to create a propertie name lower than 3 characters', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post('/properties')
                .send(propertieTest[1])
                .set('Authorization', `Bearer ${token}`);

            expect(status).toBe(400);
            expect(body).toHaveProperty('message');
        });
    });

    describe('GET ---> /properties', () => {
        it('Should not be able to show propeties by user with incorrect token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/properties/')
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });
    });

     describe('GET ---> /properties/:id', () => {
    it('Failed to list especific propertie without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/properties/${accountTest.id}`)
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toStrictEqual({"error": "Unauthorized", "message": "Invalid Token", "statusCode": 401});
    });

    it('Failed to list especific propertie with invalid id', async () => {
      const invalidId = '26aa9ab6-af31-42ba-9a83-5e79c33380e4';
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginTest);

      const { status, body } = await request(app.getHttpServer())
        .get(`/properties/${invalidId}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual({"error": "Not Found", "message": "Propertie does not exists!", "statusCode": 404});
    });

    it('Failed to list especific user not propertie', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginTest);

      const { status, body } = await request(app.getHttpServer())
        .get(`/properties/${accountTest.id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual({"error": "Not Found", "message": "Propertie does not exists!", "statusCode": 404});
    });

    it('Should be able to returns especific propertie', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginTest);

      const { status, body } = await request(app.getHttpServer())
        .get(`/properties/${propertie.id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
      expect(status).toBe(200);
      expect(body).toStrictEqual(propertieShape);
    });
  });

    describe('GET ---> /properties/user/info', () => {
        it('Should not be able to show propeties by user with incorrect token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/properties/user/info')
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should not be able to show propeties by user with incorrect email or password', async () => {
            const response = await request(app.getHttpServer())
                .post('/login')
                .send(loginTest2);
            const { status, body } = await request(app.getHttpServer())
                .get('/properties/user/info')
                .set('Authorization', `Bearer ${response.body.token}`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should be able to show all properties from user by ID', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/properties/user/info')
                .set('Authorization', `Bearer ${token}`);
            expect(status).toBe(200);
            expect(body).toHaveProperty('properties');
            expect(body.properties).toStrictEqual(
                expect.arrayContaining([propertieShape]),
            );
        });
    });

    describe('PATCH ---> /properties/:id', () => {
        it('Should be able to update only owned propertie', async () => {
            const { status, body } = await request(app.getHttpServer())
                .patch(`/properties/${propertie.id}`)
                .send(patchedPropertie)
                .set('Authorization', `Bearer ${token}`)

            expect(status).toBe(200)
            expect(body).toMatchObject({
                name: 'Apartamento de luxo',
                image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
                localization: 'Rio de Janeiro',
                details: 'Apenas venda, mais informações entre em contato'
            })
        })

        it('Should not be able to update a propertie without token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .patch(`/properties/${propertie.id}`)
                .send(patchedPropertie)

            expect(status).toBe(401)
            expect(body).toHaveProperty('message')
        })
    })

    describe('DELETE ---> /properties/:id', () => {
        it('Should not be able to delete propertie with invalid token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .delete(`/properties/${propertie.id}`)
                .set('Authorization', `Bearer`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message');
        });

        it('Should be able to delete propertie with valid token', async () => {
            const { status, body } = await request(app.getHttpServer())
                .delete(`/properties/${propertie.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(status).toBe(204);
            expect(body).toMatchObject({})
        });
    })
});
