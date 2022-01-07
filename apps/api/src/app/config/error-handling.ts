import { Request, Response } from 'express';
import { environment } from "../../../environments/environment";
import logger from "../utils/logger";

interface BetterError extends Error {
    status?: number;
}
// catch 404 errors and forward to error handler
export function catch404(req, res, next) {
    const err: BetterError = new Error('Not Found');
    err.status = 404;
    next(err);
};

export function errorHandler(err: BetterError, req: Request, res: Response) {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
        errors: {
        message: err.message,
        error  : !environment.production ? err : {}
        }
    });
}