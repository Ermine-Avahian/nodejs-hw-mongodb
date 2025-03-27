import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use((req, res, next) => {
  console.log(`Request made to: ${req.method} ${req.url}`);
  next();
});

router.use('/contacts', contactsRouter);

router.use('/auth', authRouter);

export default router;
