const DataTypes = require("sequelize").DataTypes;
const _estoque = require("./estoque");
const _fornecedor = require("./fornecedor");
const _freteiro = require("./freteiro");
const _pedidos_fornecedor = require("./pedidos_fornecedor");
const _produto = require("./produto");
const _taxa_transporte_produto = require("./taxa_transporte_produto");

function initModels(sequelize) {
  const estoque = _estoque(sequelize, DataTypes);
  const fornecedor = _fornecedor(sequelize, DataTypes);
  const freteiro = _freteiro(sequelize, DataTypes);
  const pedidos_fornecedor = _pedidos_fornecedor(sequelize, DataTypes);
  const produto = _produto(sequelize, DataTypes);
  const taxa_transporte_produto = _taxa_transporte_produto(sequelize, DataTypes);

  pedidos_fornecedor.belongsTo(fornecedor, { as: "fornecedor", foreignKey: "fornecedor_id"});
  fornecedor.hasMany(pedidos_fornecedor, { as: "pedidos_fornecedors", foreignKey: "fornecedor_id"});
  pedidos_fornecedor.belongsTo(freteiro, { as: "freteiro", foreignKey: "freteiro_id"});
  freteiro.hasMany(pedidos_fornecedor, { as: "pedidos_fornecedors", foreignKey: "freteiro_id"});
  taxa_transporte_produto.belongsTo(freteiro, { as: "freteiro", foreignKey: "freteiro_id"});
  freteiro.hasMany(taxa_transporte_produto, { as: "taxa_transporte_produtos", foreignKey: "freteiro_id"});
  estoque.belongsTo(pedidos_fornecedor, { as: "pedidos_fornecedor", foreignKey: "pedidos_fornecedor_id"});
  pedidos_fornecedor.hasMany(estoque, { as: "estoques", foreignKey: "pedidos_fornecedor_id"});
  pedidos_fornecedor.belongsTo(produto, { as: "produto", foreignKey: "produto_id"});
  produto.hasMany(pedidos_fornecedor, { as: "pedidos_fornecedors", foreignKey: "produto_id"});
  taxa_transporte_produto.belongsTo(produto, { as: "produto", foreignKey: "produto_id"});
  produto.hasMany(taxa_transporte_produto, { as: "taxa_transporte_produtos", foreignKey: "produto_id"});
  pedidos_fornecedor.belongsTo(taxa_transporte_produto, { as: "taxa_transporte_produto", foreignKey: "taxa_transporte_produto_id"});
  taxa_transporte_produto.hasMany(pedidos_fornecedor, { as: "pedidos_fornecedors", foreignKey: "taxa_transporte_produto_id"});

  return {
    estoque,
    fornecedor,
    freteiro,
    pedidos_fornecedor,
    produto,
    taxa_transporte_produto,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
