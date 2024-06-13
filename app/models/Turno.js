'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Turno extends Model {
        static associate({ Profesional, Paciente, Cobertura, Practicas, Clinica, Mensaje }) {
            this.belongsTo(Profesional, { foreignKey: 'profesional_id', as: 'profesional' });
            this.belongsTo(Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
            this.belongsTo(Cobertura, { foreignKey: 'cobertura_id', as: 'cobertura' });
            this.belongsTo(Practicas, { foreignKey: 'practica_id', as: 'practica' });
            this.belongsTo(Clinica, { foreignKey: 'clinica_id', as: 'clinica' });
            this.hasMany(Mensaje, { foreignKey: 'turno_id', as: 'mensajes' });
        }
    }

    Turno.init({
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
        paciente_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Paciente',
                key: 'id'
            }
        },
        cobertura_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Cobertura',
                key: 'id'
            }
        },
        practica_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Practicas',
                key: 'id'
            }
        },
        clinica_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Clinica',
                key: 'id'
            }
        },
        fecha_hora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        motivo: {
            type: DataTypes.TEXT
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'confirmado', 'cancelado'),
            allowNull: false,
            defaultValue: 'pendiente'
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'turno',
        modelName: 'Turno'
    });

    return Turno;
};
