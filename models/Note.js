
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const noteSchema = new Schema ({
    title: {
        type: String, required: true },
    content: {
        type: String, required: true },

user: {
  type: Schema.Types.ObjectId, //monGOdb UniqueID for a user
  ref: 'User', // this ObjectId belongs to User collection
  required: true
}

});