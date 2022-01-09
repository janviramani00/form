const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const blogSchema = new Schema(
  {
    Name: {
      type: "String",
      maxlength: "30",
      required: [true, "name is required"],
    },

    Email: {
      type: "string",
      lowercase: true,
      required: [true, "email is required"],
      index: {
        unique: true,
      }
    },

    password: {
      type: "string",
      minlength: "6",
      required: [true, "password is required"],
    },

    address: {
      type: "string",

      required: [true, "address is required"],
    },

    country: {
      type: "string",

      required: [true, "country is required"],
    },

    state: {
      type: "string",

      required: [true, "state is required"],
    },

    city: {
      type: "string",

      required: [true, "city is required"],
    },

    Zipcode: {
      type: "number",

      required: [true, "Zipcode is required"],
    },

    gender: {
      type: "string",

      required: [true, "gender is required"],
    },
  },
  { timestamps: true }
);


blogSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(this.password, salt);
    this.password = hashedpassword
    next();
  }
  catch (error) {
    next(error);
  }
})

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
