import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  email_verified: {
    type: Boolean
  },
  accountActive: {
    type: Boolean
  },
  celloReferralCode: String,
  plan: Object,
  engagePlan: Object,
  picture: String,
  phone: String, // not being used anymore
  phoneNumber: {
    type: String,
    sparse: true
  },
  phone_verified: Boolean,
  role: {
    type: String,
    enum: ["user", "admin", "participant"],
    default: "user"
  },
  phoneVerified: {
    // @todo: check and remove this - this is a dup
    type: Boolean
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization"
  },
  password: {
    type: String,
    minlength: 8
  },
  refreshToken: String,
  emailVerification: {
    token: String,
    expires: Date
  },
  passwordReset: {
    token: String,
    expires: Date
  },
  appData: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "participant"
  },
  roles: Array,
  signedInAs: {
    type: String
  },
  degradedModel: {
    type: Boolean
  }
});

export default mongoose.model("user", userSchema);

