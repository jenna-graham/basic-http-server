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
      if (method == 'GET') {
        const body = `<html>
        <main>
        <h1> Assignment for Alchemy </h1>
        <section>
        <h2>
        This is so fun!</h2></section>
        </main>
        </html>`;
        socket.write(`HTTP/1.1 200 Ok
        Content-Length: ${body.length}

      ${body}`);
      } else {
        socket.write(dataStr.toUpperCase());
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
