const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return venda.init(sequelize, DataTypes);
}

class venda extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_venda: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cliente_final_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente_final',
        key: 'id'
      }
    },
    estoque_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'estoque',
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
    valor_desconto: {
      type: DataTypes.DOUBLE(7,2),
      allowNull: true,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    tableName: 'venda',
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
        name: "FK_venda_produto_id",
        using: "BTREE",
        fields: [
          { name: "produto_id" },
        ]
      },
      {
        name: "FK_venda_cliente_final_id",
        using: "BTREE",
        fields: [
          { name: "cliente_final_id" },
        ]
      },
      {
        name: "FK_venda_estoque_id",
        using: "BTREE",
        fields: [
          { name: "estoque_id" },
        ]
      },
    ]
  });
  }
}
