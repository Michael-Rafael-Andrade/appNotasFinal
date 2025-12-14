// model/modelos.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

//-------------------------------------------------------------------------------
class Usuario extends Model { } 

Usuario.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        nome: { type: DataTypes.STRING, allowNull: false },
        sobrenome: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

// -------------------------------------------------------------------------------

class Nota extends Model { } // classe herdando de 'Model'

Nota.init( // construtor com a definição dos atributos
    {
        // substituindo o atributo 'chave'
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        titulo: { type: DataTypes.STRING, unique: true, allowNull: false },
        texto: { type: DataTypes.TEXT, allowNull: false },
        importancia: { type: DataTypes.INTEGER, allowNull: false },
        lida: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {   // configurações adicionais do modelo
        sequelize, // para estabelecer conexão com BD
        freezeTableName: true, // nome da tabela igual ao nome da classe
        createdAt: 'criada_em', // nome do atributo 'createdAt'
        updatedAt: 'atualizada_em', // nome do atributo 'updatedAt'
    },
);


// Definindo o relacionamento N:1 entre Nota e Usuario
Usuario.hasMany(Nota, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    foreignKey: {
        name: 'usuario_id',
        allowNull: false,
    }
});
Nota.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
});


// -------------------------------------------------------------------------------

class Tag extends Model {  }

Tag.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        tag: { type: DataTypes.STRING(32), unique: true, allowNull: false },
        cor: { type: DataTypes.STRING(16) },
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);


// Definindo o relacionamento N:N entre Nota e Tag
Nota.belongsToMany(Tag, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    throug: 'Nota_Tag',
    foreignKey: 'nota_id',
    otherKey: 'tag_id',
});
Tag.belongsToMany(Nota, {
    through: 'Nota_Tag',
    foreignKey: 'tag_id',
    otherKey: 'nota_id',
});





// // comentar para não ficar sincronizando o banco de dados toda hora.
// // cria um modelo par sincronizar com o banco de dados
// sequelize.sync({ alter: true }).then(() => { // alter: true, para aplicar alterações de código no BD
//     console.log('Modelos sincronizados com o banco de dados.');
// }).catch((error) => {
//     console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
// });

module.exports = Nota;