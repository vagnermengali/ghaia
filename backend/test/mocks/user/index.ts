import { hashSync } from 'bcryptjs';

export const fakeUsers = [
  {
    id: '79e03b64-c3d3-4664-bcf7-2cca2c2d7510',
    username: 'João Silva',
    avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    email: 'joao@mail.com',
    password: hashSync('.Joao123', 10),
    telephone: '+55 12 345678901'
  },
  {
    id: '4c9c9f63-5374-4e9d-bec9-990fd49405dc',
    username: 'Pedro Lima',
    avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    email: 'pedro@mail.com',
    password: hashSync('.Pedro123', 10),
    telephone: '+55 12 345678902'
  },
];

export const userCreateTest = {
  id: '4c9c9f63-5374-4e9d-bec9-158fd40852ab',
  username: 'Gabriel Freire',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'gabriel@mail.com',
  password: '.Gabriel123',
  telephone: '+55 12 345678903'
};

export const userNameAlreadyUsed = {
  username: 'Gabriel Freire',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'gabrielfr@mail.com',
  password: '.Gabriel123',
  telephone: '+55 12 345678904'
};

export const emailAlreadyUsed = {
  username: 'Gabriel Costa',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'gabriel@mail.com',
  password: '.Gabriel123',
  telephone: '+55 12 345678905'
};

export const telephoneAlreadyUsed = {
  username: 'Tiago Pires',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'tiago@mail.com',
  password: '.Tiagol123',
  telephone: '+55 12 345678903'
};

export const mockedUserLogin0 = {
  email: 'joao@mail.com',
  password: '.Joao123'
}

export const mockedUserLogin1 = {
  email: 'pedro@mail.com',
  password: '.Pedro123'
}

export const invalidCredentials = {
  email: 'carlos@mail.com',
  password: '.carlos'
}

export const userShape = [{
  id: '79e03b64-c3d3-4664-bcf7-2cca2c2d7510',
  username: 'João Silva',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'joao@mail.com',
  telephone: '+55 12 345678901'
},
{
  id: '4c9c9f63-5374-4e9d-bec9-990fd49405dc',
  username: 'Pedro Lima',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'pedro@mail.com',
  telephone: '+55 12 345678902'
}]

