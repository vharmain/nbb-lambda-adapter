# nbb-lambda-adapter
NPM package to enable running Clojurescript code on AWS Lambda NodeJS runtime

This approach is compatible with all existing tooling for `node`. Use CDK, SAM, Serverless or whatever build/deployment tool.

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

* `npm init`
* `npm install --save nbb-lambda-adapter`
* Create index.js according to example above
* Create demo.cljs according to example above
* `zip -r app.zip .`
*  Upload `app.zip` to your NodeJS 14.x Lambda and test

## Tips & tricks

* nbb loads slowly with 128MB of memory. Increase the timeout or add more memory. Startup will speed up significantly when more memory is added
* ARM64 architecture provides cost and speed benefits over x86
* `aws-sdk` is available on the NodeJS runtime and it can be required `(require '["aws-sdk" :as AWS])`
