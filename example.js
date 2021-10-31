const handlerProxy = require("nbb-cljs-adapter");

module.exports = {
  handler: handlerProxy("example.cljs", "handler"),
};
