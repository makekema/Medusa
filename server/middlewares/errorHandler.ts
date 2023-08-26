import { Request, Response, NextFunction } from 'express';


const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Error Handling");
    
    const errStatus = err.statusCode || err.status || 500;
    const errMsg = err.message || 'Ohlala, something went wrong';
    
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}


export { ErrorHandler };
