const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useUnifiedTopology: true, useNewUrlParser: true });
const Bang = require("./models/bangs");

const app = express();

app.use(morgan("dev"));
app.use("/:query", async (req, res) => {
  try {
    let { query } = req.params;
    const bangs = query.match(/!\w+/gi);
    if (bangs && bangs.length) {
      for (let i = 0; i < bangs.length; i++) {
        const name = bangs[i].replace(/^!/gi, "");
        console.log("name", name);
        const bang = await Bang.findOne({ name });
        if (bang) {
          if (bang.origin === "custom" && bang.query) {
            query = query.replace("!" + bang.name, "").trim();
            res.redirect(bang.query.replace(/{{query}}/gi, query));
            return;
          } else if (bang.origin === "duckduckgo") {
            res.redirect(`https://duckduckgo.com/?q=${query}`);
            return;
          }
        }
      }
      res.redirect(`https://google.com/search?q=${query}`);
      return;
    } else {
      res.redirect(`https://google.com/search?q=${query}`);
    }
  } catch (err) {
    res.redirect("https://google.com/search");
  }
});
const port = 2001
app.listen(port, () => console.log("App started at port",port));
