const express = require('express');
const developersRouter = express.Router();
const { createDeveloper, listAll, deleteDeveloper, editDeveloper } = require('../controllers/developer-controller');
const { logModifiedName, titleCaseName } = require('../middlewares/developer');

developersRouter.post('/create',
  titleCaseName,
  logModifiedName,
  createDeveloper
);

developersRouter.post('/find-by-id', function (request, response, next) {
  const { name, language } = request.body;
  const id = request.query.id;
  return response.send([
    {
      id,
      router: 'developers',
      name,
      age: 20,
      language
    },
    {
      id,
      router: 'developers',
      name,
      age: 20,
      language
    }
  ]);
});

developersRouter.get('/', listAll);

developersRouter.post('/:id/update', function (req, res, next) {
  const { id } = req.params;
  res.send({ success: true, id });
});

// EDIT
developersRouter.put('/:id/edit', titleCaseName, logModifiedName, editDeveloper);

// DELETE developer
developersRouter.delete('/:id', deleteDeveloper);

module.exports = developersRouter;
