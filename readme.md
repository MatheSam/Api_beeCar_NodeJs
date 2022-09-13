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

URL Base: https://beecarrent.herokuapp.com/

Permissões por rota:

- **Usuário:** O usuário precisa estar logado, ou seja, necessita do envio do token do usuário para a requisição ter sucesso.
- **Administrador:** O usuário precisa estar logado com a propriedade **isAdm**: **true**. É necessário o envio do token para validação e sucesso da rota.
- **Pública**: Não é necessário um usuário logado, ou seja, não precisa do envio de um token de autenticação.

Usuários com a permissão de **administrador** tem todas as permissivas que são de **usuário**, porém, um **usuário** não pode acessar rotas de **administrador.**

# 👤 /profile

Rota de criação e atualização de usuários.

### Requisições:

📤 **POST /profile (criação de usuário adm)**

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

Observação: o parâmetro **age,** **isActive, cnh e address** são gerados automaticamente pelo servidor.

📤 **POST /profile (criação de usuário não adm)**

🔐 Nível de permissão da rota: **público**.

Padrão de corpo (body) para a requisição:

```json
{
  "name": "Julio Cesar",
  "password": "12345",
  "birthDate": "1998-05-07",
  "cpf": "12345678910",
  "email": "julhino@gmail.com"
}
```

Retorno esperado (201):

```json
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

Lista todos os aluguéis efetuados pelo usuário na aplicação (histórico).

Retorno esperado (200):

```json
[
  {
    "id": "0a6a6105-45f9-452e-8d66-3a917e11ca76",
    "initialDate": "2023-09-10",
    "initialHour": "05:00:00",
    "finalDate": "2023-09-12",
    "finalHour": "08:00:00",
    "totalValue": "1062.50",
    "users": {
      "id": "da281e6e-b9c4-4f57-99e7-1cab82efaed8",
      "name": "Samuel Persuhn",
      "birthDate": "1996-06-07",
      "cpf": "00000000000",
      "age": 26,
      "email": "samu192@beecar.com",
      "isAdm": true,
      "password": "$2a$10$3XSnFYk2SvlsMjpVrr/ve.Uh1xx2zUIu8AA.41./JGaqQrN.O0ykm",
      "isActive": true,
      "cnh": {
        "id": "ab6327c4-3792-49b8-a870-7193b93ea580",
        "type": "AB",
        "number": "13245687900",
        "validate": "2022-10-09"
      },
      "address": {
        "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
        "district": "Caiobá",
        "zipCode": "84520060",
        "number": "9999",
        "city": "Jacundá",
        "state": "RR"
      },
      "cards": [
        {
          "id": "401670e5-59b3-452d-9dc7-d6ac783e81ec",
          "cardNumber": "123679823",
          "validate": "2024-10-09",
          "name": "Juarez Silveira"
        }
      ]
    },
    "cars": {
      "id": "7e94589d-efc1-4ac7-aced-57667dda289e",
      "licensePlate": "9999999",
      "color": "white",
      "model": "Nova Balanciaga",
      "fuel": "G",
      "year": 2015,
      "brand": "Ford",
      "rented": false,
      "document": true,
      "isActive": true,
      "price": "35000.00",
      "km": "5000.00",
      "hp": 550,
      "maintenence": false,
      "img": null,
      "categories": {
        "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
        "name": "Categoria A",
        "automatic": false,
        "type": "hatch",
        "airConditioning": true,
        "directionType": "eletro-hidraulica",
        "powerWindows": true,
        "pricePerDay": "500.00",
        "pricePerMouth": "1990.00",
        "pricePeryear": "12000.00",
        "isActive": true
      }
    }
  }
]
```

Observação: A rota **/RENT** trata das regras para um usuário criar um aluguel.

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

Observação: Todos os parâmetros de criação do usuário são opcionais, **menos os gerados pelo servidor como: isAdm, isActive, age, cnh, address e id.**

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
  "message": "Invalid token"
}
```

📥 **GET /profile (401) Unauthorized**

Token passado no header, porém, essa requisição precisa de um token de administrador;

Retorno esperado:

```json
{
  "message": "You aren't allowed to do this"
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

Observação: tokens passados que não pertencem ao usuário ao qual está sendo feita a alteração resultam no mesmo erro.

💽 **DELETE /profile (400) bad request**

No caso da inativação do usuário ou qualquer outra alteração não é permitida caso o usuário já esteja com o valor da propriedade **isActive** como **false**.

Retorno esperado:

```json
{
  "message": "this account is already inactive"
}
```

# 📝 /address

Rota responsável por cadastrar e alterar o endereço do usuário.

## Requisições:

📤 **/POST /profile/address**

Rota para criação de um endereço para o usuário.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de requisição (body):

```json
{
  "city": "Jacundá",
  "district": "Caiobá",
  "number": "420",
  "state": "RR",
  "zipCode": "84520060"
}
```

Retorno esperado (201):

```json
{
  "district": "Caiobá",
  "zipCode": "84520060",
  "number": "420",
  "city": "Jacundá",
  "state": "RR",
  "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d"
}
```

Observação: O endereço do usuário tem seu próprio ID sendo vinculado ao usuário que efetuou a requisição através do token de validação.

Um usuário pode criar e alterar um endereço, porém, não pode deletá-lo, nesses casos, faça a inativação da conta se houver necessidade.

📦 **/PATCH /profile/address**

Rota para criação de um endereço para o usuário.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de requisição (body):

```json
{
  "number": "9999"
}
```

Retorno esperado (200):

```json
{
  "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
  "district": "Caiobá",
  "zipCode": "84520060",
  "number": "9999",
  "city": "Jacundá",
  "state": "RR"
}
```

# 💳 Credit Card

Rota responsável pelo cadastro de cartões de crédito do usuário, sendo possível o cadastro de um ou mais cartões.

## Requisições:

📤 **/POST /profile/card**

Rota para criação de cartão de crédito.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de requisição (body):

```json
{
  "cardNumber": "123679823",
  "name": "Juarez Silveira",
  "validate": "10/09/2024"
}
```

Retorno esperado (201):

```json
{
  "cardNumber": "123679823",
  "validate": "10/09/2024",
  "name": "Juarez Silveira",
  "user": {
    "id": "da281e6e-b9c4-4f57-99e7-1cab82efaed8",
    "name": "Samuel Persuhn",
    "birthDate": "1996-06-07",
    "cpf": "00000000000",
    "age": 26,
    "email": "samu192@beecar.com",
    "isAdm": true,
    "isActive": true,
    "cnh": null,
    "address": {
      "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
      "district": "Caiobá",
      "zipCode": "84520060",
      "number": "9999",
      "city": "Jacundá",
      "state": "RR"
    },
    "cards": []
  },
  "id": "750736d4-2999-4de5-8db6-1acf15919a42"
}
```

Observação: O cartão do usuário tem seu próprio ID sendo vinculado ao usuário que efetuou a requisição através do token de validação.

📥 **/GET /profile/card:**

Rota para listagem dos cartões de crédito do usuário.

🔐 Nível de permissão da rota: **usuário**.

Retorno esperado (200):

```json
[
  {
    "id": "750736d4-2999-4de5-8db6-1acf15919a42",
    "cardNumber": "123679823",
    "validate": "2024-10-09",
    "name": "Juarez Silveira"
  }
]
```

📦 **/PATCH /profile/card/:id**

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

Rota para alteração dos dados do cartão de crédito do usuário.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de corpo (body) de requisição:

```json
{
  "validate": "10/11/2022"
}
```

Retorno esperado (200):

```json
{
  "message": "CardUpdated"
}
```

💽 **DELETE /profile/card/:id**

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

Rota deleção de um cartão de crédito do usuário.

🔐 Nível de permissão da rota: **usuário**.

Requisição do verbo **delete** do protocolo **HTTP,** portanto não é necessário um corpo (body) de requisição.

Retorno esperado (204): No body content

# 💼 /cnh

📤 **/POST /profile/cnh**

Rota para criação de documento CNH do usuário.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de requisição (body):

```json
{
  "number": "13245687900",
  "type": "AB",
  "validate": "10/09/2022"
}
```

Retorno esperado (201):

```json
{
  "id": "da281e6e-b9c4-4f57-99e7-1cab82efaed8",
  "name": "Samuel Persuhn",
  "birthDate": "1996-06-07",
  "cpf": "00000000000",
  "age": 26,
  "email": "samu192@beecar.com",
  "isAdm": true,
  "isActive": true,
  "cnh": {
    "id": "3f6223ce-dfb0-46ff-ae23-cdcff3580d76",
    "type": "AB",
    "number": "13245687900",
    "validate": "2022-10-09"
  },
  "address": {
    "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
    "district": "Caiobá",
    "zipCode": "84520060",
    "number": "9999",
    "city": "Jacundá",
    "state": "RR"
  },
  "cards": []
}
```

📦 **/PATCH /profile/cnh**

Rota para alteração da CNH do usuário.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de corpo (body) de requisição:

```json
{
  "type": "C"
}
```

Retorno esperado (200):

```json
{
  "message": "CNH updated"
}
```

💽 **DELETE /profile/cnh**

Rota para deleção da cnh do usuário.

🔐 Nível de permissão da rota: **usuário**.

Requisição do verbo **delete** do protocolo **HTTP,** portanto não é necessário um corpo (body) de requisição.

Retorno esperado (204): No body content

# 🔑/login

Rota para autenticação de usuário.

📤 **/POST**

Criação de uma autenticação:

Exemplo de corpo (body):

```json
{
  "email": "samu192@beecar.com",
  "password": "deusfe10"
}
```

Retorno esperado (200):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9yJpc0FkbSI6dHJ1ZSwidXNlcklkIjoiZGEyODFlwNzY0ODQsInN1YiI6ImRhMjgxZTZlLWI5YzQtNGY1Ny05OWU3LTFjYWI4MmVmYWVkOCJ9.es"
}
```

Observação: O token acima é apenas um exemplo e não pode ser usado para validação de autenticação.

Se o usuário estiver inativo, ao fazer o login sua conta será reativada.

# 🚖 /cars

Rota para criação de carros.

## Requisições:

📤 **/POST**

Rota para criação de carros.

🔐 Nível de permissão da rota: **administrador**.

Exemplo de corpo (body):

```json
{
  "licensePlate": "9999999",
  "color": "black",
  "model": "Nova Balanciaga",
  "fuel": "G",
  "year": 2015,
  "brand": "Ford",
  "category": "Categoria A",
  "km": 5000,
  "hp": 125,
  "price": 35000
}
```

Obervação: A criação de um carro espera o envio da requisição acima em formato multipart/form-data, pois necessita do envio de uma imagem do tipo .png ou .jpeg. Os dados são enviados como data = json e image = file.

Retorno esperado (201):

```json
{
  "licensePlate": "9999999",
  "brand": "Ford",
  "categories": {
    "id": "b886f551-0b9d-43c6-9643-f594f625690e",
    "name": "Categoria A",
    "automatic": false,
    "type": "hatch",
    "airConditioning": true,
    "directionType": "eletro-hidraulica",
    "powerWindows": true,
    "pricePerDay": "500.00",
    "pricePerMouth": "1990.00",
    "pricePeryear": "12000.00",
    "isActive": true
  },
  "color": "black",
  "fuel": "G",
  "hp": 125,
  "img": "http://res.cloudinary.com/djftjudw4/image/upload/v1663081849/Beecars/uwMHtnF1115h2AdDeNRI92ObpRjnS2vR_cvovra.jpg",
  "km": 5000,
  "model": "Nova Balanciaga",
  "price": 35000,
  "year": 2015,
  "id": "57c7e296-1ac4-4ed9-9465-1376785d9e35",
  "rented": false,
  "document": true,
  "isActive": true,
  "maintenence": false
}
```

Observação: um carro não pode ser criado sem ter uma categoria existente ao qual possa vinculá-lo.

📥 **/GET**

Rota para listagem dos carros.

🔐 Nível de permissão da rota: **público**.

Retorno esperado (200):

```json
[
  {
    "id": "7e94589d-efc1-4ac7-aced-57667dda289e",
    "licensePlate": "9999999",
    "color": "black",
    "model": "Nova Balanciaga",
    "fuel": "G",
    "year": 2015,
    "brand": "Ford",
    "rented": false,
    "document": true,
    "isActive": true,
    "price": "35000.00",
    "km": "5000.00",
    "hp": 125,
    "maintenence": false,
    "img": null,
    "categories": {
      "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
      "name": "Categoria A",
      "automatic": false,
      "type": "hatch",
      "airConditioning": true,
      "directionType": "eletro-hidraulica",
      "powerWindows": true,
      "pricePerDay": "500.00",
      "pricePerMouth": "1990.00",
      "pricePeryear": "12000.00",
      "isActive": true
    }
  }
]
```

📥 **/GET /cars/:id**

Rota responsável por listar um carro específico.

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

🔐 Nível de permissão da rota: **público**.

Retorno esperado (200):

```json
{
  "id": "7e94589d-efc1-4ac7-aced-57667dda289e",
  "licensePlate": "9999999",
  "color": "black",
  "model": "Nova Balanciaga",
  "fuel": "G",
  "year": 2015,
  "brand": "Ford",
  "rented": false,
  "document": true,
  "isActive": true,
  "price": "35000.00",
  "km": "5000.00",
  "hp": 125,
  "maintenence": false,
  "img": null,
  "categories": {
    "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
    "name": "Categoria A",
    "automatic": false,
    "type": "hatch",
    "airConditioning": true,
    "directionType": "eletro-hidraulica",
    "powerWindows": true,
    "pricePerDay": "500.00",
    "pricePerMouth": "1990.00",
    "pricePeryear": "12000.00",
    "isActive": true
  }
}
```

📦 **/PATCH /cars/:id**

Rota responsável pela alteração de dados de um carro.

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

🔐 Nível de permissão da rota: **administrador**.

Exemplo de corpo (body) da requisição:

```json
{
  "km": 0,
  "color": "white",
  "hp": 550
}
```

Retorno esperado (200):

```json
{
  "id": "7e94589d-efc1-4ac7-aced-57667dda289e",
  "licensePlate": "9999999",
  "color": "white",
  "model": "Nova Balanciaga",
  "fuel": "G",
  "year": 2015,
  "brand": "Ford",
  "rented": false,
  "document": true,
  "isActive": true,
  "price": "35000.00",
  "km": "5000.00",
  "hp": 550,
  "maintenence": false,
  "img": null,
  "categories": {
    "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
    "name": "Categoria A",
    "automatic": false,
    "type": "hatch",
    "airConditioning": true,
    "directionType": "eletro-hidraulica",
    "powerWindows": true,
    "pricePerDay": "500.00",
    "pricePerMouth": "1990.00",
    "pricePeryear": "12000.00",
    "isActive": true
  }
}
```

💽 **DELETE /cars/:id**

Rota para deleção de um carro.

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

🔐 Nível de permissão da rota: **administrador**.

Requisição do verbo **delete** do protocolo **HTTP,** portanto não é necessário um corpo (body) de requisição.

Retorno esperado (204): No body content

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
  "airConditioting": true,
  "directionType": "eletro-hidraulica",
  "powerWindows": true,
  "pricePerDay": 500,
  "pricePerMouth": 1990,
  "pricePeryear": 12000
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
  "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
  "airConditioning": true,
  "isActive": true
}
```

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
  "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
  "name": "Categoria A",
  "automatic": false,
  "type": "hatch",
  "airConditioning": true,
  "directionType": "eletro-hidraulica",
  "powerWindows": true,
  "pricePerDay": "500.00",
  "pricePerMouth": "1990.00",
  "pricePeryear": "12000.00",
  "isActive": true,
  "cars": []
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

Retorno esperado (204): No body content.

## ❌ Possíveis erros da rota

📥 **GET /category/:id/cars**

Requisição de uma categoria com id inválido.

Retorno esperado 404:

```json
{
  "message": "category was not found"
}
```

# 💵 /rent

Rota responsável por criar aluguéis de carros.

Observações:

Um usuário só pode ter requisitar um aluguel de um carro cumprindo os seguintes requisitos:

- Deve ter um endereço cadastrado;
- Deve ter uma CNH válida cadastrada;
- O usuário deve ter a propriedade isActive como **true**
- Pelo menos um cartão de crédito válido cadastrado.

Um carro só pode ser alugado com o seguinte requisito:

- A propriedade maintence do carro não pode estar como **true;**
- O carro não pode ter a propriedade rented como **true;**
- O carro deve ter a propriedade document como **true.**

## Requisições:

📤 **/POST**

Rota responsável por criar um novo aluguel.

🔐 Nível de permissão da rota: **usuário**.

Exemplo de corpo (body):

```json
{
  "initialDate": "09/10/2023",
  "initialHour": "05:00:00.00",
  "finalDate": "09/12/2023",
  "finalHour": "10:00:00.00",
  "carId": "7e94589d-efc1-4ac7-aced-57667dda289e"
}
```

Retorno esperado (201):

```json
{
  "initialDate": "09/10/2023",
  "initialHour": "05:00:00.00",
  "finalDate": "09/12/2023",
  "finalHour": "10:00:00.00",
  "totalValue": 1104.17,
  "users": {
    "id": "da281e6e-b9c4-4f57-99e7-1cab82efaed8",
    "name": "Samuel Persuhn",
    "birthDate": "1996-06-07",
    "cpf": "00000000000",
    "age": 26,
    "email": "samu192@beecar.com",
    "isAdm": true,
    "isActive": true,
    "cnh": {
      "id": "ab6327c4-3792-49b8-a870-7193b93ea580",
      "type": "AB",
      "number": "13245687900",
      "validate": "2022-10-09"
    },
    "address": {
      "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
      "district": "Caiobá",
      "zipCode": "84520060",
      "number": "9999",
      "city": "Jacundá",
      "state": "RR"
    },
    "cards": [
      {
        "id": "401670e5-59b3-452d-9dc7-d6ac783e81ec",
        "cardNumber": "123679823",
        "validate": "2024-10-09",
        "name": "Juarez Silveira"
      }
    ]
  },
  "cars": {
    "id": "7e94589d-efc1-4ac7-aced-57667dda289e",
    "licensePlate": "9999999",
    "color": "white",
    "model": "Nova Balanciaga",
    "fuel": "G",
    "year": 2015,
    "brand": "Ford",
    "rented": false,
    "document": true,
    "isActive": true,
    "price": "35000.00",
    "km": "5000.00",
    "hp": 550,
    "maintenence": false,
    "img": null,
    "categories": {
      "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
      "name": "Categoria A",
      "automatic": false,
      "type": "hatch",
      "airConditioning": true,
      "directionType": "eletro-hidraulica",
      "powerWindows": true,
      "pricePerDay": "500.00",
      "pricePerMouth": "1990.00",
      "pricePeryear": "12000.00",
      "isActive": true
    }
  },
  "id": "0a6a6105-45f9-452e-8d66-3a917e11ca76"
}
```

Observação: Haverá a geração de um id da locação que está vinculada ao usuário e ao carro.

📦 **/PATCH /rent/:id**

Atualiza os dados de um determinado aluguel.

🔐 Nível de permissão da rota: **usuário**.

⚠️ O **id** da categoria deve ser passado por _query params_ **(:id)**

Requisição de corpo (body):

```json
{
  "finalHour": "08:00"
}
```

Retorno esperado (200):

```json
{
  "message": "rent updated",
  "update": {
    "id": "0a6a6105-45f9-452e-8d66-3a917e11ca76",
    "initialDate": "2023-09-10",
    "initialHour": "05:00:00",
    "finalDate": "2023-09-12",
    "finalHour": "08:00:00",
    "totalValue": "1062.50",
    "users": {
      "id": "da281e6e-b9c4-4f57-99e7-1cab82efaed8",
      "name": "Samuel Persuhn",
      "birthDate": "1996-06-07",
      "cpf": "00000000000",
      "age": 26,
      "email": "samu192@beecar.com",
      "isAdm": true,
      "cnh": {
        "id": "ab6327c4-3792-49b8-a870-7193b93ea580",
        "type": "AB",
        "number": "13245687900",
        "validate": "2022-10-09"
      },
      "address": {
        "id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
        "district": "Caiobá",
        "zipCode": "84520060",
        "number": "9999",
        "city": "Jacundá",
        "state": "RR"
      },
      "cards": [
        {
          "id": "401670e5-59b3-452d-9dc7-d6ac783e81ec",
          "cardNumber": "123679823",
          "validate": "2024-10-09",
          "name": "Juarez Silveira"
        }
      ]
    },
    "cars": {
      "id": "7e94589d-efc1-4ac7-aced-57667dda289e",
      "licensePlate": "9999999",
      "color": "white",
      "model": "Nova Balanciaga",
      "fuel": "G",
      "year": 2015,
      "brand": "Ford",
      "rented": true,
      "document": true,
      "isActive": true,
      "price": "35000.00",
      "km": "5000.00",
      "hp": 550,
      "maintenence": false,
      "img": null,
      "categories": {
        "id": "69a2d850-6b31-4d48-82d3-492d7ab40696",
        "name": "Categoria A",
        "automatic": false,
        "type": "hatch",
        "airConditioning": true,
        "directionType": "eletro-hidraulica",
        "powerWindows": true,
        "pricePerDay": "500.00",
        "pricePerMouth": "1990.00",
        "pricePeryear": "12000.00",
        "isActive": true
      }
    }
  }
}
```

📥 **/GET**

Retorna todos os alugueis feitos pelo usuário.

🔐 Nível de permissão da rota: **usuário**.

Retorno esperado (200):

```json
[
	{
		"id": "a372cd72-6543-4b99-9da6-16b3401c998a",
		"initialDate": "2023-09-10",
		"initialHour": "05:00:00",
		"finalDate": "2023-09-12",
		"finalHour": "10:00:00",
		"totalValue": "1104.17",
		"users": {
			"id": "da281e6e-b9c4-4f57-99e7-1cab82efaed8",
			"name": "Samuel Persuhn",
			"birthDate": "1996-06-07",
			"cpf": "00000000000",
			"age": 26,
			"email": "samu192@beecar.com",
			"isAdm": true,

			"isActive": true,
			"cnh": {
				"id": "ab6327c4-3792-49b8-a870-7193b93ea580",
				"type": "AB",
				"number": "13245687900",
				"validate": "2022-10-09"
			},
			"address": {
				"id": "e429e3ae-2a62-4935-b4e6-d2390fe06e0d",
				"district": "Caiobá",
				"zipCode": "84520060",
				"number": "9999",
				"city": "Jacundá",
				"state": "RR"
			},
			"cards": [
				{
					"id": "401670e5-59b3-452d-9dc7-d6ac783e81ec",
					"cardNumber": "123679823",
					"validate": "2024-10-09",
					"name": "Juarez Silveira"
				}
		]
	}
]
```

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
