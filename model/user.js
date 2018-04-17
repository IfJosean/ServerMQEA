// Librerias y dependencias
let mongoose = require('mongoose');

// Declaración del esquema
let UserSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true, unique: true },  // Campo obligatório para insertar
    password:      { type: String, required: true },                // Campo obligatório para insertar
    surname:       { type: String},
    state: {type: Boolean},
    role: {type: Boolean}
  }
);

// Exporta el modelo a la Base de Datos
module.exports = mongoose.model('User', UserSchema);
