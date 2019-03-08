const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const lambda = new AWS.Lambda({ region: 'us-west-2' });

const name = 'Jorge';
lambda.invoke({
    FunctionName: process.env.HELLO_FUNCTION_NAME,
    Payload: JSON.stringify({ name })
}, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
