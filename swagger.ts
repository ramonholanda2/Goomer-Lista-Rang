const swaggerAutogen = require("swagger-autogen")

const doc = {
    info: {
        version: "1.0.0",
        title: "Gooner-Lista-Rango",
        description: "Documentação da API com Swagger"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './swagger.json'
const endpointsFiles = ["./src/**/routes/*.routes.ts"]

swaggerAutogen(outputFile, endpointsFiles, doc)
