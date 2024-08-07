import { Router } from 'express';
import path from 'path';

const index = path.join(process.cwd(), '../client/dist/index.html')
const router = Router();

router.get('/', (_req, res) => {
  res.sendFile(index);
});

export default router;
