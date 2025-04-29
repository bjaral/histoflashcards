import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
    }

    async getConnection() {
        if (this.connection) {
            return this.connection;
        }

        try {
            const mysqlConnection = new Sequelize({
                host: process.env.MYSQL_HOST,
                database: process.env.MYSQL_DATABASE,
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                dialect: 'mysql',
                logging: false,
            });

            await mysqlConnection.authenticate();
            console.log('Conexión exitosa a MySQL');
            this.connection = mysqlConnection;
            return this.connection;

        } catch (error) {
            console.log('Error al conectarse a MySQL, intentando SQLite:', error);
            try {
                const sqliteConnection = new Sequelize({
                    dialect: 'sqlite',
                    storage: './db.sqlite3',
                    logging: false,
                });

                await sqliteConnection.authenticate();
                console.log('Conexión exitosa a SQLite');
                this.connection = sqliteConnection;
                return this.connection;

            } catch (sqliteError) {
                throw new Error('Error en ambas conexiones');
            }
        }
    }
}

export default new Database();