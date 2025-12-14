const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');
const Pessoa = require('./Pessoa.js');

class Grupo extends Model { }

Grupo.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        nome: { type: DataTypes.STRING, allowNull: false },
        descricao: { type: DataTypes.STRING, allowNull: false },
        limite_participantes: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

// Definindo o relacionamento N:M entre Pessoa e Grupo
Pessoa.belongsToMany(Grupo, {
    through: 'Pessoa_Grupo',  // relacionamento será por meio da tabela: 'Pessoa_Grupo'
    foreignKey: 'pessoa_id',  // nome da chave estrangeira
    otherKey: 'group_id',  // relacionamento com o grupo vai ter o nome de 'group_id'
    // fazer o mesmo nos dois modelos
});
Grupo.belongsToMany(Pessoa, {
    through: 'Pessoa_Grupo',
    foreignKey: 'grupo_id',
    otherKey: 'pessoa_id',
});


// cria um modelo par sincronizar com o banco de dados
sequelize.sync({ alter: true }).then(() => { // alter: true, para aplicar alterações de código no BD
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
});

module.exports = Grupo;