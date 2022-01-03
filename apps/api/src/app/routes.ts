import { Router } from 'express';
import { UsersRoutes } from './routes/UsersRoutes';


const router: Router = Router();

router.use('/', UsersRoutes);

export const MainRouter: Router = router;
