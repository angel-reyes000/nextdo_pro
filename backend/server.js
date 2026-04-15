const express = require('express');
const cors = require('cors')
const {pool, crearConexion} = require('./config_database/dataBase')
const { createNote, readNote, updateNote, deleteNote, readUser, createUser, postLogIn, getLogin, auth, postGoogle } = require('./config_controllers/controllers')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        "Dato": "Get funcionando",
    })
})

app.get('/api/notes', auth, readNote);
app.post('/api/notes', auth, createNote);
app.put('/api/notes', updateNote);
app.delete('/api/notes', deleteNote);

app.get('/api/users', readUser);
app.post('/api/users', createUser);

app.get('/api/login', getLogin)
app.post('/api/login', postLogIn);

app.post('/auth/google', postGoogle);

const startServer = async () => {
    try {
        await crearConexion()
        console.log("Base de datos conectada✅")
        app.listen(4000, async () => {
            console.log("Server run correctly")
        })
    } catch (error) {
        console.error("Error: ", error)
    }
}

startServer();