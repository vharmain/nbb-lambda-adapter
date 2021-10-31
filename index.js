let handlers = {};
let cachedDeps = {};
let loadFileCached = null;

async function resolveHandler(
  filePath = "./example.cljs",
  handlerName = "handler"
) {
  if (!loadFileCached) {
    let { loadFile } = await import("nbb");
    loadFileCached = loadFile;
  }

  if (!cachedDeps[filePath]) {
    let deps = await loadFileCached(filePath);
    cachedDeps[filePath] = deps;
  }

  if (!cachedDeps[filePath][handlerName]) {
    throw new Error(
      `Handler '${handlerName}' was not found in '${filePath}'. Maybe missing export?`
    );
  }

  let key = filePath + "_" + handlerName;
  handlers[key] = cachedDeps[filePath][handlerName];

  return handlers[key];
}

function handlerProxy(filePath, handlerName) {
  let key = filePath + "_" + handlerName;
  return async (event, context) => {
    if (handlers[key]) {
      return handlers[key](event, context);
    }
    return (await resolveHandler(filePath, handlerName))(event, context);
  };
}

module.exports = handlerProxy;
