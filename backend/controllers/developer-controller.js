const { Developer, Sequelize, sequelize } = require('../database/models');

async function createDeveloper(request, response) {
    try {
        console.log('Received request to create developer:', request.body);

        const developer = await Developer.create(request.body);

        console.log('Developer created:', developer);

        return response.status(201).send({ developer });
    } catch (error) {
        console.error('Error creating developer:', error);
        return response.status(500).send({ error: 'Internal Server Error' });
    }
}

async function listAll(request, response) {
    try {
        const developers = await Developer.findAll();
        return response.status(200).send({ developers });
    } catch (error) {
        console.error('Error listing all developers:', error);
        return response.status(500).send({ error: 'Internal Server Error' });
    }
}

async function deleteDeveloper(request, response) {
    const { id } = request.params;

    try {
        const developer = await Developer.findByPk(id);

        if (!developer) {
            return response.status(404).send({ error: 'Developer not found' });
        }

        await developer.destroy();

        return response.status(204).send();
    } catch (error) {
        console.error('Error deleting developer:', error);
        return response.status(500).send({ error: 'Internal Server Error' });
    }
}

async function editDeveloper(request, response) {
    const { id } = request.params;

    try {
        const existingDeveloper = await Developer.findByPk(id);

        if (!existingDeveloper) {
            return response.status(404).send({ error: 'Developer not found' });
        }

        await existingDeveloper.update(request.body);

        const updatedDeveloper = await Developer.findByPk(id);

        console.log('Developer updated:', updatedDeveloper);

        return response.status(200).send({ updatedDeveloper });
    } catch (error) {
        console.error('Error editing developer:', error);
        return response.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createDeveloper,
    listAll,
    deleteDeveloper,
    editDeveloper
};
