const dotenv = require('dotenv')
const express = require('express')
const app = express()
const routes = require('./routes')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors')

dotenv.config()

require('./config/db')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: "https://localhost:3000",
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/*.js"],
    
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors())
app.use(express.json())
app.use(routes)
app.disable('x-powered-by') // Remover da resposta HTTP (header: x-powered-by) a referência de que o Express/Node compõem a lista de tecnologias utilizadas, isso irá afastar rotinas mais simples de varredura e ataques automatizados
app.listen(process.env.PORT || 3000, () => {
    console.log('Executando...') 
})

