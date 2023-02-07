import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ensureAuthMiddleware } from './common/middlewares/ensureAuth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsController } from './routes/contacts/contacts.controller';
import { ContactsModule } from './routes/contacts/contacts.module';
import { LoginModule } from './routes/login/login.module';
import { PropertiesController } from './routes/properties/properties.controller';
import { PropertiesModule } from './routes/properties/properties.module';
import { UsersController } from './routes/users/users.controller';
import { UsersModule } from './routes/users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PropertiesModule,
    ContactsModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
      )
      .forRoutes(UsersController);

      consumer
      .apply(ensureAuthMiddleware)
      .exclude(
        { path: 'contacts/pdf', method: RequestMethod.GET },
      )
      .forRoutes(ContactsController,PropertiesController);
      
  }
}
