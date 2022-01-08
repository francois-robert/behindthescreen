import { Request, Response, Router, NextFunction } from 'express';
import { seedDatabase, getAllForEntity } from '../utils/seed-db';
import { check, ValidationChain, validationResult } from "express-validator";



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
 
const isValidEntityValidator : ValidationChain[] = [
     check("entity")
       .isIn([
         "users"
       ])
       .trim(),
   ];
 
const validateMiddleware = (validations: ValidationChain[]) => {
     return async (req: Request, res: Response, next: NextFunction) => {
       await Promise.all(validations.map((validation: ValidationChain) => validation.run(req)));
   
       const errors = validationResult(req);
       if (errors.isEmpty()) {
         return next();
       }
   
       res.status(422).json({ errors: errors.array() });
     };
   };

router.get("/:entity", validateMiddleware([...isValidEntityValidator]), (req, res, next) => {
    const { entity } = req.params;
    
    getAllForEntity(entity).then((results) => {
        res.status(200).json({results: results});
      }
    )
    .catch(next);
});

export const TestDataRoutes: Router = router;