const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');
const Pessoa = require('./Pessoa.js');

class Endereco extends Model { }
Endereco.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        rua: { type: DataTypes.STRING, allowNull: false },
        bairro: { type: DataTypes.STRING, allowNull: false },
        numero: { type: DataTypes.INTEGER, allowNull: false },
        cep: { type: DataTypes.STRING }, // opcional
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

// Definindo o relacionamento 1:1 entre PESSOA e ENDERECO
Pessoa.hasOne(Endereco, {
    onDelete: 'CASCADE', // quando a pessoa for excluída o endereço também será escluído.
    onUpdate: 'RESTRICT', // impede de atualizar a chave primária da pessao

    foreignKey: { // muda o nome da chave estrangeira.
        name: 'pessoa_id',
        allowNull: false, // allow = permite // Null = nulo = (permite nulo ? )
    },
});
Endereco.belongsTo(Pessoa, {
    foreignKey: {
        name: 'pessoa_id',
        // allowNull: false,
    }
});

// FUNÇÃO ASYNC QUE EXECUTA TUDO EM ORDEM CORRETA
async function run() {

    // PASSO 1: SINCRONIZAR. O await garante que as tabelas existem antes de prosseguir.
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados com o banco de dados.');

    // PASSO 2: GARANTIR A CHAVE ESTRANGEIRA. Precisamos garantir que a Pessoa com ID 1 exista.
    // Usamos findOrCreate para ser simples: se existir, usa. Se não, cria (geralmente com ID 1).
    const [pessoa, created] = await Pessoa.findOrCreate({
        where: { id: 1 },
        defaults: {
            nome: "Usuario Teste",
            sobrenome: "Sistema",
            idade: 30,
            altura: 1.80,
        }
    });

    // PASSO 3: CRIAR O ENDEREÇO. Agora a tabela e a FK estão prontas.
    const endereco = await Endereco.create({
        rua: "Rua A",
        bairro: "Centro",
        numero: 100,
        cep: "12345-678",
        pessoa_id: pessoa.id,
    });

    console.log("Endereço criado com sucesso:");
    console.log(endereco.dataValues);
}

// EXECUÇÃO CORRETA: Chama a função e usa o .then() para esperar que tudo termine.
run().catch((error) => {
    console.error('Erro durante a execução do script: ', error);
});

// cria um modelo par sincronizar com o banco de dados
sequelize.sync({ alter: true }).then(() => { // alter: true, para aplicar alterações de código no BD
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
});

module.exports = Endereco;