const express = require('express')
const { connectDB } = require("./data/database")
const { authMiddleware } = require('./middlewares/auth')

const router = express.Router()
router.use(authMiddleware)

router.get('/tarefas', async (req, res) => {
    const db = await connectDB();

    const toDos = await db.all("SELECT * FROM todos")

    return res.status(200).json({mensagem: "Lista de tarefas", tarefas: toDos})
})

router.delete('/tarefas/:id', async (req, res) => {
    const db = await connectDB();

    const  id = req.params.id
    const tarefa = await db.get("SELECT * FROM todos WHERE id = ?", [id])
    if (!tarefa) {
        return res.status(404).json({ mensagem: "ID não encontrado" })
    }
    await db.run("DELETE FROM todos WHERE id = ?", [id])
    res.status(200).json({ mensagem: "Tarefa deletada!", tarefa: tarefa})
})

router.put('/tarefas/:id', async (req, res) => {
    const db = await connectDB()
    const  id = req.params.id
    const tarefa = await db.get("SELECT * FROM todos WHERE id = ?", [id])
    if (!tarefa) {
        return res.status(404).json({ mensagem: "ID não encontrado" })
    }
    await db.run("PUT FROM todos WHERE id = ?", )
    res.status(200).json({mensagem: "Tarefa atualizada!", tarefas: tarefa})
})

router.post('/tarefas', (req, res) => {
    const { titulo, descricao } = req.body;

    if(!titulo) {
        return res.status(400).json({mensagem: "Título é obrigatório"})
    }

    const novaTarefa = {
        id: toDos.length + 1,
        titulo,
        descricao,
        feito: false
    }
    toDos.push(novaTarefa)

    return res.status(201).json({
         mensagem: "Tarefa criada com sucesso",
         tarefaCriada: novaTarefa
    })
})

module.exports = router