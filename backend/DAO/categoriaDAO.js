import Database from '../config/database.js';

class CategoriaDAO {
    constructor() {
        this.initializeDB();
    }

    async initializeDB() {
        this.db = await Database.getConnection();
        this.dialect = this.db.getDialect();
    }

    async getCategorias() {
        try {
            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT id, nombre, CONCAT("/images/", imagen) as imagen FROM `flashcards_categoria`';
            } else {
                query = 'SELECT id, nombre, "/images/" || imagen as imagen FROM flashcards_categoria';
            }
            const [rows] = await this.db.query(query);
            return rows;
        } catch (error) {
            console.error('Error al buscar categorias:', error);
            throw error;
        }
    }

    async getCategoriaById(id) {
        try {
            // Convert to number for SQLite if necessary
            const param = this.dialect === 'sqlite' ? Number(id) : id;

            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT id, nombre, CONCAT("/images/", imagen) as imagen FROM `flashcards_categoria` WHERE `id` = ?';
            } else {
                query = 'SELECT id, nombre, "/images/" || imagen as imagen FROM flashcards_categoria WHERE id = ?';
            }

            // Execute the query using replacements and specifying the type
            const rows = await this.db.query(query, {
                replacements: [param],
                type: this.db.QueryTypes.SELECT
            });

            if (!rows || rows.length === 0) {
                return null; // No category found
            }

            return rows[0]; // Return the first (and only) result
        } catch (error) {
            // Log the essential error details for server monitoring
            console.error('Error details in getCategoriaById:', error.message);
            throw new Error('Error al obtener categoria por ID: ' + error.message);
        }
    }

}

// Export instance after class definition
export const categoriaDAO = new CategoriaDAO();