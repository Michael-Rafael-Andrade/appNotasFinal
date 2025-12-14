// importação da classe que gerencia as notas na memória
// const notas = require('../model/modelos.js')
const { Usuario, Nota, Tag } = require('../model/modelos.js')

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

    nota.dataValues.tags = await nota.getTags()
    const usuario = await nota.getUsuario()
    const nome = usuario.dataValues.nome
    nota.dataValues.usuario = nome

    contexto = {
        titulo_pagina: "Consulta a Nota",
        nota: nota.dataValues,
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
   
    await Nota.destroy({
        where: {
            id: Number(req.params.id), // informação passada com parâmetro na url
        },
    });

    // redireciona para a página principal
    res.redirect('/');
}

exports.lida = async function (req, res){
    await Nota.update(
        { lida: true },
        { where: { id: req.params.id } },
    )

    // redireciona para a página principal
    res.redirect('/');
}

// cria e já exporta a função que será responsável pela alteração do status para não lida
exports.naolida = async function(req,res){
    await Nota.update(
        { lida: false },
        { where: { id: req.params.id } },
    )
    // redireciona para a página principal
    res.redirect('/');
}

// realiza o povoamento de dados no banco de dados
exports.povoamento = async function (req, res){
    // criação de usuários
    const usuaario1 = await Usuario.create({
        nome: 'Alice',
        sobrenome: 'Costa',
        email: 'alice@email.com.br',
    })

    const usuario2 = await Usuario.create({
        nome: 'Ricardo',
        sobrenome: 'Silva',
        email: 'ricardo@email.com.br',
    })

    const usuario3 = await Usuario.create({
        nome:'Mariana',
        sobrenome: 'Oliveira',
        email: 'mariana@email.com.br',

    })

    // criação de tags
    const tag1 = await Tag.create({
        tag: 'Trabalho',
        cor: '#0dbeffff',
    })

    const tag2 = await Tag.create({
        tag: 'Pessoal',
        cor: '#ffc043ff',
    })

    const tag3 = await Tag.create({
        tag: 'Urgente',
        cor: '#ff3033ff',
    })

    // criação de notas associadas aos usuários
    const nota1_usuario1 = await Nota.create({
        titulo: 'Comprar mantimentos',
        texto: 'Leite, pão, ovos, frutas e vegetais',
        importancia: 1,
        usuario_id: usuaario1.id,
    })
    await nota1_usuario1.addTags([tag2]);

    const nota2_usuario1 = await Nota.create({
        titulo: 'Reunião com a equipe',
        texto: 'Discutir o progresso do projeto e próximos passos',
        importancia: 5,
        usuario_id: usuario1.id,
    })
    await nota2_usuario1.addTags([tag1, tag3]);

    const nota3_usuario1 = await Nota.create({
        titulo: 'Ligar para o encanador',
        texto: 'Agendar conserto do vazamento na cozinha',
        importancia: 4,
        usuario_id: usuario1.id,
    })
    await nota3_usuario1.addTags([tag2, tag3]);

    const nota1_usuario2 = await Nota.create({
        titulo: 'Consulta medica',
        texto: 'Check-up anual às 10h',
        importancia: 4,
        usuario_id: usuario2.id,
    })
    await nota1_usuario2.addTags([tag2]);

    const nota2_usuario2 = await Nota.create({
        titulo: 'Preparar apresentação',
        texto: 'Criar slides para a conferência de tecnologia',
        importancia: 5,
        usuario_id: usuario2.id,
    })
    await nota2_usuario2.addTags([tag1]);

    const nota3_usuario2 = await Nota.create({
        titulo: 'Renovar seguro do carro',
        texto: 'verificar opções e renovar antes do vencimento',
        importancia: 3,
        usuario_id: usuario2.id,
    })
    await nota3_usuario2.addTags([tag3]);

    const nota1_usuario3 = await Nota.create({
        titulo: 'Planejar viagem',
        texto: 'Reservar voos e hotéis para as férias de verão',
        importancia: 2,
        usuario_id: usuario3.id,
    })
    await nota1_usuario3.addTags([tag2]);

    const nota2_usuario3 = await Nota.create({
        titulo: 'Pagar contas',
        texto: 'Energia, água, internet e telefone',
        importancia: 4,
        usuario_id: usuario3.id,
    })
    await nota2_usuario3.addTags([tag3]);

    const nota3_usuario3 = await Nota.create({
        titulo: 'Aula de yoga',
        texto: 'Participar da aula online às 18h',
        importancia: 1,
        usuario_id: usuario3.id,
    })
    await nota3_usuario3.addTags([tag2])

    // redireciona para a página principal
    res.redirect('/');
}

exports.relatorio = async function(req, res){
    const total_usuarios = await Usuario.count()
    const total_notas = await Nota.count()
    const total_tags = await Tag.count()

    const notas_por_usuario = [];
    const usuarios = await Usuario.findAll();
    // ficou faltando escrever não apareceu na tela! .....
    //....
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

