import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController.js";

export const createCategoriaRouter = () => {
    const router = Router();

    const controller = new CategoriaController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.get('/:id/partes', controller.getPartes);

    return router;
}