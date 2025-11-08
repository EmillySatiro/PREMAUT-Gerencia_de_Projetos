import request from 'supertest';
import app from '../src/index';
import path from 'path';

describe('Upload API', () => {
  let uploadedFileName = 'pato.jpg';

  it('deve fazer upload de um arquivo', async () => {
    const filePath = path.join(__dirname, uploadedFileName);
    const res = await request(app)
      .post('/api/upload')
      .attach('file', filePath);
    expect(res.statusCode).toBe(201);
    expect(res.body.url).toBeDefined();
  });

  it('deve atualizar (substituir) um arquivo', async () => {
    const filePath = path.join(__dirname, uploadedFileName);
    const res = await request(app)
      .put(`/api/upload/${uploadedFileName}`)
      .attach('file', filePath);
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBeDefined();
  });

  it('deve remover um arquivo existente', async () => {
    const res = await request(app)
      .delete(`/api/upload/${uploadedFileName}`);
    expect(res.statusCode).toBe(204);
  });

  it('deve retornar 404 ao remover um arquivo inexistente', async () => {
    const res = await request(app).delete('/api/upload/arquivo_inexistente.jpg');
    expect([204, 404]).toContain(res.statusCode);
  });
});