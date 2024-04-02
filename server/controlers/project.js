import { Router } from "express";
import multer from "multer";
import mongoose from "mongoose";

import upload from "../middleware/multer.js";
import Project from "../models/project.js";

const router = Router();
const uploadFn = upload.single('picture')

// get all projects
router.get('/', async (req, resp) => {
  try {
    resp.status(200).json(await Project.find().populate('author', ['name', 'surname', 'party_name']))
  } catch (err) {
    resp.status(500).json(err);
  }
})

// get single project by _id
router.get('/projektas/:id', async (req, resp) => {
  try {
    resp.status(200).json(await Project.findById(req.params.id).populate('author', ['name', 'surname', 'party_name']))
  } catch (err) {
    resp.status(500).json(err);
  }
})

// create new project
router.post('/', async (req, resp) => {
  uploadFn(req, resp, async (err) => {
    if (err instanceof multer.MulterError) return resp.status(406).json(err.message)
    else if (err === 'format') return resp.status(406).json('Netinkamas nuotraukos formatas, leidžiami nutraukų formatai: jpg/jpeg, png')

    if (req.file) req.body.picture = req.file.filename;

    try {
      await Project.create(req.body);
      resp.status(200).json('Projektas sekmingai įkeltas');
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) resp.status(406).json(Object.values(Object.values(err)[0])[0].message);
      else resp.status(500).json(err);
    }
  })
})

// update project
router.put('/:id', async (req, resp) => {
  uploadFn(req, resp, async (err) => {
    if (err instanceof multer.MulterError) return resp.status(406).json(err.message)
    else if (err === 'format') return resp.status(406).json('Netinkamas nuotraukos formatas, leidžiami nutraukų formatai: jpg/jpeg, png')

    if (req.file) req.body.picture = req.file.filename;

    try {
      await Project.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      resp.status(200).json('Statusas sekmingai pakeistas');
    } catch (err) {
      resp.status(500).json(err);
    }
  });
});

// delete project
router.delete('/:id', async (req, resp) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    resp.status(200).json("Projektas Sekmingai ištrintas")
  } catch (err) {
    resp.status(500).json(err)
  }
})

export default router;

