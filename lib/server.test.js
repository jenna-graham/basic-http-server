import request from 'supertest';
import { serve } from './server.js';

describe('The TCP server', () => {
  let server = null;

  beforeEach(() => {
    // Deliberately omit the port so we get an available one.
    server = serve('localhost', undefined);
  });

  afterEach(() => {
    server.close();
  });

  // This test will fail initially since the project doesn't start with a
  // working HTTP server.
  it('GET route returns HTML body', async () => {
    console.log(await request(server).get('/'), 'This is the LOG!!');
    const res = await request(server).get('/').expect(200);
    expect(res.type).toEqual('text/html');
  });

  it('GET route gets json data', async () => {
    const res = await request(server).get('/jsonData').expect(200);
    expect(res.type).toEqual('application/json');
  });

  it('POST route /mail returns 204', async () => {
    await request(server).post('/mail').expect(204);
  });

  it('receives a 404 when requesting an unknown resource/method', async () => {
    await request(server).put('/fictitious').expect(404);
  });
});
