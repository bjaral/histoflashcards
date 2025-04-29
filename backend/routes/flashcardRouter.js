import { Router } from "express";
import { FlashcardController } from "../controllers/flashcardController.js";

export const createFlashcardRouter = () => {
    const router = Router();

    const controller = new FlashcardController();

    router.get('/', controller.getAll);
    // More specific routes should come before generic ones
    router.get('/parte/:parteId', controller.getByParte);
    router.get('/:id', controller.getById);

    return router;
}