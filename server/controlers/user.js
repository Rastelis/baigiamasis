

import { Router } from 'express'
import User from '../models/user.js'
import multer from 'multer';
import mongoose from 'mongoose';

const router = Router();
const upload = multer();
//get all users
router.get('/vartotojai', async (req, resp) => {
  try {
    resp.status(200).json(await User.find())
  } catch (err) {
    resp.status(500)
      .json(Object.values(Object.values(err)[0])[0].message)
  }
})
// get single user by id
router.get('/vartotojai/:id', async (req, resp) => {
  try {
    resp.status(200).json(await User.findById(req.params.id))
  } catch (err) {
    resp.status(500)
      .json(Object.values(Object.values(err)[0])[0].message)
  }
})
//create new user
router.post('/vartotojai', upload.none(), async (req, resp) => {
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

//update user
router.put('/vartotojai/:id', upload.none(), async (req, resp) => {

  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    resp.status(200).json('Vartotojas sekmingai atnaujintas');
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

//delete user

// router.delete('/vartotojai', async(req,resp)=>{
//   try {
//     await User.findByIdAndDelete(req)
//   } catch (err) {
//     resp.status(500).json(err.message)
//   }
// });


export default router;