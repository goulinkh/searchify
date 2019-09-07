const mongoose = require("mongoose");
const bangsSchema = mongoose.Schema({
  name: String,
  query: {
    type: String,
    required: false
  },
  origin: String
});

module.exports = mongoose.model("bangs", bangsSchema);
