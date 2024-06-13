'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Bloqueo extends Model {
        static associate({ Profesional }) {
            this.belongsTo(Profesional, { foreignKey: 'profesional_id', as: 'profesional' });
        }
    }

    Bloqueo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profesional_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Profesional',
                key: 'id'
            }
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        motivo: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'bloqueo',
        modelName: 'Bloqueo'
    });

    return Bloqueo;
};
