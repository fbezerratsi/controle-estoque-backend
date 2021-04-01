const dotenv = require('dotenv')
const express = require('express')
const app = express()
const routes = require('./routes')

dotenv.config()

require('./config/db')


app.use(express.json())
app.use(routes)
app.disable('x-powered-by') // Remover da resposta HTTP (header: x-powered-by) a referência de que o Express/Node compõem a lista de tecnologias utilizadas, isso irá afastar rotinas mais simples de varredura e ataques automatizados
app.listen(process.env.PORT || 3000, () => {
    console.log('Executando...') 
    console.log('Testar Banco: ' + process.env.DB_BANCO)
    console.log('Testar HOST: ' + process.env.DB_HOST)
    console.log('Testar USER: ' + process.env.DB_USER)
    console.log('Testar SENHA: ' + process.env.DB_PASSWORD)
    console.log('Testar PORTA: ' + process.env.DB_PORT)
    console.log('Testar AUTH SECRET: ' + process.env.AUTH_SECRET)
    console.log('Testar URL: ' + process.env.DATABASE_URL)
})

