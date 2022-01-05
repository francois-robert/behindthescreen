import { Application, Request, Response } from 'express';
import { environment } from "../../../environments/environment";
import logger from "./logger";

export const loadErrorHandlers = (app: Application) => {

// catch 404 errors and forward to error handler
app.use((req, res, next) => {

interface BetterError extends Error {
    status?: number;
}

const err: BetterError = new Error('Not Found');
err.status             = 404;
next(err);
});

app.use((err: Record<string, unknown>, req: Request, res: Response, next: any) => {

if (err.name === 'ValidationError') {
    return res.status(422).json({
    errors: Object.keys(err.errors).reduce((errors: Record<string, unknown>, key: string) => {
        errors[key] = err.errors[key].message;

        return errors;
    }, {})
    });
}

logger.error(err);
res.status(err.status || 500);
res.json({
    errors: {
    message: err.message,
    error  : !environment.production ? err : {}
    }
});
});

}