const fetch = require("node-fetch");
/**
 *
 * @param {Array} a array
 * @param {any} e element
 */

exports.getBangs = async () => {
  const url = "https://duckduckgo.com/bang_lite.html";
  let res = await (await fetch(url)).text();
  res = res.match(/!\w+/gi).map(b => b.replace(/^!/gi, ""));
  res.splice(0, 1);
  return res;
};
