import request from 'supertest';
import app from '../App';

describe('Expense API', () => {
    it('should create a new expense', async () => {
        const response = await request(app)
            .post('/api/expenses')
            .send({ amount: 100, category: 'Food', description: 'Lunch' });
        expect(response.status).toBe(201);
    });

    it('should fetch all expenses', async () => {
        const response = await request(app)
            .get('/api/expenses');
        expect(response.status).toBe(200);
    });

    it('should update an expense', async () => {
        const expense = await request(app)
            .post('/api/expenses')
            .send({ amount: 100, category: 'Food', description: 'Lunch' });
        const response = await request(app)
            .put(`/api/expenses/${expense.body.id}`)
            .send({ amount: 150 });
        expect(response.status).toBe(200);
    });

    it('should delete an expense', async () => {
        const expense = await request(app)
            .post('/api/expenses')
            .send({ amount: 100, category: 'Food', description: 'Lunch' });
        const response = await request(app)
            .delete(`/api/expenses/${expense.body.id}`);
        expect(response.status).toBe(204);
    });
});