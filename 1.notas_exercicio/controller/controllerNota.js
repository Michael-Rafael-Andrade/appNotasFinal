// importação da classe que gerencia as notas na memória
// const notas = require('../model/modelos.js')
const Nota = require('../model/modelos.js')

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
    var id = req.params.id;
    var nota = await Nota.findByPk(id); // função asincrona.
    await Nota.update(
        { lida: true },
        { where: { id: id } },
    )

    contexto = {
        titulo_pagina: "Consulta a Nota",
        id: nota.id,
        titulo: nota.titulo,
        texto: nota.texto,
        importancia: nota.importancia,
    }
    // renderiza o arquivo dentro da pasta view
    res.render('consultaNota', contexto);
}

// cria e já exporta a função que será responsável pela alteração de nota
exports.altera_get = async function (req, res) {
    // informação passada como parâmetro na url
    var id = req.params.id;
    var nota = await Nota.findByPk(id);

    contexto = {
        titulo_pagina: "Altera a Nota",
        id: nota.id,
        titulo: nota.titulo,
        texto: nota.texto,
        importancia: nota.importancia,
        lida: nota.lida
    }
    // renderiza o arquivo dentro da pasta view
    res.render('alteraNota', contexto);
}

// cria e já exporta a função que será responsável pela criação de nota
exports.altera_post = async function (req, res) {
    // obtem as informações do formulário
    // var chave = req.body.chave;
    const nova_nota = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        importancia: Number(req.body.importancia),
        lida: req.body.status === 'on' ? true : false
    // var status = req.body.status;
    }
    // var status = req.body.status ? 'lida' : 'não lida';

    // atualiza a nota com a chave
    await Nota.update(
        nova_nota,
        { where: { id: req.body.id }},
    )

    // redireciona para a pagina principal
    res.redirect('/');
}

// cria e já exporta a função que será responsável pela exclusão da nota 
exports.deleta = async function (req, res) {
    // informação passada como parâmetro na url
    var id = req.params.id;
    await Nota.destroy({     // FORMA CORRETA PARA EXCLUIR UM DADO.
        where: { id: id} });

    // redireciona para a página principal
    res.redirect('/');
}

exports.mudaStatus = async function (req, res) {
    var id = req.params.id; // obtém o id
    var nota = await Nota.findByPk(id); // var nota recebe os dados ref id

    // Lógica crucia: invete o valor booleano atual de 'lida'
    const novo_status = !nota.lida;
    
    // Atualiza apenas o campo 'lida'
    await Nota.update(
        { lida: novo_status },
        { where: { id: id }}
        
    );
    res.redirect('/');
}

// Helper interno simplificado para criar o contexto da view
function mapNotaToContext(nota) {
    const dados = nota.get(); 
    dados.status = dados.lida ? 'lida' : 'não lida';
    return dados;
}

