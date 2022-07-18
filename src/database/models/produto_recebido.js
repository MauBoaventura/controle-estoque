const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return produto_recebido.init(sequelize, DataTypes);
}

class produto_recebido extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_recebimento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    pedidos_fornecedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pedidos_fornecedor',
        key: 'id'
      }
    },
    valor_venda: {
      type: DataTypes.DOUBLE(7,2),
      allowNull: true,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    tableName: 'produto_recebido',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_produto_recebido_pedidos_fornecedor_id",
        using: "BTREE",
        fields: [
          { name: "pedidos_fornecedor_id" },
        ]
      },
    ]
  });
  }
}
