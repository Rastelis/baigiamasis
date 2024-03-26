

import { Router } from 'express'
import User from '../models/user.js'
import multer from 'multer';
import mongoose from 'mongoose';

const router = Router();
const upload = multer();

router.get('/vartotojai', async (req, resp) => {
  try {
    resp.status(200).json(await User.find())
  } catch (err) {
    resp.status(500)
      .json(Object.values(Object.values(err)[0])[0].message)
  }
})

router.post('/vartotojai/naujas-vartotojas', upload.none(), async (req, resp) => {
  try {
    await User.create(req.body);
    resp.status(200).json('Vartotojas sekmingai sukurtas');
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      resp.status(406)
        .json(
          `${Object.keys(err.keyValue)[0]}: ${Object.values(err.keyValue)[0]} jau yra naudojamas`
        ) // mongodb returns error when duplicate entries are detected
    }
    else if (err instanceof mongoose.Error.ValidationError)
      resp.status(406)
        .json(
          Object.values(Object.values(err)[0])[0].message
        ); //mogose returns error when validation fails
    else {
      resp.status(500).json(err);
    }
  }
});

export default router;