'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Cobertura extends Model {
        static associate({ PacienteCobertura, ProfesionalCobertura, Turno }) {
            this.hasMany(PacienteCobertura, { foreignKey: 'cobertura_id', as: 'paciente_coberturas' });
            this.hasMany(ProfesionalCobertura, { foreignKey: 'cobertura_id', as: 'profesional_coberturas' });
            this.hasMany(Turno, { foreignKey: 'cobertura_id', as: 'turnos' });
        }
    }

    Cobertura.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'cobertura',
        modelName: 'Cobertura'
    });

    return Cobertura;
};
