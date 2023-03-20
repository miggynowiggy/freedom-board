import * as cors from 'cors';
import * as express from 'express';

const api = express();
api.use(cors({ origin: true }));

// Put a middleware here to validate if the requestor is valid
// api.use(authMiddleware)

api.get('/greet', (request, response) => {
  response.send(`Hi From Firebase!`);
});

api.post('/webhook', (request, response) => {
  if (!request.body?.name) {
    return response.status(400).send('Missing Name :<');
  }

  const { name } = request.body;
  return response.send(`Hi ${name}! From Firebase`);
});

export default api;
