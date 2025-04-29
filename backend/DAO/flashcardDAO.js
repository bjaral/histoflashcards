import Database from '../config/database.js';

class FlashcardDAO {
    constructor() {
        this.initializeDB();
    }

    async initializeDB() {
        this.db = await Database.getConnection();
        this.dialect = this.db.getDialect();
    }

    async getFlashcards() {
        try {
            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT * FROM `flashcards_flashcard`';
            } else {
                query = 'SELECT * FROM flashcards_flashcard';
            }

            const [rows] = await this.db.query(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener flashcards: ' + error.message);
        }
    }

    async getFlashcardById(id) {
        try {
            console.log('Getting flashcard with ID:', id);
            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT * FROM `flashcards_flashcard` WHERE `id` = ?';
            } else {
                query = 'SELECT * FROM flashcards_flashcard WHERE id = ?';
            }
            const [rows] = await this.db.query(query, [id]);
            console.log('Query result:', rows);
            return rows[0]; // Return the first result
        } catch (error) {
            console.error('Error in getFlashcardById:', error);
            throw new Error('Error al obtener flashcard por ID: ' + error.message);
        }
    }

    async getFlashcardsByParteId(parteId) {
        try {
            const param = this.dialect === 'sqlite' ? Number(parteId) : parteId;
            let query;
            if (this.dialect === 'mysql') {
                query = 'SELECT id, pregunta, respuesta, parte_id FROM `flashcards_flashcard` WHERE `parte_id` = ?';
            } else {
                query = 'SELECT id, pregunta, respuesta, parte_id FROM flashcards_flashcard WHERE parte_id = ?';
            }
            const rows = await this.db.query(query, {
                replacements: [param],
                type: this.db.QueryTypes.SELECT
            });
            return rows;
        } catch (error) {
            console.error('Error getting flashcards by parte ID:', error.message);
            throw new Error('Error al obtener flashcards por parte ID: ' + error.message);
        }
    }

    // ... existing code ...

    // Add other methods...
}

export const flashcardDAO = new FlashcardDAO();