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

### /category

**POST /category (criação de uma categoria)**

Padrão de corpo (body) para a requisição:

```json
{
  "name": "Categoria A",
  "automatic": false,
  "type": "hatch",
  "airConditioning": true,
  "directionType": "eletro-hidráulica",
  "powerWIndows": true,
  "pricePerDay": "120,00",
  "pricePerWeekend": "350,00",
  "pricePerMouth": "1200,00",
  "pricePerYear": "6759,00"
}
```

Padrão de resposta:

**STATUS CODE: 201**

```json
{
  "id": "uuid-4555sd-exemplo",
  "name": "Categoria A",
  "automatic": false,
  "type": "hatch",
  "airConditioning": true,
  "directionType": "eletro-hidráulica",
  "powerWIndows": true,
  "pricePerDay": "120,00",
  "pricePerWeekend": "350,00",
  "pricePerMouth": "1200,00",
  "pricePerYear": "6759,00",
  "isActive": true
}
```

Observações: os elementos **pricePerMouth** e **pricePerYear** são opcionais, o resto dos dados é de caráter obrigatório na requisição.

Atenção: O verbo de protocolo http desta rota é disponível apenas para usuários com autenticação de **administrador**.

**GET /category**

Lista todas as categorias disponíveis

Padrão de resposta:

**STATUS CODE: 200**

```json
[
  {
    "id": "uuid-4555sd-exemplo",
    "name": "Categoria A",
    "automatic": false,
    "type": "hatch",
    "airConditioning": true,
    "directionType": "eletro-hidráulica",
    "powerWIndows": true,
    "pricePerDay": "120,00",
    "pricePerWeekend": "350,00",
    "pricePerMouth": "1200,00",
    "pricePerYear": "6759,00",
    "isActive": true
  },
  {
    "id": "uuid-4555sd-exemplo",
    "name": "Categoria A",
    "automatic": false,
    "type": "hatch",
    "airConditioning": true,
    "directionType": "eletro-hidráulica",
    "powerWIndows": true,
    "pricePerDay": "120,00",
    "pricePerWeekend": "350,00",
    "pricePerMouth": "1200,00",
    "pricePerYear": "6759,00",
    "isActive": true
  }
]
```

Atenção: O verbo de protocolo http desta rota é disponível apenas para usuários com autenticação de **administrador.**

**GET /category/:id/cars**

Lista todos os carros de uma determinada categoria.

Padrão de resposta:

**STATUS CODE: 200**

```json
{
  "ainta terá um exemplo": true
}
```

Observação: é necessário fornecer o id da categoria pela URL através dos query params.

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
    
  </tr>
</table>
