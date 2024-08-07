import { Router } from 'express';
import path from 'path';

const index = path.join(process.cwd(), '../client/dist/index.html')
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req, res) => {
  console.log(index)
  res.sendFile(index);
});

export default router;
