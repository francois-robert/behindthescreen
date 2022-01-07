import { Router } from 'express';
import { seedDatabase } from '../utils/seed-db';

// Routes

const router: Router = Router();

/**
 * POST /api/testData/seed
 */
router.post("/seed", (req, res, next) => {
    seedDatabase().then(() => {
        res.sendStatus(200);
    })
    .catch(next);
});


/**
 * GET /api/testData/:entity
 */
/*
router.get("/:entity", validateMiddleware([...isValidEntityValidator]), (req, res) => {
    const { entity } = req.params;
    const results = getAllForEntity(entity as keyof DbSchema);

    res.status(200);
    res.json({ results });
});
*/

export const TestDataRoutes: Router = router;