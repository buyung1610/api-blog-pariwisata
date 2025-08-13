const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiredAt: { type: Date, required: true },
});

blacklistTokenSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
