import { model, Schema } from 'mongoose'

const User = model('user', new Schema({
  name: {
    type: String,
    maxLength: [80, 'Vardas per ilgas, vardas negali būti ilgesnis nei 80 simbolių.'],
    required: [true, 'Vardas turi būti įvestas.'],
  },
  surname: {
    type: String,
    maxLength: [80, 'Pavardė per ilga, pavardė negali būti ilgesnė nei 80 simbolių.'],
    required: [true, 'Pavardė turi būti įvesta.'],
  },
  party_name: {
    type: String,
    maxLength: [80, 'Partijos pavadinimas per ilgas, Pavadinimas negali būti ilgesnė nei 80 simbolių.'],
    required: [true, 'Partijos pavadinimas turi būti įvestas.'],
  },
  email: {
    type: String,
    required: [true, 'Pašto adresas yra būtinas.'],
    unique: [true, 'Elektroninis paštas jau yra naudojamas.'],
    maxLength: [80, 'el. pašto adresas per ilgas.'],
    validate: [{
      validator: function (v) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: props => `${props.value} yra netinkamai įvestas el. pašto adresas.`
    }
    ]
  },
  password: {
    type: String,
    minLength: [8, 'Slaptažodis yra per trumpas, slaptažodis negal būti trumpesnis nei 8 simboliai.'],
    maxLength: [80,'Slaptažodis yra perilgas, spatažodis negali buti ilgesnis nei 80 simbolių'],
    validate: [
      {
        validator: function (v) {
          return /[0-9]/.test(v);
        },
        message: 'Slaptažodis turi turėti bent vieną simbolį.'
      },
      {
        validator: function (v) {
          return /[A-Z]/.test(v);
        },
        message: 'Slaptažodis turi turėti bent vieną didžiają raidę.'
      },
      {
        validator: function (v) {
          return /[a-z]/.test(v);
        },
        message: 'Slaptažodis turi turėti bent vieną mažają raidę.'
      },
      {
        validator: function (v) {
          return /[#?!@$ %^&*-.+=]/.test(v);
        },
        message: 'slaptažodis turi turėti bent viena simbolį.'
      }
    ]
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  addmin: {
    type: Boolean,
    default: false,
  },
  active_user: {
    type: Boolean,
    default: true,
  },
}))

export default User;