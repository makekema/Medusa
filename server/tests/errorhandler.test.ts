import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../middlewares/errorHandler';


const app = express();


app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Test Error');
  error['status'] = 400;
  next(error);
});

app.get('/error-no-status', (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Test Error');
  next(error);
});


app.use(ErrorHandler);


describe('ErrorHandler middleware', () => {

  it('handles an error without custom status code', async () => {
    app.get('/error-no-status', (req: Request, res: Response, next: NextFunction) => {
      const error: any = new Error('Test Error');
      next(error);
    });
    const res = await request(app).get('/error-no-status');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Test Error');
  });

  it('handles an error with custom statusCode', async () => {
    app.get('/error-with-statusCode', (req: Request, res: Response, next: NextFunction) => {
      const error: any = new Error('Test Error');
      error['statusCode'] = 401;
      next(error);
    });
    const res = await request(app).get('/error-with-statusCode');
    expect(res.status).toBe(401);
  });

  it('includes stack trace in development environment', async () => {
    process.env.NODE_ENV = 'development';
    const res = await request(app).get('/error');
    expect(res.body.stack).toBeDefined();
  });

  it('excludes stack trace in production environment', async () => {
    process.env.NODE_ENV = 'production';
    const res = await request(app).get('/error');
    expect(res.body.stack).toEqual({});
  });

});
