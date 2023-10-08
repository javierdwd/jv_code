const https = require('https')

exports.default = function handler(_, response) {
  let responseRaw = '';

  const data = JSON.stringify({
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    access_token: process.env.POCKET_ACCESS_TOKEN,
    tag: "catchedmyattention",
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
        const mappedResponse = Object
                                .values(jsonResponse.list)
                                .sort((a, b) => a.sort_id < b.sort_id ? -1 : 1)
                                .map(el => ({
                                  item_id: el.item_id,
                                  url: el.given_url || el.resolved_urls,
                                  title: el.given_title || el.resolved_title,
                                  added: new Date(Number(el.time_added) * 1000),
                                }));

        response.setHeader('Cache-Control', 'max-age=86400');
        response.status(200).json(mappedResponse);
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