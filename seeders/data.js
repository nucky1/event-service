exports.grupos = [
    {
        nombre: 'GRUPO 1',
        codigo: 'KC',
        financiacion: 650000,
        cuotas: 30,
        integracion: 45,
        cuotaPura: 26693,
        valorCuota: 38133,
        valorInicial: 84500,
        grupoInterno: 1,
        activo: 1
    },
    {
        nombre: 'GRUPO 2',
        codigo: 'ZRZ',
        financiacion: 800000,
        cuotas: 30,
        integracion: 45,
        cuotaPura: 35467,
        valorCuota: 50667,
        valorInicial: 104000,
        grupoInterno: 1,
        activo: 1
    },
    {
        nombre: 'GRUPO 3',
        codigo: 'HT',
        financiacion: 950000,
        cuotas: 24,
        integracion: 45,
        cuotaPura: 48767,
        valorCuota: 69667,
        valorInicial: 123500,
        grupoInterno: 1,
        activo: 1
    },
    {
        nombre: 'GRUPO A',
        codigo: 'SRA',
        financiacion: 1850000,
        cuotas: '12 a 60',
        integracion: 35,
        cuotaPura: 0,
        valorCuota: 0,
        valorInicial: 148000,
        grupoInterno: 0,
        activo: 1
    },
    {
        nombre: 'GRUPO B',
        codigo: 'SRB',
        financiacion: 2300000,
        cuotas: '12 a 60',
        integracion: 35,
        cuotaPura: 0,
        valorCuota: 0,
        valorInicial: 184000,
        grupoInterno: 0,
        activo: 1
    },
    {
        nombre: 'GRUPO C',
        codigo: 'SRC',
        financiacion: 3000000,
        cuotas: '12 a 60',
        integracion: 35,
        cuotaPura: 0,
        valorCuota: 0,
        valorInicial: 240000,
        grupoInterno: 0,
        activo: 1
    },
    {
        nombre: 'GRUPO A (UVA)',
        codigo: 'SRUVA',
        financiacion: 1850000,
        cuotas: '12 a 48',
        integracion: 45,
        cuotaPura: 0,
        valorCuota: 0,
        valorInicial: 129500,
        grupoInterno: 0,
        activo: 1
    },
    {
        nombre: 'GRUPO B (UVA)',
        codigo: 'SRUVB',
        financiacion: 2300000,
        cuotas: '12 a 48',
        integracion: 45,
        cuotaPura: 0,
        valorCuota: 0,
        valorInicial: 161000,
        grupoInterno: 0,
        activo: 1
    },
    {
        nombre: 'GRUPO C (UVA)',
        codigo: 'SRUVC',
        financiacion: 3000000,
        cuotas: '12 a 48',
        integracion: 45,
        cuotaPura: 0,
        valorCuota: 0,
        valorInicial: 210000,
        grupoInterno: 0,
        activo: 1
    }
];
exports.proveedor = [
    {
        cuit: '12345678901',
        descripcion: 'Proveedor 1',
        tipo_persona: 'juridica',
        forma_juridica: 'SRL',
        razon_social: 'Suprabond',
        domicilio: 'Calle 123',
        provincia: 'Buenos Aires',
        localidad: 'Ciudad A',
        telefono: '111-111-111',
        telefono_alternativo: '222-222-222',
        email: 'proveedor1@example.com',
        ingresos_brutos: '123456',
        saldo_inicial: 1000.00,
    },
    {
        cuit: '23456789012',
        descripcion: 'Proveedor 2',
        tipo_persona: 'juridica',
        forma_juridica: 'SA',
        razon_social: 'Audio Insumos',
        domicilio: 'Calle 456',
        provincia: 'Córdoba',
        localidad: 'Ciudad B',
        telefono: '333-333-333',
        telefono_alternativo: '444-444-444',
        email: 'proveedor2@example.com',
        ingresos_brutos: '234567',
        saldo_inicial: 1500.00,
    },
    {
        cuit: '34567890123',
        descripcion: 'Proveedor 3',
        tipo_persona: 'juridica',
        forma_juridica: 'Monotributista',
        razon_social: 'Productos Actualizables',
        domicilio: 'Calle 789',
        provincia: 'Santa Fe',
        localidad: 'Ciudad C',
        telefono: '555-555-555',
        telefono_alternativo: '666-666-666',
        email: 'proveedor3@example.com',
        ingresos_brutos: '345678',
        saldo_inicial: 2000.00,
    },
    {
        cuit: '45678901234',
        descripcion: 'Proveedor 4',
        tipo_persona: 'juridica',
        forma_juridica: 'SRL',
        razon_social: 'Aries',
        domicilio: 'Calle 012',
        provincia: 'Mendoza',
        localidad: 'Ciudad D',
        telefono: '777-777-777',
        telefono_alternativo: '888-888-888',
        email: 'proveedor4@example.com',
        ingresos_brutos: '456789',
        saldo_inicial: 2500.00,
    },
    {
        cuit: '56789012345',
        descripcion: 'Proveedor 5',
        tipo_persona: 'juridica',
        forma_juridica: 'Monotributista',
        razon_social: 'Otra Razón Social',
        domicilio: 'Calle 567',
        provincia: 'Salta',
        localidad: 'Ciudad E',
        telefono: '999-999-999',
        telefono_alternativo: '000-000-000',
        email: 'proveedor5@example.com',
        ingresos_brutos: '567890',
        saldo_inicial: 3000.00,
    },
];
exports.programaciones = [
    {
        codigo: 'bajaClientes',
        inicioEjecucion: new Date(),
        schedule: '50 23 11 * *', // 11 de cada mes a las 23:50
        estado:1,
        descripcion: 'Dar de baja a clientes con mas de 3 cuotas vencidas',
    },
    {
        codigo: 'calcularIntereses',
        inicioEjecucion: new Date(),
        schedule: '0 0 * * *', // todos los dias a las 00
        estado:1,
        descripcion: 'Aumenta el interes de las cuotas vencidas (ayuda a bajar la cantidad de calculos dinamicos en consultas)',
    },
    {
        codigo: 'cuotaNuevaApp',
        inicioEjecucion: new Date(),
        schedule: '0 0 * * *', //  todos los dias a las 00
        estado:1,
        descripcion: 'Emite la notificación de la cuota nueva',
    },
    {
        codigo: 'cuotaVencida',
        inicioEjecucion: new Date(),
        schedule: '0 7 11,13,15,20 * *', // El 11,13,15,20 de cada mes a las 07:00
        estado:1,
        descripcion: 'Envía una notificación el día posterior al vencimiento de la cuota',
    },
    {
        codigo: 'motoListaParaRetiro',
        inicioEjecucion: new Date(),
        schedule: '0 22 * * *', // Todos los días a las 22:00
        estado:1,
        descripcion: 'Envía una notificación cuando el cliente tiene el porcentaje adecuado para retirar su moto',
    },
    {
        codigo: 'antesDeVencimiento',
        inicioEjecucion: new Date(),
        schedule: '0 7 7,9,10 * *', // El 7,9 y 10 de cada mes a las 07:00
        estado:1,
        descripcion: 'Envía una notificación antes del vencimiento de la cuota',
    },
];
