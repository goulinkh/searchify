const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
const Bang = require("./models/bangs");
require("./duckduckgo")
  .getBangs()
  .then(async ddgBangs => {
    for (let i = 0; i < ddgBangs.length; i++) {
      const b = ddgBangs[i];
      if (!(await Bang.findOne({ name: b }))) {
        await new Bang({ name: b, origin: "duckduckgo" }).save();
      }
      if (i % 1000 == 0) {
        console.log(i);
      }
    }
  });
