import { hashSync } from 'bcryptjs';

export const fakeUsersLogin = [
  {
    id: '79e03b64-c3d3-4664-bcf7-2cca2c2d6711',
    username: 'Felipe Silva',
    avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    email: 'felipe@mail.com',
    password: hashSync('.Felipe123', 10),
    telephone: '+55 12 365678901'
  },
  {
    id: '4c9c9f63-5374-4e9d-bec9-990fd49678d1',
    username: 'Daniel Lima',
    avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    email: 'daniel@mail.com',
    password: hashSync('.Pedro123', 10),
    telephone: '+55 12 345778902'
  },
];

export const loginUser = {
  email: 'felipe@mail.com',
  password: '.Felipe123'
}

export const loginUser1 = {
  email: 'daniel@mail.com',
  password: '.Daniel123'
}

export const loginUser3 = {
    email: "leo",
    password: ".Pedro123"
}

export const invalidCredentials = {
  email: 'carlos@mail.com',
  password: '.carlos'
}

export const loginShape = expect.objectContaining({
    token: expect.any(String)
});