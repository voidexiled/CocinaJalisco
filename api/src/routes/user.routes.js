import { Router } from 'express';
import { methods as userController } from '../controllers/user.controller.js';
const router = Router();


// Getting all
router.get('/', userController.getUsers);


export default router;
