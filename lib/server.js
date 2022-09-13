import net from 'net';
import chalk from 'chalk';

const logOut = (...args) => console.log(chalk.magenta('[server'), ...args);

export const serve = (host, port) => {
  const server = net.createServer((socket) => {
    logOut('A peer connected!');
    socket.on('data', (data) => {
      const dataStr = data.toString();
      logOut('The data:', data.toString());
      const lines = dataStr.split('\n');
      const startLine = lines[0];
      const [method, path] = startLine.split(' ');
      if (method == 'GET' && path == '/') {
        const body = `<html>
        <main>
        <h1> Assignment for Alchemy </h1>
        <section>
        <h2>
        This is so fun!
        </h2></section>
        </main>
        </html>`;
        socket.write(`HTTP/1.1 200 Ok
Content-Length: ${body.length}

      ${body}`);
      } else if (method == 'GET' && path == '/jsonData') {
        const jsonObject = { name: 'Jenna Graham', age: 37, hometown: 'Portland' };
        socket.write(`HTTP/1.1 200 Ok
Content-Length: ${JSON.stringify(jsonObject).length}
Content-Type: application/json

${JSON.stringify(jsonObject)}`);
      } else if (method == 'POST' && path == '/mail') {
        socket.write(`HTTP/1.1 204 No Content
Content-Length: 0
Content-Type: application/json

`);
      } else {
        const errorRes = `<html>
        <main>
        <h1>404, ERROR THIS WON'T WORK</h1>
        </main>
        </html>`;
        socket.write(`HTTP/1.1 404 Nope
Content-Length: ${errorRes.length}
Accept: application/json, text/html

    ${errorRes}`);
      }
    });
    socket.on('end', () => {
      logOut('Client disconnected');
    });
  });
  server.listen(port, host, () => {
    logOut('my server is up!');
  });
  logOut('Attempting to start server');
  return server;
};
