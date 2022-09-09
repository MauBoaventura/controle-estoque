const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return produto.init(sequelize, DataTypes);
}

class produto extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoBar: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    capacidade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ram: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    valor_transporte: {
      type: DataTypes.DOUBLE(7,2),
      allowNull: true,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    tableName: 'produto',
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
    ]
  });
  }
}
