// model/modelos.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

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

// cria um modelo par sincronizar com o banco de dados
sequelize.sync({ alter: true }).then(() => { // alter: true, para aplicar alterações de código no BD
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
});

module.exports = Nota;