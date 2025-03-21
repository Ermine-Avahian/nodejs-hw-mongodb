import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.get('/contacts', contactsRouter);

router.post('/auth', authRouter);

export default router;
