'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Contacto extends Model {
        static associate({ ProfesionalContacto, PacienteContacto }) {
            this.hasMany(ProfesionalContacto, { foreignKey: 'contacto_id', as: 'profesional_contactos' });
            this.hasMany(PacienteContacto, { foreignKey: 'contacto_id', as: 'paciente_contactos' });
        }
    }

    Contacto.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo: {
            type: DataTypes.ENUM('email', 'telefono', 'url'),
            allowNull: false
        },
        valor: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'contacto',
        modelName: 'Contacto'
    });

    return Contacto;
};
