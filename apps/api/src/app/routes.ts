import { Router } from 'express';
import { UsersRoutes } from './routes/user-routes';

import { environment } from "../../environments/environment";
import logger from './utils/logger';
import { TestDataRoutes } from './routes/testdata-routes';



const router: Router = Router();

if (!environment.production) {
    logger.info("Add /testData routes for testing purpose")
    router.use('/testData', TestDataRoutes);
}

router.use('/', UsersRoutes);

export const MainRouter: Router = router;
