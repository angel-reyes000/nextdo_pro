const {Pool} = require('pg');
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

const crearConexion = async () => {
    try {
        const cliente = await pool.connect()
        console.log("Base de datos conectada✅")
    } catch (error) {
        console.error(error.message)
    } 
    
} 

module.exports = {pool, crearConexion};