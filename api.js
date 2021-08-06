const http = require('http');
const port = 1234;

const server = http.createServer((request, response) => {
  const temperature = Math.random() * 60 - 20;
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.write(JSON.stringify({
    main: {
      temp: temperature,
    }
  }));
  response.end();
});

server.listen(port, () => {
  console.log(`Api locale sur http://localhost:${port}`);
});