import { Router } from 'express';
import { requireApiKey } from './utils/auth.js';
;import { insertController } from './controllers/insertController.js';
import { searchController } from './controllers/searchController.js';
import { queryController } from './controllers/queryController.js';


const router = Router();

router.post('/insert', requireApiKey, insertController);
router.post('/search', requireApiKey, searchController);
router.post('/query', requireApiKey, queryController);

export default router;
