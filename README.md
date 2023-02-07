##
<h1 align="center">
  Ghaia
</h1>

<p align = "center">
Este é um aplicação que tem a finalidade de facilitar o comercio de compra e venda e imóveis
</p>

<p align="center">
  <a href="#instalação">Instalação</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#aplicação">Aplicação</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#swagger">Swagger</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Instalação**

A seguir esta o passo-a-passo de instalação e execução em ambiente de desenvolvimento<br/>

<p>1. Clone o repositório:</p>

```
git clone https://github.com/vagnermengali/ghaia
```
<p>2. Adentre na pasta raiz do projeto:</p>
  
```
cd ghaia/api
```
<p>3. Instale as dependências do projeto:</p>

```
yarn ou yarn install
```
<p>4. Crie seu schema:</p>

```
yarn prisma generate
```
<p>7. Aplique suas migrações:</p>
  
```
yarn prisma migrate dev
```
<p>8. Ative o server:</p>

```
yarn start
```
<p>9. Rode os testes:</p>

```
yarn test
```

<p align ='center'><a href="#--ghaia" >Voltar ao início</a></p>

---

## **Aplicação**

Depois que api ja estiver iniciada em sua máquina, prossiga com o passo-a-passo de usabilidade da aplicação, porém se opitar por na instalar o frontend disponibilizamos o [link do deploy]()<br/>


<p>1. Clone o repositório:</p>

```
git clone https://github.com/vagnermengali/ghaia
```
<p>2. Adentre na pasta raiz do projeto:</p>
  
```
cd ghaia/interface
```
<p>3. Crie sua node module:</p>
  
```
yarn ou yarn install   
```
<p>4. Ative o server:</p>

```
yarn dev
```
<p align ='center'><a href="#--ghaia" >Voltar ao início</a></p>

---


## **Endpoints**

A API esta divida em /users, /login, /contacts e /properties, podendo fazer todos o processo de cadastro e login de usuário, além de casdastro de contantos e propriedades e todas contendo um CRUD. <br/>

<h2 align ='center'> Usuário </h2>

Nessa rotas o usuário pode acessar sem o token apenas POST/users e GET/users, do mais usará o token para executar o CRUD de usuário :

##

`GET /users - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.

```
`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "129c9f63-5374-4e9d-bec9-158fd4085cvb",
    "username": "Daniel Olivera",
    "avatar_url": "https://avatars.githubusercontent.com/u/93692439?v=4",
    "email": "danieel@mail.com",
    "telephone": "+55 12 345678612",
    "created_at": "2023-02-06T23:25:03.766Z",
    "updated_at": "2023-02-06T23:25:03.766Z"
  },
  {
    "id": "4c9c9f63-5374-4e9d-bec9-158fd4085cvb",
    "username": "Antonio nunes",
    "avatar_url": "https://avatars.githubusercontent.com/u/93692439?v=4",
    "email": "antonio@mail.com",
    "telephone": "+55 12 345678666",
    "created_at": "2023-02-06T23:25:05.985Z",
    "updated_at": "2023-02-06T23:25:05.985Z"
  },
]
```

##

`GET /users/profile - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`GET /users/profile - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "7388d143-01a1-4463-a815-a6dc21693c90",
  "username": "Leo Moreira",
  "avatar_url": "https://test.com",
  "email": "leo@mail.com",
  "telephone": "+55 18 921212131",
  "created_at": "2023-02-07T01:26:32.583Z",
  "updated_at": "2023-02-07T01:26:32.583Z",
  "contacts": [],
  "properties": []
}
```
##

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
  "username": "Leo Moreira",
  "avatar_url": "https://test.com",
  "email": "leo@mail.com",
  "password": ".Leo123",
  "telephone": "+55 18 921212131"
}
```

`POST /users- FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "7388d143-01a1-4463-a815-a6dc21693c90",
  "username": "Leo Moreira",
  "avatar_url": "https://test.com",
  "email": "leo@mail.com",
  "telephone": "+55 18 921212131",
  "created_at": "2023-02-07T01:26:32.583Z",
  "updated_at": "2023-02-07T01:26:32.583Z"
}
```
##

`PATCH /users/update - FORMATO DA REQUISIÇÃO`

```json
{
  "username": "Leo Moreira de Aouza",
  "avatar_url": "https://tejpg.jpg",
  "email": "leo123@mail.com",
  "telephone": "+55 18 981813481"
}
```

`PATCH /users/update/ - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "7388d143-01a1-4463-a815-a6dc21693c90",
  "username": "Leo Moreira de Aouza",
  "avatar_url": "https://tejpg.jpg",
  "email": "leo123@mail.com",
  "telephone": "+55 18 981813481",
  "created_at": "2023-02-07T01:26:32.583Z",
  "updated_at": "2023-02-07T01:53:35.893Z"
}
```
##

`DELETE /users - FORMATO DA REQUISIÇÃO`
```
Não é necessário um corpo da requisição.
```

`DELETE /users - FORMATO DA RESPOSTA - STATUS 204`

```
Não a corpo de retorno.
```
##

<h2 align ='center'> Login </h2>

Nessa rota o usuário pode acessar sem o token para efetuar o login :

##

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "leo@mail.com",
  "password": ".Leo123"
}
```

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhZ25lckBtYWlsLmNvbSIsImlhdCI6MTY3NTcxODE3OSwiZXhwIjoxNjc1ODA0NTc5LCJzdWIiOiIyMTkxODVhMy0zMzUyLTQwMTQtOWM0NC1iM2VhYWU0MWI5ZDIifQ.ze8Q4Ia3n3D3Cya88swZbPlqbsPWFr4RAjgiKXSjDgw"
}
```

##

<h2 align ='center'> Contatos </h2>

Nessas rotas o usuário deve ter o token para acesso, assim poderá executar o CRUD de contatos :

##

`GET /contacts/download/info - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`GET /contacts/download/info - FORMATO DA RESPOSTA - STATUS 200`

```
Retorna um pdf no corpo do retorno
```
##

`GET /contacts/:id - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```
`GET /contacts/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "1a00dc9b-689e-4896-b143-673f11d98e91",
  "name": "Pedro SP",
  "email": "pedro@mail.com",
  "telephone": "+55 19 981523189",
  "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
  "created_at": "2023-02-07T02:26:58.026Z",
  "updated_at": "2023-02-07T02:26:58.026Z"
}
```
##

`GET /contacts/user/info - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```
`GET /contacts/user/info - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "7388d143-01a1-4463-a815-a6dc21693c90",
  "username": "Leo Moreira de Aouza",
  "avatar_url": "https://tejpg.jpg",
  "email": "leo123@mail.com",
  "telephone": "+55 18 981813481",
  "created_at": "2023-02-07T01:26:32.583Z",
  "updated_at": "2023-02-07T01:53:35.893Z",
  "contacts": [
    {
      "id": "2eb68981-dbda-48f1-a45b-3df628b85936",
      "name": "Marcelo",
      "email": "marcelo@mail.com",
      "telephone": "+55 19 981323189",
      "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
      "created_at": "2023-02-07T02:24:31.346Z",
      "updated_at": "2023-02-07T02:24:31.346Z"
    },
    {
      "id": "1a00dc9b-689e-4896-b143-673f11d98e91",
      "name": "Pedro SP",
      "email": "pedro@mail.com",
      "telephone": "+55 19 981523189",
      "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
      "created_at": "2023-02-07T02:26:58.026Z",
      "updated_at": "2023-02-07T02:26:58.026Z"
    }
  ]
}
```
##

`POST /contacts - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Marcelo",
  "email": "marcelo@mail.com",
  "telephone": "+55 19 981323189"
}
```

`POST /contacts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "2eb68981-dbda-48f1-a45b-3df628b85936",
  "name": "Marcelo",
  "email": "marcelo@mail.com",
  "telephone": "+55 19 981323189",
  "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
  "created_at": "2023-02-07T02:24:31.346Z",
  "updated_at": "2023-02-07T02:24:31.346Z"
}
```
##

`PATCH /contacts/:id - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Casa na praia",
  "details": "Vende-se",
  "localization": "Rio de janeiro, Tijuca",
  "image_url": "http://casa.jpg"
}
```

`PATCH /contacts/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "1e284726-26a4-41ca-9537-1dcc22e53381",
  "name": "Casa na praia",
  "details": "Vende-se",
  "localization": "Rio de janeiro, Tijuca",
  "image_url": "http://casa.jpg",
  "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
  "created_at": "2023-02-07T02:03:47.939Z",
  "updated_at": "2023-02-07T02:20:52.848Z"
}
```
##

`DELETE /properties - FORMATO DA REQUISIÇÃO`
```
Não é necessário um corpo da requisição.
```

`DELETE /properties - FORMATO DA RESPOSTA - STATUS 204`

```
Não a corpo de retorno.
```
##

<h2 align ='center'> Propriedades </h2>

Nessas rotas o usuário deve ter o token para acesso, assim poderá executar o CRUD de properiedades :

##

`GET /properties - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`GET /properties - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "1e284726-26a4-41ca-9537-1dcc22e53381",
    "name": "Casa",
    "details": "Aluga-se",
    "localization": "Rio de janeiro",
    "image_url": "http://casa.jpg",
    "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
    "created_at": "2023-02-07T02:03:47.939Z",
    "updated_at": "2023-02-07T02:03:47.939Z"
  },
  {
    "id": "8f3bc0f0-8b91-40be-ad57-13b6890bb19d",
    "name": "Apartamento",
    "details": "Vende-se",
    "localization": "São Paulo",
    "image_url": "http://ap.jpg",
    "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
    "created_at": "2023-02-07T02:13:38.734Z",
    "updated_at": "2023-02-07T02:13:38.734Z"
  }
]
```
##

`GET /properties/:id - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```
`GET /properties/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "1e284726-26a4-41ca-9537-1dcc22e53381",
  "name": "Casa",
  "details": "Aluga-se",
  "localization": "Rio de janeiro",
  "image_url": "http://casa.jpg",
  "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
  "created_at": "2023-02-07T02:03:47.939Z",
  "updated_at": "2023-02-07T02:03:47.939Z"
}
```
##

`GET /properties/user/info - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```
`GET /properties/user/info - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "7388d143-01a1-4463-a815-a6dc21693c90",
    "username": "Leo Moreira",
    "avatar_url": "https://tejpg.jpg",
    "email": "leo@mail.com",
    "telephone": "+55 18 981813481",
    "created_at": "2023-02-07T01:26:32.583Z",
    "updated_at": "2023-02-07T01:53:35.893Z",
    "properties": [
    {
      "id": "1e284726-26a4-41ca-9537-1dcc22e53381",
      "name": "Casa",
      "details": "Aluga-se",
      "localization": "Rio de janeiro",
      "image_url": "http://casa.jpg",
      "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
      "created_at": "2023-02-07T02:03:47.939Z",
      "updated_at": "2023-02-07T02:03:47.939Z"
    },
    {
      "id": "8f3bc0f0-8b91-40be-ad57-13b6890bb19d",
      "name": "Apartamento",
      "details": "Vende-se",
      "localization": "São Paulo",
      "image_url": "http://ap.jpg",
      "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
      "created_at": "2023-02-07T02:13:38.734Z",
      "updated_at": "2023-02-07T02:13:38.734Z"
    }
  ]
}
```
##

`POST /properties - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Casa",
  "details": "Aluga-se",
  "localization": "Rio de janeiro",
  "image_url": "http://casa.jpg"
}
```

`POST /properties - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "1e284726-26a4-41ca-9537-1dcc22e53381",
  "name": "Casa",
  "details": "Aluga-se",
  "localization": "Rio de janeiro",
  "image_url": "http://casa.jpg",
  "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
  "created_at": "2023-02-07T02:03:47.939Z",
  "updated_at": "2023-02-07T02:03:47.939Z"
}
```
##

`PATCH /properties/:id - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Casa na praia",
  "details": "Vende-se",
  "localization": "Rio de janeiro, Tijuca",
  "image_url": "http://casa.jpg"
}
```

`PATCH /properties/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "1e284726-26a4-41ca-9537-1dcc22e53381",
  "name": "Casa na praia",
  "details": "Vende-se",
  "localization": "Rio de janeiro, Tijuca",
  "image_url": "http://casa.jpg",
  "userId": "7388d143-01a1-4463-a815-a6dc21693c90",
  "created_at": "2023-02-07T02:03:47.939Z",
  "updated_at": "2023-02-07T02:20:52.848Z"
}
```
##

`DELETE /properties - FORMATO DA REQUISIÇÃO`
```
Não é necessário um corpo da requisição.
```

`DELETE /properties - FORMATO DA RESPOSTA - STATUS 204`

```
Não a corpo de retorno.
```
##

---

## **Swagger** 

Api também conta a rota de interação, manipulação e documentação mais detalhada.

`api/`

<p align ='center'><a href="#--ghaia" >Voltar ao início</a></p>

---

<p align ='center'> Copyright <a href="https://github.com/vagnermengali">Vagner Mengali</a> 2023 </p>
