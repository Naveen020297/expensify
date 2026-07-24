import request from 'supertest';
import app from '../App';

describe('Expense API', () => {
    it('should create a new expense', async () => {
        const response = await request(app)
            .post('/api/expenses')
            .send({ amount: 100, category: 'Food', description: 'Lunch' });
        expect(response.status).toBe(201);
    });

    it('should retrieve all expenses', async () => {
        const response = await request(app)
            .get('/api/expenses');
        expect(response.status).toBe(200);
    });
});