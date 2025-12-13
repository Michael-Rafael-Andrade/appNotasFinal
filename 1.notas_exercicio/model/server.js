const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'notas', // nome da base de dados
    'master', // nome do usuário do banco de dados
    'user@master', // senha do usuário
    {
        host: 'localhost', // endereço do BD
        dialect: 'mysql' // dialeto do BD
    }
);

sequelize.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso.');
}).catch((error) => {
    console.log('Erro ao se conectar ao banco de dados: ', error);
});

module.exports = sequelize; // exportar

