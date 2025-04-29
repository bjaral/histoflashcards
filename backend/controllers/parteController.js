import { parteDAO } from "../DAO/parteDAO.js";
import { flashcardDAO } from '../DAO/flashcardDAO.js';

export class ParteController {
    constructor() {
        this.parteDAO = parteDAO;
        this.flashcardDAO = flashcardDAO;
    }

    getAll = async (req, res) => {
        try {
            const partes = await this.parteDAO.getPartes();
            res.json(partes);
        } catch (error) {
            console.error('Error al obtener todas las partes:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Add the missing getById method
    getById = async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Controller received parte ID:', id);
            const parte = await this.parteDAO.getParteById(id);
            
            if (!parte) {
                return res.status(404).json({ message: 'Parte not found' });
            }
            
            res.json(parte);
        } catch (error) {
            console.error('Error al obtener parte por ID:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Improved error handling and debugging
    getByCategory = async (req, res) => {
        try {
            const categoriaId = req.params.categoriaId;
            console.log('Controller received categoriaId:', categoriaId, 'Type:', typeof categoriaId);
            
            // Ensure categoriaId is properly formatted
            if (!categoriaId) {
                return res.status(400).json({ error: 'categoriaId is required' });
            }
            
            const partes = await this.parteDAO.getParteByCategory(categoriaId);
            console.log('Controller received parts:', partes);
            
            if (!partes || partes.length === 0) {
                return res.status(404).json({ message: 'No parts found for this category' });
            }
            
            res.json(partes);
        } catch (error) {
            console.error('Error al obtener partes por categoría:', error);
            res.status(500).json({ error: error.message });
        }
    }

    getFlashcardsForParte = async (req, res) => {
        try {
            const parteId = req.params.id;
            const flashcards = await this.flashcardDAO.getFlashcardsByParteId(parteId);
            res.json(flashcards);
        } catch (error) {
            console.error('Error getting flashcards for parte:', error.message);
            res.status(500).json({ message: 'Error interno del servidor al obtener flashcards' });
        }
    }
}