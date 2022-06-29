const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return taxa_transporte_produto.init(sequelize, DataTypes);
}

class taxa_transporte_produto extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    freteiro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'freteiro',
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
    taxa: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'taxa_transporte_produto',
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
        name: "FK_taxa_transporte_freteiro_id",
        using: "BTREE",
        fields: [
          { name: "freteiro_id" },
        ]
      },
      {
        name: "FK_taxa_transporte_produto_id",
        using: "BTREE",
        fields: [
          { name: "produto_id" },
        ]
      },
    ]
  });
  }
}
