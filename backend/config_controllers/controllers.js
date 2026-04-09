const {pool} = require('../config_database/dataBase');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const readNote = async (req, res) => {
    try {
        const consulta = "SELECT * FROM note WHERE user_id = $1";
        const resultado = await pool.query(consulta, [req.user.id])
        res.json({
            "response": resultado.rows
        })
    } catch (error) {
        res.status(500).json({
            "Error": error.message
        })
    }
}

const createNote = async (req, res) => {
    try {
        let {title, description, deadline, priority} = req.body;

        let today_date = new Date().toLocaleDateString()

            if (!title) {
                title = "NA"
            } 
            if (!description) {
                description = "NA"
            } 
            if (!deadline) {
                deadline = today_date
            } 
            if (!priority) {
                priority = "Low"
            } 


        const consulta = "INSERT INTO note (user_id, title, description, deadline, priority) VALUES ($1, $2, $3, $4, $5)";

        const valores = [req.user.id, title, description, deadline, priority];

        const resultado = await pool.query(consulta, valores)

        res.status(201).json({
            "detalles": "New task added correctly",
            "respuesta": resultado.rows
        })
        console.log("Correcto")
    } catch (error) {
        res.status(404).json({
            "error": error.message,
            "detalles": "Error al crear valor"
        })
    }
}

const updateNote = async (req, res) => {
    try {

        const {id, title, description, deadline, priority} = req.body;

        const consulta = `
            UPDATE note
            SET title = $1, description = $2, deadline = $3, priority = $4
            WHERE id = $5
            RETURNING *
        `;

        const values = [title, description, deadline, priority, id]

        const resultado = await pool.query(consulta, values);

        res.status(201).json({
            "state": "exito",
            "resultado": resultado.rows[0]
        })

    } catch (error) {
        res.status(404).json({
            "error": error.message,
            "details": "Task no found"
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        const {id} = req.body;

        const consulta = "DELETE FROM note WHERE id = $1 RETURNING *";

        const resultado = await pool.query(consulta, [id])

        res.status(201).json({
            state: true,
            message: "Exitosa eliminacion de dato",
            data: resultado.rows[0]
        })

    } catch (error) {
        res.status(404).json({
            state: false,
            message: "Fallida eliminacion de dato",
            error: error.message
        })
    }
}

const readUser = async (req, res) => {
    try {
        const consulta = "SELECT * FROM users ORDER BY id ASC";

        const resultado = await pool.query(consulta)

        res.status(201).json({
            "Details": "Read correctly",
            "Response": resultado.rows
        })

    } catch (error) {
        res.status(404).json({
            "Error": error.message
        })
    }
}

const createUser = async (req, res) => {
    try {
        let {name, last_name, email, password } = req.body;
                
        if (!name || !last_name || !email || !password) {
            return res.status(400).json({
                "Error": "Campos faltantes"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const consulta = `INSERT INTO users (name, last_name, email, password)
                          VALUES ($1, $2, $3, $4) RETURNING *`;

        const valores = [name, last_name, email, hashedPassword]

        const resultado = await pool.query(consulta, valores)

        res.status(201).json({
            "Details": "User added correctly",
            "response": resultado.rows[0]
        })

    } catch (error) {
        res.status(404).json({
            "Error": error.message,
        })
    }
        

}

const getLogin = async (req, res) => {
    return res.send("Log in")
}

const postLogIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            "Error": "Empty fields or incorrect data"
        });
    }

    const consulta = "SELECT * FROM users WHERE email = $1";

    const resultado = await pool.query(consulta, [email]);

    const user = resultado.rows[0];

    if (!user) {
        return res.status(400).json({
            "Error": "Incorrect data"
        })
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            "Error": "Incorrect password"
        })
    }

    const token = jsonwebtoken.sign(
        { id: user.id },
        process.env.SECRET,
        { expiresIn: "1h"}
    );

    return res.status(200).json({
        message: "Correct Login",
        userID: user.id,
        token: token
    })

}

const auth = async (req, res, next) => {    
    try {
        const token = req.headers.authorization;
        console.log("token recibido", token)

        if (!token) return res.status(404).json({"Error": "Token no valid"});

        const decoded = jsonwebtoken.verify(token, process.env.SECRET);

        req.user = decoded;

        next()

    } catch (error) {
        res.status(400).json({
            "Error": error.message
        })
    }
}


module.exports = {createNote, readNote, updateNote, deleteNote, readUser, createUser, postLogIn, getLogin, auth};