# nbb-lambda-adapter
NPM package to enable running Clojurescript code on AWS Lambda NodeJS runtime

```bash
# Create the zip
./make-layer.sh

# Publish layer to your AWS account (can also be done in Lambda console)
aws --region eu-west-1 lambda publish-layer-version --layer-name node-nbb-va --compatible-runtimes nodejs14.x --zip-file fileb://layer.zip
```
