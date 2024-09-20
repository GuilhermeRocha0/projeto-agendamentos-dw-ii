const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const post = require('./models/post')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/cadastrar', function(req, res) {
  post.create({
    nome: req.body.nome,
    telefone: req.body.telefone,
    origem: req.body.origem,
    data_contato: req.body.dataContato,
    observacao: req.body.observacao
  })
  .then(function() {
    console.log('Dados cadastrados com sucesso!')
    res.redirect("/")
  })
  .catch(function(err) {
    console.log('Erro ao cadastrar dados na entidade: ' + err)
  })
})

app.post('/atualizar', function(req, res) {
  post.update({
    nome: req.body.nome,
    telefone: req.body.telefone,
    origem: req.body.origem,
    data_contato: req.body.dataContato,
    observacao: req.body.observacao
  }, { 
    where: {
      id: req.body.id
    } 
  }).then(function() {
    console.log("Dados atualizados com sucesso!")
    res.redirect("/consultar")
  }).catch(function(err) {
    console.log("Erro ao atualizar dados: " + err)
  })
})

app.post('/deletar', function(req, res) {
  post.destroy({ 
    where: {
      'id': req.body.id
    }
  })
  .then(function() {
    console.log("Dados excluídos com sucesso!")
    res.redirect('/consultar')
  })
  .catch(function(err) {
    console.log("Erro ao excluir dados: " + err)
  })
})

app.get('/consultar', function(req, res) {
  post.findAll().then(function(posts) {
    res.render("consultar", {posts})
    console.log(posts)
  })
})

app.get('/editar/:id', function(req, res) {
  post.findAll({ where: { 'id': req.params.id }})
  .then(function(posts) {
    res.render('editar', {posts})
    console.log(posts)
  })
})

app.get("/excluir/:id" , function(req, res) {
  post.findAll({ where: { 'id': req.params.id }})
  .then(function(posts) {
    res.render('excluir', {posts})
    console.log(posts)
  })
})

app.get('/', function(req, res) {
  res.render('primeira_pagina')
})

app.get('/segunda', function(req, res) {
  res.render('segunda_pagina')
})

app.listen(8081, function() {
  console.log('Servidor Ativo!')
})
