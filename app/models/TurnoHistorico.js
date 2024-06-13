'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class TurnoHistorico extends Model {
        static associate({ Paciente, Profesional, Practicas, Cobertura, Clinica }) {
            this.belongsTo(Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
            this.belongsTo(Profesional, { foreignKey: 'profesional_id', as: 'profesional' });
            this.belongsTo(Practicas, { foreignKey: 'practica_id', as: 'practica' });
            this.belongsTo(Cobertura, { foreignKey: 'cobertura_id', as: 'cobertura' });
            this.belongsTo(Clinica, { foreignKey: 'clinica_id', as: 'clinica' });
        }
    }

    TurnoHistorico.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        paciente_id: DataTypes.INTEGER,
        profesional_id: DataTypes.INTEGER,
        practica_id: DataTypes.INTEGER,
        cobertura_id: DataTypes.INTEGER,
        clinica_id: DataTypes.INTEGER,
        fecha: DataTypes.DATE,
        hora: DataTypes.TIME,
        duracion: DataTypes.TIME,
        nota_interna: DataTypes.TEXT,
        nota_paciente: DataTypes.TEXT,
        estado: DataTypes.ENUM('Reservado', 'Esperando', 'En consulta', 'Atendido', 'Ausente', 'Cancelado', 'Pendiente'),
        notificar_flag: DataTypes.BOOLEAN,
        computar_flag: DataTypes.BOOLEAN,
        telemedicina_flag: DataTypes.BOOLEAN,
        sobreturno_flag: DataTypes.BOOLEAN,
        fecha_reserva: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        fecha_actualizacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'TurnoHistorico',
        timestamps: false,
        tableName: 'turno_historico'
    });

    return TurnoHistorico;
};
