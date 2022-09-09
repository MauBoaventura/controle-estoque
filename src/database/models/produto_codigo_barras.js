const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return produto_codigo_barras.init(sequelize, DataTypes);
}

class produto_codigo_barras extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produto',
        key: 'id'
      }
    },
    codigo_barras: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'produto_codigo_barras',
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
        name: "FK_produto_codigo_barras_produto_id",
        using: "BTREE",
        fields: [
          { name: "produto_id" },
        ]
      },
    ]
  });
  }
}
