const db = require("../app/models");
const Usuario = db.Usuario;
const Permiso = db.Permiso;
const Proveedor = db.Proveedor;
const fs = require("fs")
const path = require("path")
const {cliente,proveedor} = require("./data")
//const UsuarioService = require('../app/services/Usuario');
//const ClienteService = require('../app/services/Cliente');
//const ProveedorService= require('../app/services/Proveedor');
const {permisos} = require('../app/constants/authConstant');

async function getByField(model, value, campo) {
  return await model.findOne({
    where: {[campo]: value}
  });
}

async function addNew(model, data) {

  return model.create(data);
}

async function update(model, data) {
  let {id, ...newData} = data;
  const res = await model.findOne({
    where: {id: id}
  });
  Object.keys(newData).forEach(val => {
    res[val] = newData[val];
  })
  res.save();
  return res;
}

async function seedPermisos() {
  try {
    let permisosKeys = Object.keys(permisos)
    for (const element of permisosKeys) {
      let permiso = permisos[element];
      let repo = await getByField(Permiso, permiso.codigo, 'codigo');
      if (repo) {
        permiso.id = repo.id;
        await update(Permiso, permiso);
      } else {
        await addNew(Permiso, permiso);
      }
    }


    console.info('Permisos seeded 🍺');
  } catch (error) {
    console.log('Permisos seeder failed.');
    console.log(error);
    console.log('-------------------------------');
  }
}
async function seedProveedor() {
  try {
    let permisosKeys = Object.keys(proveedor)
    for (const element of permisosKeys) {
      let permiso = proveedor[element];
      let repo = await getByField(Proveedor, permiso.cuit, 'cuit');
      if (repo) {
        permiso.id = repo.id;
        await update(Proveedor, permiso);
      } else {
        await addNew(Proveedor, permiso);
      }
    }


    console.info('Proveedor seeded 🍺');
  } catch (error) {
    console.log('Proveedor seeder failed.');
    console.log(error);
    console.log('-------------------------------');
  }
}

async function seedUser() {
  try {
    let usuarios = [
      {
        "username": "vendedor1",
        "mail": "demiguelnicolas14@gmail.com",
        "password": "vendedor1",
        "tipo": 2,
        "active": true,
        "permisos": [
        ]
      }
    ]
    let usuariosKeys = Object.keys(usuarios)
    for (const element of usuariosKeys) {
      let usuario = usuarios[element];
      console.log(usuario.username)
      console.log(`${usuario.password}`)
      console.log("-------------------------")
      let repo = await getByField(Usuario, usuario.username, 'username');
      if (repo) {
        usuario.id = repo.id;
        await UsuarioService.editar(usuario);
      } else {
        await UsuarioService.create(usuario);
      }
    }
    console.info('Permisos seeded 🍺');
  } catch (error) {
    console.log('Permisos seeder failed.');
    console.log(error);
    console.log('-------------------------------');
  }
}
async function execSeed(){
  console.log('Creando tablas');
  try{
    await db.sequelize
    .sync({force:true,alter:true})
    .then((result) => {
      console.log("se vaciaron las tablas si o si")
    })
    .catch((err) => {
      console.log(err);
    });


  }catch (e) {
    console.log(e)
  }
  await seedProveedor();
  await seedPermisos();
  await seedUser();
  console.log("Sedeado")
}

async function seedData() {
  try {
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    const tables = await db.sequelize.getQueryInterface().showAllTables();
    if (tables.length > 0) {
      console.log('Tablas ya creadas.');
    } else {
      await execSeed();
    }
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  } catch (error) {
    console.log(error)
  }
}
async function resetBase() {
  try {
    console.log("Eliminando tablas")
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await db.sequelize.truncate({ cascade: true, restartIdentity: true })
    console.log("Iniciando")
    await execSeed();
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  seedData,
  resetBase
};
