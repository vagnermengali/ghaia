import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  emailAlreadyUsed,
  fakeUsers,
  mockedUserLogin0,
  mockedUserLogin1,
  telephoneAlreadyUsed,
  userCreateTest,
  userNameAlreadyUsed,
  userShape,
} from './mocks/user/index';

describe('Integration Tests: Users Routes', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await prisma.user.create({
      data: fakeUsers[0],
    });
    await prisma.user.create({
      data: fakeUsers[1],
    });

    await app.init();
  });

  describe('GET ---> /users', () => {
    it('Should be able to returns a list of users', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/users');
      expect(status).toBe(200);
      expect(userShape)
    });
  });

  describe('GET ---> /users/profile', () => {
    it('Must be able to return the user', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/users');
      expect(status).toBe(200);
      expect(userShape[0])
    });
    
    it('Failed to get a user with without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/users/profile`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });
  });

  describe('POST ---> /users', () => {
    it('Should be able to create a user', async () => {
      const beforeCount = await prisma.user.count();

      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(userCreateTest);

      const afterCount = await prisma.user.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('Failed to create a user with an username already being used', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(userNameAlreadyUsed);

      expect(status).toBe(400);
    });

    it('Failed to create a user with an email already being used', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(emailAlreadyUsed);

      expect(status).toBe(400);
    });
    it('Failed to create a user with an telephone already being used', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(telephoneAlreadyUsed);

      expect(status).toBe(400);
    });
  });

  describe('PATCH ---> /users/update', () => {
    it('Failed to delete a user with without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/update`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Should be able to update username, email, avatar_url, telephone and  password from user', async () => {
      const newValues = {
        username: 'newUser',
        email: 'newUser@email.com',
        password: '.NewUse123',
        telephone: '+55 19 981818190',
        avatar_url: 'https://avatars.githubusercontent.com'
      };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin0);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/update`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newValues);

      expect(body.username).toBe('newUser');
      expect(body.email).toBe('newUser@email.com');
      expect(status).toBe(200);
    });
  });;

  describe('DELETE ---> /users', () => {
    it('Failed to delete a user with without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .delete(`/users`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Should be able to delete a user', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .delete(`/users`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(204);
    });
  });
});
