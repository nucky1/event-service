// DTO/PacienteDTO.js

class PacienteDTO {
    static toDatabase(paciente) {
        let generoDB;
        switch (paciente.genero.toLowerCase()) {
            case 'masculino':
                generoDB = 'M';
                break;
            case 'femenino':
                generoDB = 'F';
                break;
            case 'otro':
                generoDB = 'O';
                break;
            default:
                generoDB = null;
        }

        return {
            nombre: paciente.nombres,
            apellido: paciente.apellidos,
            dni: paciente.dni,
            genero: generoDB,
            fecha_nacimiento: paciente.fecha_nacimiento,
            telefono: paciente.telefono1,
            telefono_secundario: paciente.telefono2,
            mail: paciente.email,
            obra_social: paciente.obraSocial,
            contactos: paciente.contactos || [], // Si no se proporcionan contactos, se establece como un array vacío
            coberturas: paciente.coberturas || [], // Si no se proporcionan coberturas, se establece como un array vacío
            turnos: paciente.turnos || [], // Si no se proporcionan turnos, se establece como un array vacío
            mensajes: paciente.mensajes || [] // Si no se proporcionan mensajes, se establece como un array vacío
        };
    }

    static fromDatabase(paciente) {
        let generoFront;
        switch (paciente.genero) {
            case 'M':
                generoFront = 'masculino';
                break;
            case 'F':
                generoFront = 'femenino';
                break;
            case 'O':
                generoFront = 'otro';
                break;
            default:
                generoFront = null;
        }

        return {
            nombres: paciente.nombre,
            apellidos: paciente.apellido,
            dni: paciente.dni,
            genero: generoFront,
            fecha_nacimiento: paciente.fecha_nacimiento,
            telefono1: paciente.telefono,
            telefono2: paciente.telefono_secundario,
            email: paciente.mail,
            obraSocial: paciente.obra_social,
            contactos: paciente.contactos || [], // Si no hay contactos, se establece como []
            coberturas: paciente.coberturas || [], // Si no hay coberturas, se establece como []
            turnos: paciente.turnos || [], // Si no hay turnos, se establece como []
            mensajes: paciente.mensajes || [] // Si no hay mensajes, se establece como []
        };
    }
}

module.exports = PacienteDTO;
