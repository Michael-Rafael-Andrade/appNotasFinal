// importação da classe que gerencia as notas na memória
const notas = require('../model/notaMemoria.js')

// cria e já exporta a função que será responsável pela criação de nota
exports.cria_get = async function (req, res) {
    contexto = {
        titulo_pagina: "Criação de Nota",
    }

    // renderiza o arquivo dentro da pasta view
    res.render('criaNota', contexto);
}

// cria e já exporta a função que será responsável pela criação de nota
exports.cria_post = async function (req, res) {
    // obtém as informações do formulário
    // var chave = req.body.chave  // objeto express encapsula todos os campos do 
    const nova_nota = {
        // form no req.body e para acessar utilize o nome do campo.
        titulo: req.body.titulo,
        texto: req.body.texto,
        importancia: Number(req.body.importancia),
        // não precisamos passar o campo 'lida' por ter valor padrão
    }
    // cria a nota nota
    await Nota.create(nova_nota);

    // redireciona para a página principal
    res.redirect('/');
}

// cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function (req, res) {
    // informação passada como parâmetro na url
    var chave = req.params.chave_nota;
    var nota = await notas.consulta(chave);

    contexto = {
        titulo_pagina: "Consulta a Nota",
        chave: nota.chave,
        titulo: nota.titulo,
        texto: nota.texto,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('consultaNota', contexto);
}

// cria e já exporta a função que será responsável pela alteração de nota
exports.altera_get = async function (req, res) {
    // informação passada como parâmetro na url
    var chave = req.params.chave_nota;
    var nota = await notas.consulta(chave);

    contexto = {
        titulo_pagina: "Altera a Nota",
        chave: nota.chave,
        titulo: nota.titulo,
        texto: nota.texto,
        estaLida: nota.status === 'lida'
    }

    // renderiza o arquivo dentro da pasta view
    res.render('alteraNota', contexto);
}

// cria e já exporta a função que será responsável pela criação de nota
exports.altera_post = async function (req, res) {
    // obtem as informações do formulário
    var chave = req.body.chave;
    var titulo = req.body.titulo;
    var texto = req.body.texto;
    // var status = req.body.status;

    var status = req.body.status ? 'lida' : 'não lida';

    // atualiza a nota com a chave
    await notas.atualiza(chave, titulo, texto, status);

    // redireciona para a pagina de consulta da nota
    res.redirect('/nota/consulta/' + chave);
}

// cria e já exporta a função que será responsável pela exclusão da nota 
exports.deleta = async function (req, res) {
    // informação passada como parâmetro na url
    var chave = req.params.chave_nota;
    await notas.deleta(chave);

    // redireciona para a página principal
    res.redirect('/');
}

exports.mudaStatus = async function (req, res) {
    var chave = req.params.chave_nota;
    var nota = await notas.consulta(chave);
    if (nota.status === 'lida') {
        nota.status = 'não lida';
    } else {
        nota.status = 'lida';
    }

    // atualiza a nota com a chave
    await notas.atualiza(nota.chave, nota.titulo, nota.texto, nota.status);
    res.redirect('/');
}

