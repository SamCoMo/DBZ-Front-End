import { rest } from 'msw';

interface Todo {
  id: number;
  text: string;
}

const todos: Todo[] = [
  { id: 1, text: '먹기' },
  { id: 2, text: '자기' },
  { id: 3, text: '놀기' }
];

// 할일 목록
const getTodo = rest.get('/todos', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(todos))
);
export default getTodo;
