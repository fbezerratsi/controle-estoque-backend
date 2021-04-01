

console.log('Variável de ambiente: ' + process.env.DB_USER)

module.exports = {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BANCO,
    define: {
        timestamps: true,
        underscored: true,
    },
}