'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Profesional extends Model {
        static associate({ Usuario, ProfesionalContacto, ProfesionalCobertura, ProfesionalClinica, ProfesionalPractica, Turno, Bloqueo, Horario }) {
            this.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
            this.hasMany(ProfesionalContacto, { foreignKey: 'profesional_id', as: 'contactos' });
            this.hasMany(ProfesionalCobertura, { foreignKey: 'profesional_id', as: 'coberturas' });
            this.hasMany(ProfesionalClinica, { foreignKey: 'profesional_id', as: 'clinicas' });
            this.hasMany(ProfesionalPractica, { foreignKey: 'profesional_id', as: 'practicas' });
            this.hasMany(Turno, { foreignKey: 'profesional_id', as: 'turnos' });
            this.hasMany(Bloqueo, { foreignKey: 'profesional_id', as: 'bloqueos' });
            this.hasMany(Horario, { foreignKey: 'profesional_id', as: 'horarios' });
        }
    }

    Profesional.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        genero: {
            type: DataTypes.ENUM('M', 'F', 'O'),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        prefijo: {
            type: DataTypes.STRING(10)
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        imagen: {
            type: DataTypes.STRING(255)
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Usuario',
                key: 'id'
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'profesional',
        modelName: 'Profesional'
    });

    return Profesional;
};
