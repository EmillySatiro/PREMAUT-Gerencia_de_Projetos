import request from 'supertest';
import app from '../src/index';

describe('Relatórios API - CRUD', () => {
  let createdId: number;

  it('deve criar um relatório', async () => {
    const payload = {
      assunto: 'Teste CRUD',
      body: 'Corpo do relatório',
      tipo: 'INCIDENTES',
      pacienteId: 1
    };
    const res = await request(app)
      .post('/api/relatorios')
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('deve listar relatórios', async () => {
    const res = await request(app).get('/api/relatorios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve obter um relatório por ID', async () => {
    const res = await request(app).get(`/api/relatorios/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('deve editar um relatório', async () => {
    const payload = {
      assunto: 'Assunto Editado',
      body: 'Corpo Editado',
      tipo: 'EVOLUÇÃO',
      pacienteId: 1
    };
    const res = await request(app)
      .put(`/api/relatorios/${createdId}`)
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.assunto).toBe('Assunto Editado');
  });

  it('deve remover um relatório', async () => {
    const res = await request(app)
      .delete(`/api/relatorios/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});