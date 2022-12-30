import { rest } from 'msw';
import { BASE_URL } from '../utils/http';
import { mockedExpenses } from './mockedExpenses';
const matcher = `${BASE_URL}/expenses.json`;
export const handlers = [
  rest.get(matcher, (req, res, ctx) => {
    return res(ctx.json(mockedExpenses));
  }),
  rest.post(matcher, (req, res, ctx) =>
    res(ctx.status(201), ctx.json({ name: 'id' }))
  ),
  rest.put(`${BASE_URL}/expenses/:id.json`, (req, res, ctx) =>
    res(ctx.status(200))
  ),
  rest.delete(`${BASE_URL}/expenses/:id.json`, (req, res, ctx) =>
    res(ctx.status(200))
  )
];
