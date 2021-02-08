const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Goal = mongoose.model("Goal");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre(
  "remove",
  { query: true, document: false },
  async function (next) {
    const id = this._conditions._id;
    const goals = await Goal.find({ userId: id });
    goals.map(async (goal, i) => {
      const response = await mongoose
        .model("Goal")
        .remove({ _id: goal._id })
        .exec();
    });

    next();
  }
);

mongoose.model("User", UserSchema);
