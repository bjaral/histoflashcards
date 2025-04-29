import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createCategoriaRouter } from './routes/categoriaRouter.js';
import { createFlashcardRouter } from './routes/flashcardRouter.js';
import { createParteRouter } from './routes/parteRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Rutas
app.use('/api/categorias', createCategoriaRouter());
app.use('/api/flashcards', createFlashcardRouter());
app.use('/api/partes', createParteRouter());

// Ruta base
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend API' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});