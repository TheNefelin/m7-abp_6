import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
    'postgres://postgres:123456@localhost:5432/ejercicios',
    { define: { freezeTableName: true } }
);

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa');
    iniTablas();
} catch (err) {
    console.error('No se pudo conectar a la BD', err);
}

async function iniTablas() {
    const Cliente = sequelize.define('cliente', {
        idSerial: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false }
    });

    const Producto = sequelize.define('producto', {
        codigo: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false },
    });

    Cliente.belongsToMany(Producto, { through: 'cli_prod' });
    Producto.belongsToMany(Cliente, { through: 'cli_prod' });

    await sequelize.sync();
};