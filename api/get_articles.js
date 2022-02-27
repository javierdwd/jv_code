const https = require('https')


export default function handler(_, response) {
  let responseRaw = '';

  const data = JSON.stringify({
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    access_token: process.env.POCKET_ACCESS_TOKEN,
    tag: "sport",
    sort: "newest"
  });

  const req = https.request({
    hostname: 'getpocket.com',
    port: 443,
    path: '/v3/get',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF8',
      'Content-Length': data.length
    }
  }, res => {
    res.on('data', data => {
      responseRaw += data;
    });

    res.on('end', () => {
      const jsonResponse = JSON.parse(responseRaw)

      if(jsonResponse.error) {
        response.status(500).json({
          message: "Unexpected GetPocket's response error",
        });
      } else {
        response.status(200).json(Object.values(jsonResponse.list).map(el => ({
          item_id: el.item_id,
          url: el.given_url || el.resolved_urls,
          title: el.given_title || el.resolved_title,
          added: el.time_added,
        })));
      }
    })
  });

  req.on('error', error => {
    response.status(500).json({
      message: error.message
    });
  });

  req.write(data)
  req.end();
}