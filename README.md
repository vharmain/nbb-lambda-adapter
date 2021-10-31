# nbb-lambda-adapter
NPM package to enable running Clojurescript code on AWS Lambda NodeJS runtime

## index.js

```javascript
const handlerProxy = require("nbb-lambda-adapter");

module.exports = {
  handler: handlerProxy("demo.cljs", "handler"),
};
```

## demo.cljs

```clojure
(ns example)

(defn handler [event _ctx]
  (js/console.log event)
  (js/Promise.resolve #js{:hello "world"}))

#js {:handler handler}
```

## Setup

* `npm install --save nbb-lambda-adapter`
* Create index.js according to example above
* Create demo.cljs according to example above
* `zip -r app.zip .`
*  Upload `app.zip` to your NodeJS 14.x Lambda and test

## TODO

* Find out if first invocation time can be decreased (it's now very slow)
* Figure out less brittle way to import `nbb`
