import { Router } from "express";
import { ParteController } from "../controllers/parteController.js";

export const createParteRouter = () => {
    const router = Router();

    const controller = new ParteController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.get('/:id/flashcards', controller.getFlashcardsForParte);

    return router;
}