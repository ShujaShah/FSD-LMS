import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dynamoose from 'dynamoose';
import router from './routes';
import { Request, Response } from 'express';
import { clerkMiddleware, createClerkClient } from '@clerk/express';
import serverless from 'serverless-http';
import seed from './seed/seedDynamodb';

/** CONFIGURATIONS */
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  dynamoose.aws.ddb.local();
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }));
app.use(clerkMiddleware());

/** CORS */
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

/** Routes */
app.use('/api/v1', router);

app.use('health-check', (req: Request, res: Response) => {
  res.send({ message: 'Server is up and running' });
});

/** SERVER */
const port = process.env.PORT || 4000;
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

/** aws production environment */
const serverlessApp = serverless(app);
export const handler = async (event: any, context: any) => {
  if (event.action === 'seed') {
    await seed();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data seeded successfully' }),
    };
  } else {
    return await serverlessApp(event, context);
  }
};
