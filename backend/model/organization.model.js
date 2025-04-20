// models/organization.model.js

import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uniqueCode: { type: String, required: true, unique: true }, // like "upskill001"
  emailDomain: { type: String, required: true, unique: true }, // like "example.com"
  admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Organization = mongoose.model("organization", organizationSchema);
export default Organization;
