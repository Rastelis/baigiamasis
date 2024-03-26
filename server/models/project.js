import { model, Schema } from 'mongoose'

const Project = model('project', new Schema({
  project_name: {
    type: String,
    maxLength: [80, 'Projekto pavadinimas negali buti ilgesnis nei 80 simbolių'],
    required: [true, 'Projekto pavadinimas yra privalomas']
  },
  picture: {
    type: String,
    required: [true, 'Įkelti nuotrauką yra privaloma']
  },
  description: {
    type: String,
    maxLength: [2000, 'Aprašymas yra per ilgas, aprašymas negali būti ilgesnis nei 2000 simbolių'],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  hearing_at: {
    type: Date,
    required: [true, 'Nurodyti svarstymo datą yra privaloma'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    default: "Pateiktas",
  },
}));

export default Project;