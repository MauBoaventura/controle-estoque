const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return pedidos_fornecedor.init(sequelize, DataTypes);
}

class pedidos_fornecedor extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fornecedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fornecedor',
        key: 'id'
      }
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produto',
        key: 'id'
      }
    },
    freteiro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'freteiro',
        key: 'id'
      }
    },
    taxa_transporte_produto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'taxa_transporte_produto',
        key: 'id'
      }
    },
    dolar_compra: {
      type: DataTypes.DOUBLE(7,2),
      allowNull: true,
      defaultValue: 0.00
    },
    quantidade_solicitada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    valor_produto: {
      type: DataTypes.DOUBLE(7,2),
      allowNull: true,
      defaultValue: 0.00
    },
    quantidade_recebida: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'pedidos_fornecedor',
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
        name: "FK_pedidos_fornecedor_fornecedor_id",
        using: "BTREE",
        fields: [
          { name: "fornecedor_id" },
        ]
      },
      {
        name: "FK_pedidos_fornecedor_produto_id",
        using: "BTREE",
        fields: [
          { name: "produto_id" },
        ]
      },
      {
        name: "FK_pedidos_fornecedor_freteiro_id",
        using: "BTREE",
        fields: [
          { name: "freteiro_id" },
        ]
      },
      {
        name: "FK_pedidos_fornecedor_taxa_transporte_produto_id",
        using: "BTREE",
        fields: [
          { name: "taxa_transporte_produto_id" },
        ]
      },
    ]
  });
  }
}
