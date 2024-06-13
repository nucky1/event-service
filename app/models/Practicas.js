'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Practicas extends Model {
        static associate({ Servicios, ProfesionalPractica, Turno }) {
            this.belongsTo(Servicios, { foreignKey: 'servicio_id', as: 'servicio' });
            this.hasMany(ProfesionalPractica, { foreignKey: 'practica_id', as: 'profesional_practicas' });
            this.hasMany(Turno, { foreignKey: 'practica_id', as: 'turnos' });
        }
    }

    Practicas.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        duracion_moda: {
            type: DataTypes.TIME
        },
        servicio_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Servicios',
                key: 'id'
            }
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'practicas',
        modelName: 'Practicas'
    });

    return Practicas;
};
