const express = require('express')
const { toDos } = require("./data/memory")
const { authMiddleware } = require('./middlewares/auth')

const router = express.Router()
router.use(authMiddleware)

router.get('/tarefas', (req, res) => {
    return res.status(200).json({mensagem: "Lista de tarefas", tarefas: toDos})
})

router.delete('/tarefas/:id', (req, res) => {
    const  id = req.params.id
    const tarefa = toDos.find(t => t.id === Number(id))
    if(!tarefa) {
        return res.status(400).json({mensagem: "ID não encontrado"})
    }
    const tarefaDeletada = toDos.filter(t => t.id !== Number(id))
    toDos.splice(0, toDos.length, ...tarefaDeletada)
    
    res.status(200).json({ mensagem: "Tarefa deletada!", tarefa: tarefa})
})

router.put('/tarefas/:id', (req, res) => {
    const  id = req.params.id
    const tarefa = toDos.find(t => t.id === Number(id))
    if(!tarefa) {
        return res.status(400).json({mensagem: "ID não encontrado"})
    }
    
    tarefa.titulo = req.body.titulo
    tarefa.feito = req.body.feito
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