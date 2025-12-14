const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');
const Pessoa = require('./Pessoa.js'); // Se não importar Pessoa não da para fazer o relacionamento entre as entidades.

class Tarefa extends Model {  }

Tarefa.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        nome: { type: DataTypes.STRING, allowNull: false },
        categoria: { type: DataTypes.STRING, allowNull: false },
        prazo: { type: DataTypes.INTEGER, allowNull: false }, // prazo em dias
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

// Definindo o relacionamento 1:N entre Pessoa e Tarefa
Pessoa.hasMany(Tarefa, {
    onDelete: 'CASCADE', // Quando uma pessoa for excluída todas as suas tarefas serão excluídas também.
    onUpdate: 'RESTRICT',
    foreignKey: {
        name: 'pessoa_id',
        allowNull: false,
    },
});
Tarefa.belongsTo(Pessoa, {  // belongsTo = pertence a leitura = uma tarefa pertence a uma pessoa.
    foreignKey: {
        name: 'pessoa_id',
    },
});

// cria um modelo par sincronizar com o banco de dados
sequelize.sync({ alter: true }).then(() => { // alter: true, para aplicar alterações de código no BD
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
});

module.exports = Tarefa;