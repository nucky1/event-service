const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
class Paciente extends Model {
    static associate({ PacienteContacto, PacienteCobertura, Turno, Mensaje }) {
        this.hasMany(PacienteContacto, { foreignKey: 'paciente_id', as: 'contactos' });
        this.hasMany(PacienteCobertura, { foreignKey: 'paciente_id', as: 'coberturas' });
        this.hasMany(Turno, { foreignKey: 'paciente_id', as: 'turnos' });
        this.hasMany(Mensaje, { foreignKey: 'paciente_id', as: 'mensajes' });
    }
}

Paciente.init({
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
    pais: {
        type: DataTypes.STRING(255)
    },
    ocupacion: {
        type: DataTypes.STRING(255)
    },
    direccion: {
        type: DataTypes.TEXT
    },
    notas: {
        type: DataTypes.TEXT
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'paciente',
    modelName: 'Paciente'
});
return Paciente;
}
