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
  "message": "não tem"
}
```

Observações: os elementos **pricePerMouth** e **pricePerYear** são opcionais, o resto dos dados é de caráter obrigatório na requisição.

Atenção: Esse verbo de protocolo http desta rota é disponível apenas para usuários com autenticação de **administrador**.

**GET /category**

Lista todas as categorias disponíveis

Padrão de resposta:

**STATUS CODE: 200**

```json
{
  "ainda terá exemplo": true
}
```

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
