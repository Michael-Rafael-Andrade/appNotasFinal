// importação da classe que gerencia as notas na memória
const Nota = require('../model/modelos.js')

// cria e já exporta a função que será responsável pela tela principal
exports.tela_principal = async function(req, res){
    // nota criada para teste
    // await notas.cria('nota_1', "Olá mundo, Notas", "Esta é uma nota para testar as funcionalidades da aplicação de notas.")
    const notas = await Nota.findAll(); // 
    
    const contexto = {
        titulo_pagina: "Gerenciador de Notas de Texto",
        notas: notas,
    }

    // renderiza o arquivo index.hbs, dentro da pasta view
    res.render('index', contexto);
}

exports.sobre = async function(req, res){
    contexto = {
        titulo_pagina: "Sobre o Aplicativo",
    }

    // renderiza o arquivo na dentro da pasta view
    res.render('sobre', contexto);
}

exports.notaCria = async function(req, res){
    contexto = {
        titulo_pagina: "Cria notas",
    }
    // renderiza o arquivo dentro da pasta View
    res.render('criaNota', contexto);
}