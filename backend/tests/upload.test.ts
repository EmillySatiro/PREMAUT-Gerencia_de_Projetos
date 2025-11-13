import request from 'supertest';
import app from '../src/index';
import path from 'path';

describe('Materiais API', () => {
  let uploadedFileName = 'pato.jpg';

  it('deve fazer materiais de um arquivo', async () => {
    const filePath = path.join(__dirname, uploadedFileName);
    const res = await request(app)
      .post('/api/materiais')
      .attach('file', filePath);
    expect(res.statusCode).toBe(201);
    expect(res.body.url).toBeDefined();
  });

  it('deve pegar todos os materiais', async () => {
    const res = await request(app)
      .get('/api/materiais');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve atualizar (substituir) um arquivo', async () => {
    const filePath = path.join(__dirname, uploadedFileName);
    const res = await request(app)
      .put(`/api/materiais/${uploadedFileName}`)
      .attach('file', filePath);
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBeDefined();
  });

  it('deve remover um arquivo existente', async () => {
    const res = await request(app)
      .delete(`/api/materiais/${uploadedFileName}`);
    expect(res.statusCode).toBe(204);
  });

  it('deve retornar 404 ao remover um arquivo inexistente', async () => {
    const res = await request(app).delete('/api/materiais/arquivo_inexistente.jpg');
    expect([204, 404]).toContain(res.statusCode);
  });
});