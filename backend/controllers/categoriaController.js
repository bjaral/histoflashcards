import { categoriaDAO } from "../DAO/categoriaDAO.js";
import { parteDAO } from "../DAO/parteDAO.js";

export class CategoriaController {
    constructor() {
        this.categoriaDAO = categoriaDAO;
    }

    getAll = async (req, res) => {
        const categorias = await this.categoriaDAO.getCategorias();
        res.json(categorias);
    }

    getById = async (req, res) => {
        try {
            const id = req.params.id;
            console.log('Controller received categoria ID:', id);
            const categoria = await this.categoriaDAO.getCategoriaById(id);
            
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            
            res.json(categoria);
        } catch (error) {
            console.error('Error al obtener categoria por ID:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Add this method to your CategoriaController class
    getPartes = async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const partes = await parteDAO.getParteByCategory(categoriaId);
            res.json(partes);
        } catch (error) {
            console.error('Error al obtener partes para categoría:', error);
            res.status(500).json({ error: error.message });
        }
    }
}