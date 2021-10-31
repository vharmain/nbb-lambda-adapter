let handlers = {};

async function resolveHandler(
  filePath = "./example.cljs",
  handlerName = "handler"
) {
  let key = filePath + "_" + handlerName;

  if (handlers[key]) {
    return handlers[key];
  }

  let { loadFile } = await import("./node_modules/nbb/out/nbb_api.js");
  let deps = await loadFile(filePath);

  if (!deps[handlerName]) {
    throw new Error(
      `Handler '${handlerName}' was not found in '${filePath}'. Maybe missing export?`
    );
  }

  handlers[key] = deps[handlerName];

  return deps[handlerName];
}

function handlerProxy(filePath, handlerName) {
  return async (event, context) => {
    return (await resolveHandler(filePath, handlerName))(event, context);
  };
}

module.exports = handlerProxy;
