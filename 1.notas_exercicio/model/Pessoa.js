const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js'); // Assumindo que 'server.js' exporta a instância de conexão

class Pessoa extends Model { }

Pessoa.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        nome: { type: DataTypes.STRING, allowNull: false },
        sobrenome: { type: DataTypes.STRING, allowNull: false },
        idade: { type: DataTypes.INTEGER, allowNull: false },
        altura: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

// FUNÇÃO ASSÍNCRONA DE INICIALIZAÇÃO E TESTE
async function runTests() {
    try {
        // 1. SINCRONIZAR COM O BANCO DE DADOS
        // Garante que a tabela 'Pessoa' existe antes de tentar inserir.
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com o banco de dados.');

        // 2. CRIAÇÃO DE UM REGISTRO (Utiliza await)
        // Este é o bloco que deve estar dentro da função async.
        const pessoa = await Pessoa.create({
            nome: "Michael",
            sobrenome: "Andrade",
            idade: 37,
            altura: 1.70,
            // Removendo id e datas para deixar o Sequelize gerenciar (autoIncrement e timestamps)
        });

        console.log("Pessoa criada com sucesso:");
        console.log(pessoa.dataValues);

    } catch (error) {
        console.error('Erro durante a sincronização ou criação de Pessoa: ', error);
    }

    const pessoa = await Pessoa.findOne({
        where: { id: 3 },
    });

    console.log(pessoa.dataValues);
}

// CHAMA A FUNÇÃO ASSÍNCRONA para iniciar a execução.
// Esta chamada não usa await, evitando o SyntaxError.
runTests();



// Exporta o modelo para ser usado em outras partes da aplicação
module.exports = Pessoa;