const Sequelize = require('sequelize');

const connection = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
}
)

// var conexoes = new Map();

// axios.post('https://manager.infatec.solutions/api/conexaoPEGE/',
//     {
//         infaToken: 'ee4ef331fd5a6d00b6db0e2b3a75f7ea90031e3def2a2b274c1675e2f237e582',
//         devMode: 'True'
//     }
// ).then(function (response) {
//     response.data.forEach(element => {
//         conexoes.set(element.prefixo, new Sequelize(
//             element.base, element.usuario, 'duyC5R,poNEE', {
//             host: element.ip,
//             dialect: 'mysql',
//             port:3306
//         }
//         )
//         );
//     });
// })

module.exports = connection
