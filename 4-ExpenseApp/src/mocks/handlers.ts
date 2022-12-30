import { rest } from 'msw';
import { BASE_URL } from '../utils/http';
import { mockedExpenses } from './mockedExpenses';

export const handlers = [
  rest.get(`${BASE_URL}/expenses.json`, (req, res, ctx) => {
    return res(ctx.json(mockedExpenses));
  }),
  rest.post('/expenses', (req, res, ctx) => res(ctx.status(201))),
  rest.put('/expenses', (req, res, ctx) => res(ctx.status(200))),
  rest.delete('/expenses', (req, res, ctx) => res(ctx.status(200)))
];
