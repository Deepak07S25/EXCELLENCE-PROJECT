const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
          },
          lastName: {
            type: String,
          },
          emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
              if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
              }
            },
          },
          password: {
            type: String,
            required: true,
            validate(value) {
              if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value);
              }
            },
          },
          gender: {
            type: String,
           
    },
}
);
 
const User = mongoose.model('User', userSchema);

module.exports = User;
