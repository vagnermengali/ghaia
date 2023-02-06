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
<p align ='center'><a href="#--scanner-cnab" >Voltar ao início</a></p>

---

## **Aplicação**

Depois que api ja estiver iniciada em sua máquina, prossiga com o passo-a-passo de usabilidade da aplicação, porém se opitar por na instalar o frontend disponibilizamos o [link do deploy](https://scanner-cnab-pce1-git-main-vagnermengali.vercel.app/)<br/>

A url base da interface é http://localhost:3000

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
<p align ='center'><a href="#--scanner-cnab" >Voltar ao início</a></p>

---

## **Endpoints**

A API tem um total de 4 endpoints, podendo escanear o documento CNAB, listar transações, loja específica e deleção de todas as transações para um novo escaneamento. <br/>

<p>A url base da API é <a href="http://localhost:8000/api/">http://localhost:8000/api/</a></p>

<h2 align ='center'> Usuário </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver as transações do documento escaneado:

`GET /users - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`GET /users/profile - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`POST /users - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`PATCH /users/update - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

`DELETE /users - FORMATO DA REQUISIÇÃO`

```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Login </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver as transações específicas de uma determinada loja do documento escaneado:

`POST /login - FORMATO DA REQUISIÇÃO`

```
TEST
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
