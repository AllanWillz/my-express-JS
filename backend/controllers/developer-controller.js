const { Developer, Sequelize, sequelize } = require('../database/models');

async function createDeveloper(request, response) {
    try {
       const developer = await Developer.create(request.body);
       return response.status(201).send({ developer });
    } catch(error) {
        console.error(error);
        return response.status(500).send({ error });
    }
}

async function listAll(request, response) {
    try {
       const developers = await Developer.findAll();
       return response.status(200).send({ developers });
    } catch(error) {
        console.error(error);
        return response.status(500).send({ error });
    }
}

module.exports = {
    createDeveloper, 
    listAll 
};
