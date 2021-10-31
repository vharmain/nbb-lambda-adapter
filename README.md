# nbb-lambda-adapter

[NPM package](https://www.npmjs.com/package/nbb-lambda-adapter) to enable running Clojurescript code on AWS Lambda NodeJS runtime using [nbb](https://github.com/babashka/nbb).

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
(ns demo)

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
* Go to AWS Console -> Lambda -> Author from Scratch -> Runtime Node.s 14.x + arm64, configure with 512mb or more (for fast startup)
*  Upload `app.zip` to your Lambda, test and start hacking in the inline code editor

## Tips & tricks

* nbb loads slowly with 128MB of memory. Increase the timeout or add more memory. Startup will speed up significantly when more memory is added
* ARM64 architecture provides cost and speed benefits over x86
* `aws-sdk` is available on the NodeJS runtime and it can be required `(require '["aws-sdk" :as AWS])`
