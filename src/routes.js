const express = require('express')
const { toDos } = require("./data/memory")

const router = express.Router()

router.get('/tarefas', (req, res) => {
    return res.status(200).json({ tarefas: toDos})
})

router.put('/tarefas/:id', (req, res) => {
    const  id = req.params.id

    const tarefa = toDos.find(t => t.id === id)
    
    tarefa.titulo = req.body.titulo
    tarefa.feito = req.body.feito
    res.status(200).json({ tarefas: tarefa})
})

router.post('/tarefas', (req, res) => {
    const { titulo, descricao } = req.body;

    if(!titulo) {
        return res.status(400).json({mensagem: "Título é obrigatório"})
    }

    const novaTarefa = {
        id: new Date().toString(),
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