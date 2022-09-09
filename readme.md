# Documentação BeeCar

# ❌ Problema

Nos últimos anos, o valor dos impostos, manutenções periódicas ou não e os preços dos combustíveis aumentaram consideravelmente, trazendo um deficit passivo considerável a donos de automóveis no Brasil.

# ✅ Solução

A BeeCar vem com uma frente que visa maximizar os benefícios marginais de um automóvel através do **aluguel de automóveis**. Essa proposta de negócio visa resolver principalmente os problemas orçamentários, criando através do aluguel de um automóvel, a minimização de riscos, aumento do conforto e usabilidade ao consumidor.

## A BeeCar

Na aplicação, o usuário conseguirá visitar uma página de catálogo de automóveis e visualizar todas as opções disponíveis em detrimentos das opções que o mesmo decidir escolher.

Para alugar um carro é muito simples! O usuário deverá estar autenticado através de um login, onde o seu cadastro totalmente preenchido e validado informará à BeeCar todos os padrões necessários da aptidão para a locação!

Além disso, o usuário poderá cadastrar um ou mais cartões de crédito, visualizar seu histórico de aluguéis, assinaturas e ainda mudar seu aluguel a qualquer dia ou horário!

# Rotas da BeeCar

URL Base: https://exemplodeurlbase.com/

# 👤 /profile

Rota de criação e atualização de usuários.

### Requisições:

📤 **POST /profile**

🔐 Nível de permissão da rota: **público**.

Padrão de corpo (body) para a requisição:

```json
{
  "name": "Samuel Persuhn",
  "birthDate": "06/07/1996",
  "cpf": "00000000000",
  "email": "samu192@beecar.com",
  "password": "deusfe10",
  "isAdm": true
}
```

Retorno esperado (201):

```json
{
  "name": "Samuel Persuhn",
  "birthDate": "06/07/1996",
  "cpf": "00000000000",
  "age": 26,
  "email": "samu192@beecar.com",
  "isAdm": true,
  "id": "c64ce1cb-4a22-4078-bca0-6de6223517ab",
  "isActive": true
}
```

Observação: o parâmetro **age** e **isActive** são gerados automaticamente pelo servidor.

📤 **POST /profile (criação de usuário não adm)**

🔐 Nível de permissão da rota: **público**.

Padrão de corpo (body) para a requisição:

```json
{
  "name": "Samuel Persuhn",
  "birthDate": "06/07/1996",
  "cpf": "00000000000",
  "email": "samuelpr@gmail.com",
  "password": "deusfe10"
}
```

Retorno esperado (201):

```json
{
  "name": "Samuel Persuhn",
  "birthDate": "06/07/1996",
  "cpf": "00000000000",
  "age": 26,
  "email": "samuelpr@gmail.com",
  "id": "307a6cbc-7bab-4f21-9b5b-b13b8b4c0c30",
  "isAdm": false,
  "isActive": true
}
```

Observação: Quando o parâmetro **isAdm** é omisso na requisição, é gerado um valor para propriedade de **false** por padrão pelo servidor.

📥 **GET /profile**

Lista todos os usuários.

🔐 Nível de permissão da rota: **administrador**.

Retorno esperado (200):

```json
[
  {
    "id": "5c772eeb-6ae6-4201-8423-b7db66ec17fc",
    "name": "Julio Cesar",
    "birthDate": "1998-05-07",
    "cpf": "12345678910",
    "age": 24,
    "email": "julhino@gmail.com",
    "isAdm": false,
    "isActive": true,
    "cnh": null,
    "address": null
  },
  {
    "id": "4618a39f-79f0-492e-ae9d-5cd9d9b8ef29",
    "name": "Samuel Persuhn",
    "birthDate": "1996-06-07",
    "cpf": "00000000000",
    "age": 26,
    "email": "samuelpr@gmail.com",
    "isAdm": false,
    "isActive": true,
    "cnh": null,
    "address": null
  }
]
```

📥 **GET /profile/cars**

🔐 Nível de permissão da rota: **usuário**.

Lista todos os carros alugados pelo usuário (histórico).

Retorno esperado (200):

```json
"cars": [
	{		"id": "45546545",
		"todos": "os dados"
	},
	{
		"id": "45546545",
		"todos": "os dados"
		}
]
```

📦 **PATCH /profile**

Rota alteração dos dados de um usuário.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de requisição (body):

```json
{
  "name": "Jujubinha Cesar",
  "birthDate": "05/05/1995"
}
```

Retorno esperado (200):

```json
{
  "message": "the user as been updated",
  "user": {
    "name": "Jujubinha Cesar",
    "birthDate": "05/05/1995",
    "cpf": "12345678910",
    "age": 24,
    "email": "julhino@gmail.com",
    "id": "90b6a31f-a61d-4313-9e45-a1c7356e62cf",
    "isAdm": false,
    "isActive": true
  }
}
```

💽 **DELETE /profile**

Rota de inativação dos dados de um usuário.

🔐 Nível de permissão da rota: **usuário**.

Requisição do verbo **delete** do protocolo **HTTP,** portanto não é necessário um corpo (body) de requisição.

Observação: A conta do usuário é apenas desativada, podendo ser reativada posteriormente.

Retorno esperado (204): No body content

❌ **POSSÍVEIS ERROS DA ROTA**

📤 **POST /profile (400) bad request**

Alguma propriedade obrigatória não foi passada.

Retorno esperado:

```json
{
  "message": "(the property) is a required field"
}
```

📥 **GET /profile (401) Unauthorized**

Não foi passado token no header da requisição ou o mesmo é invalido.

Retorno esperado:

```json
{
  "message": "missing token"
}
```

📥 **GET /profile (403) Forbbiden**

Token passado no header, porém, essa requisição precisa de um token de administrador;

Retorno esperado:

```json
{
  "message": "you need admin permission"
}
```

📦 **PATCH /profile (401) Unauthorized**

Requisição feita sem token no header.

Retorno esperado:

```json
{
  "message": "missing token"
}
```

💽 **DELETE /profile (400) bad request**

No caso da inativação do usuário ou qualquer outra alteração não é permitida caso o usuário já esteja com o valor da propriedade **isActive** como **false**.

Retorno esperado:

```json
{
  "message": "this account is already inactive"
}
```

# 🪧 /category

Rota de criação e atualização de categorias. As categorias tem seus preços como resultado da inteligência do servidor segundo os carros que pertencem a mesma.

### Requisições:

📤 **POST /category**

Essa rota é responsável por criar uma categoria.

🔐 Nível de permissão da rota: **administrador**.

Padrão de corpo (body) para a requisição:

```json
{
  "name": "Categoria A",
  "automatic": false,
  "type": "hatch",
  "airConditioning": true,
  "directionType": "eletro-hidráulica",
  "powerWIndows": true
}
```

Padrão de resposta (201):

```json
{
  "name": "Categoria A",
  "automatic": false,
  "type": "hatch",
  "directionType": "eletro-hidraulica",
  "powerWindows": true,
  "pricePerDay": 500,
  "pricePerMouth": 1990,
  "pricePeryear": 12000,
  "id": "0f9f6ed1-c96a-4bd1-b26f-afacdb448061",
  "airCondioting": true,
  "isActive": true
}
```

Observações: os elementos **pricePerMouth,** **pricePerYear** e **pricePerDay** são gerados pelo servidor, o resto dos dados é de caráter obrigatório na requisição. Para mais informações entre em contato com os administradores.

📥 **GET /category**

Lista todas as categorias disponíveis

🔐 Nível de permissão da rota: **público**.

Padrão de resposta (200):

```json
[
  {
    "id": "c6f0c2d9-e62d-4367-9c1b-11f39e00c2e0",
    "name": "Categoria A",
    "automatic": false,
    "type": "hatch",
    "airCondioting": true,
    "directionType": "eletro-hidraulica",
    "powerWindows": true,
    "pricePerDay": "500.00",
    "pricePerMouth": "1990.00",
    "pricePeryear": "12000.00",
    "isActive": true
  },
  {
    "id": "133f0d77-12a5-4cf2-bd01-d7d3d6b205ce",
    "name": "Categoria b",
    "automatic": false,
    "type": "hatch",
    "airCondioting": true,
    "directionType": "eletro-hidraulica",
    "powerWindows": true,
    "pricePerDay": "189",
    "pricePerMouth": "1875.00",
    "pricePeryear": "9854.00",
    "isActive": true
  }
]
```

📥 **GET /category/:id/cars**

Lista todos os carros de uma determinada categoria.

🔐 Nível de permissão da rota: **público**.

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

Padrão de resposta (200):

```json
{
  "ainta terá um exemplo": true
}
```

📦 **PATCH /category/:id**

Atualiza os dados de uma determinada categoria.

🔐 Nível de permissão da rota: **administrador**.

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

Padrão de corpo (body) de requisição:

```json
{
  "name": "Categoria AC",
  "automatic": false,
  "type": "SUV"
}
```

Padrão de resposta (200):

```json
{
  "message": "category as been updated",
  "category": {
    "name": "Categoria AC",
    "automatic": false,
    "type": "SUV",
    "directionType": "eletro-hidraulica",
    "powerWindows": true,
    "pricePerDay": 500,
    "pricePerMouth": 1990,
    "pricePeryear": 12000,
    "id": "0f9f6ed1-c96a-4bd1-b26f-afacdb448061",
    "airCondioting": true,
    "isActive": true
  }
}
```

Observação: As propriedades de preço da categoria não são editáveis. Qualquer dúvida entre em contato com um administrador.

💽 **DELETE /category**

Rota de inativação dos dados de um usuário.

🔐 Nível de permissão da rota: **administrador**.

Requisição do verbo **delete** do protocolo **HTTP,** portanto não é necessário um corpo (body) de requisição.

Observação: A conta do usuário é apenas desativada, podendo ser reativada posteriormente.

Retorno esperado (204): No body content

<h1 align="center">👥 Desenvolvedores responsáveis 👥</h1>

<table align="center">
  <tr>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/99503278?s=400&u=db00280337166c08e629ec23b3fdaf9626daf756&v=4" width="100px;" alt="Foto do Samu"/><br>        
        <sub>
          <b>Samuel Persuhn - Product Owner</b> <br/>
            <a href="https://github.com/Saamu192" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
            <a href="https://www.linkedin.com/in/samuel-persuhn/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/92865158?v=4" width="100px;" alt="Foto do Mateus Sam"/><br>        
        <sub>
            <b>Matheus Sam - Tech Lead</b> <br/>
            <a href="https://github.com/MatheSam" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/matheus-sam-navarro-57845316a/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/86882285?v=4" width="100px;" alt="Foto do Gabriel"/><br>        
        <sub>
          <b>Gabriel Luz - Scrum Master</b> <br/>
            <a href="https://github.com/GabrielLuZz" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/gabriel-luz-🏳%EF%B8%8F%E2%80%8D🌈-22287a213/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/99366381?v=4" width="100px;" alt="Foto do Júlio"/><br>          
        <sub>
          <b>Júlio César - Developer</b>  <br/>
            <a href="https://github.com/juliocpadua" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/júlio-césar-oliveira-melo-pádua-1279b1224/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/98769318?v=4" width="100px;" alt="Foto do Mateus Zeiser"/><br>          
        <sub>
          <b>Matheus Zeiser - Developer</b>  <br/>
            <a href="https://github.com/matheuszeiser" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/matheuszeiser/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
    <td align="center">
        <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHuqGfidI-mzg/profile-displayphoto-shrink_200_200/0/1659026874971?e=1668038400&v=beta&t=XgQi7N1PkMkxe8j6FgvBrOOrIuk2x2klmbcLk6vip-I" width="100px;" alt="Foto do Lucas Ribeiro"/><br>          
        <sub>
          <b>Lucas Ribeiro - Developer</b>  <br/>
            <a href="https://github.com/lucas01gr" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/lucas-gomes-ribeiro-7048b8a8/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
  </tr>
</table>
