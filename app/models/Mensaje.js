'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Mensaje extends Model {
        static associate({ Turno, Paciente }) {
            this.belongsTo(Turno, { foreignKey: 'turno_id', as: 'turno' });
            this.belongsTo(Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
        }
    }

    Mensaje.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        turno_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Turno',
                key: 'id'
            }
        },
        paciente_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Paciente',
                key: 'id'
            }
        },
        mensaje: {
            type: DataTypes.TEXT
        },
        fecha_hora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'mensaje',
        modelName: 'Mensaje'
    });

    return Mensaje;
};
