const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")
const bcrypt = require("bcrypt")

const app = express()
const PORT = 2000

const db = new sqlite3.Database("./database.db")
app.use(express.json())
app.use(cors())

// Criação da tabela de livros

db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY, 
    titulo TEXT,
    autor TEXT,
    ano INTEGER,
    idioma TEXT,
    genero TEXT,
    preco REAL
)`)

// Rotas para gerenciar livros

app.post("/livros", (req, res) => {
    let titulo = req.body.titulo
    let autor = req.body.autor
    let ano = req.body.ano
    let idioma = req.body.idioma
    let genero = req.body.genero
    let preco = req.body.preco

    db.run(`INSERT INTO LIVROS (titulo, autor, ano, idioma, genero, preco)
           VALUES (?, ?, ?, ?, ?, ?)`,
           [titulo, autor, ano, idioma, genero, preco],
           function(err) {
               if (err) {
                   return res.status(400).json({ error: err.message })
               }
               res.status(201).json({id : this.lastID})
           }
    )
})

// Rota para obter todos os livros

app.get("/livros", (req, res) => {
    db.all(`SELECT * FROM livros`, [], (err,rows) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json(rows)
    })
})

// Rota para obter um livro por ID

app.get("/livros/:id", (req, res) => {
    const id = req.params.id
    db.get(`SELECT * FROM livros WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        if (row){
            res.json(row)
        } else {
            res.status(404).json({ error: "Livro não encontrado" })
        }
    })
})

// Rota para atualizar um livro por ID

app.put("/livros/:id", (req, res) => {
    const id = req.params.id
    const { titulo, autor, ano, idioma, genero, preco } = req.body
    db.run(`UPDATE livros SET titulo = ?, autor = ?, ano = ?, idioma = ?, genero = ?, preco = ? WHERE id = ?`,
        [titulo, autor, ano, idioma, genero, preco, id],
        function(err) {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
            if (this.changes === 0) {
                res.status(404).json({ error: "Livro não encontrado" })
            } else {
                res.json({ message: "Livro atualizado com sucesso" })
            }
    })
})
// Rota para deletar um livro por ID

app.delete("/livros/:id", (req, res) => {
    const id = req.params.id
    db.run(`DELETE FROM livros WHERE id =?`, [id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Livro não encontrado" })
        } else {
            res.json({ message: "Livro deletado com sucesso" })
        }
    })
})

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
//function dev(){
//  console.log("dev yan");
//}