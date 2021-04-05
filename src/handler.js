require('dotenv').config()

const https = require('https');

exports.handler = (event, context, callback) => {
  const time = new Date();
  let endpoint = process.env.ENDPOINT + 'misc/progress?period=60';
  let options = {
      headers: {
          'X-Practera': 'progress',
      },
  };
  var request = https.get(endpoint, options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
  
      res.on('data', (d) => {
          console.log('Response: ' + d);
          console.log(`Your cron function "${context.functionName}" ran at ${time}`);
      });
  }).on('error', (e) => {
      console.error(e);
  });
};