import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [6, "Email must be at least 6 characters"],
      maxLength: [50, "Email must be at most 50 characters"],
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please fill a valid email address",
      // ],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: [6, "Password must be at least 6 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
// userSchema.static.hashPassword = async function (password) {
//   return await bcrypt.hashSync(password, 10);
// }

// userSchema.static.comparePassword = async function (password, hash) {
//   return await bcrypt.compareSync(password, hash);
// }
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () { 
    return jwt.sign({ id: this._id,email: this.email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const User = mongoose.model("user", userSchema);
export default User;