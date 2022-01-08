const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

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
      },
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
