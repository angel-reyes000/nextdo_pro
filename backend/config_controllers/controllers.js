const {pool} = require('../config_database/dataBase');

const readNote = async (req, res) => {
    try {
        const consulta = "SELECT * FROM note ORDER BY id ASC";
        const resultado = await pool.query(consulta)
        res.json({
            "response": resultado.rows
        })
    } catch (error) {
        res.status(500).json({
            "error": error.message
        })
    }
}

const createNote = async (req, res) => {
    try {
        let {title, description, deadline, priority} = req.body;

        today_date = new Date().toLocaleDateString()
        pass = true;

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


        const consulta = "INSERT INTO note (title, description, deadline, priority) VALUES ($1, $2, $3, $4)";

        const valores = [title, description, deadline, priority];

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

module.exports = {createNote, readNote, updateNote, deleteNote};