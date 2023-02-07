import { hashSync } from "bcryptjs";

export const propertieTest = [
  {
    name: 'Apartamento para universitarios',
    image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    localization: 'Acre',
    details: 'Aluga-se, mais informações entre em contato'
  },
  {
    name: 'Ap',
    image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    localization: 'Bahia',
    details: 'Apenas venda, mais informações entre em contato'
  },
  {
    name: 'Casa Simples',
    image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    localization: 'Curitiba',
    details: 'Apenas venda, mais informações entre em contato'
  },
];

export const propertiesTest = [
  {
    id: '4c9c9f63-5374-4e9d-bec9-158fd4085cvb',
    name: 'Apartamento para universitarios',
    image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    localization: 'Acre',
    details: 'Aluga-se, mais informações entre em contato',
    userId: "4c9c9f63-5374-4e9d-bec9-158fd4085cv1",
    updated_at: "2023-02-06T16:13:52.251Z",
    created_at: "2023-02-06T16:13:52.251Z"
  },
  {
    id: '4c9c9f63-5374-4e9d-bec9-158fd4085456',
    name: 'Apartamento de luxo',
    image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    localization: 'Bahia',
    details: 'Apenas venda, mais informações entre em contato',
    userId: "4c9c9f63-5374-4e9d-bec9-158fd4085cv2",
    updated_at: "2023-02-06T16:13:52.251Z",
    created_at: "2023-02-06T16:13:52.251Z"
  },
  {
    id: '4c9c9f63-5374-4e9d-bec9-158fd4085123',
    name: 'Casa Simples',
    image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    localization: 'Curitiba',
    details: 'Apenas venda, mais informações entre em contato',
    userId: "4c9c9f63-5374-4e9d-bec9-158fd4085cv3",
    updated_at: "2023-02-06T16:13:52.251Z",
    created_at: "2023-02-06T16:13:52.251Z"
  },
];

export const accountTest = {
  id: '4c9c9f63-5374-4e9d-bec9-158fd4085cvb',
  username: 'Antonio nunes',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'antonio@mail.com',
  password: hashSync('.Antonio123', 10),
  telephone: '+55 12 345678666'
}


export const loginTest = {
  email: 'antonio@mail.com',
  password: '.Antonio123'
}

export const loginTest2 = {
  email: 'testandoInfinito@email.com',
  password: 'Teste@1232'
}

export const propertieShape = expect.objectContaining({
  name: 'Apartamento para universitarios',
  image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  localization: 'Acre',
  details: 'Aluga-se, mais informações entre em contato'
});

export const propertieShapeUpdate = {
  name: 'Apartamento',
  image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  localization: 'Bahia',
  details: 'Aluga-se'
};

export const patchedPropertie = {
  name: 'Apartamento de luxo',
  image_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  localization: 'Rio de Janeiro',
  details: 'Apenas venda, mais informações entre em contato'
}