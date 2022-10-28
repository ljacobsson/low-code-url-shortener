const { createMetricsLogger, Unit } = require("aws-embedded-metrics");
const zlib = require('zlib');
exports.handler = async (event) => {  
  const zippedInput = new Buffer.from(event.awslogs.data, 'base64');
  const unzippedInput = zlib.gunzipSync(zippedInput);
  const logs = JSON.parse(unzippedInput.toString('utf8'));
  for (const logEvent of logs.logEvents) {
    const metrics = createMetricsLogger();
    metrics.setNamespace("StepFunctions");
      const message = JSON.parse(logEvent.message);
    console.log(message)
    metrics.setDimensions({
      StateMachine: message.execution_arn.split(":")[6],
      State: message.details.name,
    });
    metrics.putMetric("InputSize", message.details.input.length, Unit.Bytes); // string length probably differs from actual bytes, but this gives an indication
    metrics.flush();
  }
};

