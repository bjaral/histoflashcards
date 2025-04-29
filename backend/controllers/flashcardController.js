import { flashcardDAO } from "../DAO/flashcardDAO.js";

export class FlashcardController {
    constructor() {
        this.flashcardDAO = flashcardDAO;
    }

    getAll = async (req, res) => {
        const flashcards = await this.flashcardDAO.getFlashcards();
        res.json(flashcards);
    }

    getById = async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Controller received flashcard ID:', id);
            const flashcard = await this.flashcardDAO.getFlashcardById(id);
            
            if (!flashcard) {
                return res.status(404).json({ message: 'Flashcard not found' });
            }
            
            res.json(flashcard);
        } catch (error) {
            console.error('Error al obtener flashcard por ID:', error);
            res.status(500).json({ error: error.message });
        }
    }

    getByParte = async (req, res) => {
        try {
            const parteId = req.params.parteId;
            console.log('Controller received parte ID:', parteId);
            
            if (!parteId) {
                return res.status(400).json({ error: 'parteId is required' });
            }
            
            const flashcards = await this.flashcardDAO.getFlashcardByParte(parteId);
            
            if (!flashcards || flashcards.length === 0) {
                return res.status(404).json({ message: 'No flashcards found for this parte' });
            }
            
            res.json(flashcards);
        } catch (error) {
            console.error('Error al obtener flashcards por parte:', error);
            res.status(500).json({ error: error.message });
        }
    }
}