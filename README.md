# nbb-lambda-adapter

[NPM package](https://www.npmjs.com/package/nbb-lambda-adapter) to enable running Clojurescript code on AWS Lambda NodeJS runtime using [nbb](https://github.com/babashka/nbb).

Major benefit with this library is rapid Lambda development directly in the Lambda Console. There's no need to compile CLJS to JS so the feedback loop is very quick.

This approach is also compatible with all existing tooling for `node`. Use CDK, SAM, Serverless or whatever build/deployment tool.

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

* nbb loads slowly with 128MB of memory. Increase the timeout or add more memory. Startup will speed up significantly when more memory is added because Lambda gets also more CPU power with the extra memory.
* ARM64 architecture provides cost and speed benefits over x86
* `aws-sdk` is available on the NodeJS runtime and it can be required `(require '["aws-sdk$default" :as AWS])`

## AWS SDK example

```clojure
(ns example
    (:require ["aws-sdk$default" :as AWS]))

(def s3-client (AWS/S3.))

(defn handler [event _ctx]
  (-> s3-client
      (.listObjects #js{:Bucket "nbb-adapter-test"})
      .promise
      (.then js/console.log)))

#js {:myHandler handler}
```
