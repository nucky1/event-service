'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model {
        static associate({ Profesional, SecretariaClinica, Actividad, RegistroAcceso }) {
            this.hasMany(Profesional, { foreignKey: 'usuario_id', as: 'profesionales' });
            this.hasMany(SecretariaClinica, { foreignKey: 'secretaria_id', as: 'clinicas' });
            this.hasMany(Actividad, { foreignKey: 'usuario_id', as: 'actividades' });
            this.hasMany(RegistroAcceso, { foreignKey: 'usuario_id', as: 'accesos' });
        }
    }

    Usuario.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING(200)
        },
        sucursal: {
            type: DataTypes.STRING(20)
        },
        nombre: {
            type: DataTypes.STRING(50)
        },
        telefono: {
            type: DataTypes.STRING(20)
        },
        mail: {
            type: DataTypes.STRING(100)
        },
        rol: {
            type: DataTypes.STRING(50)
        },
        creado: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'usuario',
        modelName: 'Usuario'
    });

    return Usuario;
};
