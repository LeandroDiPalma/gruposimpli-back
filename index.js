import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import jwtMiddleware from './auth.js';
import dotenv from 'dotenv';
import expressJwt from 'express-jwt';

import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import accessoryRoutes from './routes/accessoryRoutes.js';
import dealerRoutes from './routes/dealerRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

app.use(cors());
app.use(helmet());
app.use(express.json());

connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use((req, res, next) => {
    try {
      jwtMiddleware().unless({
        path: [
          { url: '/', methods: ['GET'] },
          { url: '/api/login', methods: ['POST'] },
          { url: '/api/dealers', methods: ['GET'] },
          { url: /^\/api\/dealer\/\w+\/vehicles$/, methods: ['GET'] }, 
          { url: /^\/api\/dealer\/\w+\/posts$/, methods: ['GET'] }, 
          { url: /^\/api\/dealer\/\w+\/posts\/\w+$/, methods: ['GET'] }, 
          { url: /^\/api\/dealer\/\w+\/leads$/, methods: ['POST'] }
        ]
      })(req, res, next);
    } catch (error) {
      console.error('JWT Middleware error:', error);
      next(error);
    }
  });

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api', authRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/dealer', vehicleRoutes);
app.use('/api/dealer', accessoryRoutes);
app.use('/api/dealer', leadRoutes);
app.use('/api/dealer', postRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
