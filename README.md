# Low-code URL shorterner 
## _Built using AWS ApiGateway, StepFunctions Express and DynamoDB - no Lambda_

### Prerequisite
* A short domain name
* An AWS account with a [Route53 hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingHostedZone.html) and [ACM certificate](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html) set up in `us-east-1` - these are not part of this CloudFormaton stack sice you'd normally keep them in separate stacks.
* [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Installation
1. Clone this repo
2. Prom the project root, Run `sam deploy --guided`

### Usage

#### To create a short URL
```
curl -X POST \
  'https://<yourshortdomain>/' \
  --header 'Content-Type: application/json' \
  --data-raw '{"Url": "https://example.com/lots/of/path?and?query&string=parameters"}'
```

Example response:
```
{ "ShortUrl": "https://<yourshortdomain>/a1b2" }
```