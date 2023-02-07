import { hashSync } from "bcryptjs";

export const contactTest = [
  {
    name: 'Pedro Lima',
    email: 'pedro@mail.com',
    telephone: '+55 12 345678902'
  },
  {
    name: 'Gab',
    email: 'gabriel@mail.com',
    telephone: '+55 12 34567891'
  },
  {
    name: 'João Costa',
    email: 'joao@mail.com',
    telephone: '+55 12 345678922'
  },
];

export const contactsTest = [
  {
    id: '1c9c9f63-5374-4e9d-bec9-158fd4085cvb',
    name: 'João Costa',
    email: 'joao@mail.com',
    telephone: '+55 12 345678922',
    userId: "1c9c9f63-5374-4e9d-bec9-158fd4085cv1",
    updated_at: "2023-02-06T16:13:52.251Z",
    created_at: "2023-02-06T16:13:52.251Z"
  },
  {
    id: '2c9c9f63-5374-4e9d-bec9-158fd4085456',
    name: 'Gabriel Freire',
    email: 'gabriel@mail.com',
    telephone: '+55 12 345678912',
    userId: "2c9c9f63-5374-4e9d-bec9-158fd4085cv2",
    updated_at: "2023-02-06T16:13:52.251Z",
    created_at: "2023-02-06T16:13:52.251Z"
  },
  {
    id: '3c9c9f63-5374-4e9d-bec9-158fd4085123',
    name: 'Pedro Lima',
    email: 'pedro@mail.com',
    telephone: '+55 12 345678902',
    userId: "3c9c9f63-5374-4e9d-bec9-158fd4085cv3",
    updated_at: "2023-02-06T16:13:52.251Z",
    created_at: "2023-02-06T16:13:52.251Z"
  },
];

export const accountTest = {
  id: '129c9f63-5374-4e9d-bec9-158fd4085cvb',
  username: 'Daniel Olivera',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'danieel@mail.com',
  password: hashSync('.Daniel123', 10),
  telephone: '+55 12 345678612'
}


export const loginTest = {
  email: 'danieel@mail.com',
  password: '.Daniel123'
}

export const loginTest2 = {
  email: 'testandoInfinito@email.com',
  password: 'Teste@1232'
}

export const contactShape = expect.objectContaining({
  name: 'João Costa',
  email: 'joao@mail.com',
  telephone: '+55 12 345678922'
});

export const contactShapeUpdate = {
    name: 'Mateus Corrêa',
    email: 'mateus@mail.com',
    telephone: '+55 12 345678321'
};

export const patchedContact = {
    name: 'Felipe Almeida',
    email: 'felipee@mail.com',
    telephone: '+55 12 345678123'
}