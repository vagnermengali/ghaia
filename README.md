## **Endpoints**

A API tem um total de 4 endpoints, podendo escanear o documento CNAB, listar transações, loja específica e deleção de todas as transações para um novo escaneamento. <br/>

<p>A url base da API é <a href="http://localhost:8000/api/">http://localhost:8000/api/</a></p>

<h2 align ='center'> Usuário </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver as transações do documento escaneado:

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
`DELETE /users - FORMATO DA REQUISIÇÃO`
```
Não é necessário um corpo da requisição.
```
`DELETE /users - FORMATO DA RESPOSTA - STATUS 204`

```
Não a corpo de retorno.
```

<h2 align ='center'> Login </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver as transações específicas de uma determinada loja do documento escaneado:

`POST /login - FORMATO DA REQUISIÇÃO`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhZ25lckBtYWlsLmNvbSIsImlhdCI6MTY3NTcxODE3OSwiZXhwIjoxNjc1ODA0NTc5LCJzdWIiOiIyMTkxODVhMy0zMzUyLTQwMTQtOWM0NC1iM2VhYWU0MWI5ZDIifQ.ze8Q4Ia3n3D3Cya88swZbPlqbsPWFr4RAjgiKXSjDgw"
}
```
`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "email": "leo@mail.com",
  "password": ".Leo123"
}
```

<h2 align ='center'> Contatos </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode apagar as transações salvas para fazer um novo escaneado:

`GET /contacts/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
TEST
```

`GET /contacts/download/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
TEST
```

`GET /contacts/user/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
TEST
```
`POST /contacts- FORMATO DA RESPOSTA - STATUS 204`

```json
TEST
```

`PATCH /contacts/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
TEST
```

`DELETE /contacts/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
TEST
```

<h2 align ='center'> Propriedades </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar fazer o upload do arquivo e assim escanear o documento:

`GET /properties - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    TEST
}
```

`GET /properties/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    TEST
}
```

`GET /properties/user/info - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    TEST
}
```

`POST /properties - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    TEST
}
```

`PATCH /properties/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    TEST
}
```

`DELETE /properties/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    TEST
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
Não há transações a serem listadas.

`GET /api/transaction/ - FORMATO DA RESPOSTA - STATUS 404`

```json
{
    "details": "Transaction list is empty"
}
```
---

## **Swagger** 

Api também conta a rota de interação, manipulação e documentação mais detalhada.

`api/`

<p align ='center'><a href="#--scanner-cnab" >Voltar ao início</a></p>

---

<p align ='center'> Copyright <a href="https://github.com/vagnermengali">Vagner Mengali</a> 2023 </p>
