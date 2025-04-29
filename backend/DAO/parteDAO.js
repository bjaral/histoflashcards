import Database from '../config/database.js';

export class ParteDAO {
    constructor() {
        this.initializeDB();
    }

    async initializeDB() {
        this.db = await Database.getConnection();
        this.dialect = this.db.getDialect();
    }

    async getPartes() {
        try {
            let query;
            if (this.dialect === 'mysql') {
                // If your images are in public/images/partes/[filename]
                query = 'SELECT id, nombre, categoria_id, CONCAT("/images/", imagen_parte) as imagen_parte, CONCAT("/images/", imagen_flashcards) as imagen_flashcards FROM `flashcards_parte`';
            } else {
                // SQLite version
                query = 'SELECT id, nombre, categoria_id, "/images/" || imagen_parte as imagen_parte, "/images/" || imagen_flashcards as imagen_flashcards FROM flashcards_parte';
            }
            const [rows] = await this.db.query(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener partes:' + error.message);
        }
    }

    async getParteById(id) {
        try {
            // Convert to number for SQLite if necessary
            const param = this.dialect === 'sqlite' ? Number(id) : id;

            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT id, nombre, categoria_id, CONCAT("/images/", imagen_parte) as imagen_parte, CONCAT("/images/", imagen_flashcards) as imagen_flashcards FROM `flashcards_parte` WHERE `id` = ?';
            } else {
                // Use double quotes for consistency with getCategorias and ensure correct path concatenation
                query = 'SELECT id, nombre, categoria_id, "/images/" || imagen_parte as imagen_parte, "/images/" || imagen_flashcards as imagen_flashcards FROM flashcards_parte WHERE id = ?';
            }

            // Execute the query using replacements and specifying the type
            const rows = await this.db.query(query, {
                replacements: [param],
                type: this.db.QueryTypes.SELECT
            });

            if (!rows || rows.length === 0) {
                return null; // No parte found
            }

            return rows[0]; // Return the first result
        } catch (error) {
            console.error('Error details in getParteById:', error.message);
            throw new Error('Error al obtener parte por ID: ' + error.message);
        }
    }

    // Renombrado de getParteByCategoria a getParteByCategory para coincidir con el controlador
    // ... existing code ...
    async getParteByCategory(categoriaId) {
        try {
            // Convert to number for SQLite if necessary (assuming categoria_id is numeric)
            const param = this.dialect === 'sqlite' ? Number(categoriaId) : categoriaId;

            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT id, nombre, categoria_id, CONCAT("/images/", imagen_parte) as imagen_parte, CONCAT("/images/", imagen_flashcards) as imagen_flashcards FROM `flashcards_parte` WHERE `categoria_id` = ?';
            } else {
                 // Use double quotes for consistency and ensure correct path concatenation
                query = 'SELECT id, nombre, categoria_id, "/images/" || imagen_parte as imagen_parte, "/images/" || imagen_flashcards as imagen_flashcards FROM flashcards_parte WHERE categoria_id = ?';
            }

             // Execute the query using replacements and specifying the type
            const rows = await this.db.query(query, {
                replacements: [param],
                type: this.db.QueryTypes.SELECT
            });

            // This method should return all matching parts, so return the full array
            return rows;
        } catch (error) {
            console.error('Error details in getParteByCategory:', error.message);
            throw new Error('Error al obtener parte por categoria: ' + error.message);
        }
    }
    // ... existing code ...
}

// Export instance after class definition
export const parteDAO = new ParteDAO();