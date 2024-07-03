const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
  // listar todos os registros
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    //  Obter UM registro
    const { id } = request.params;

    // validando se o UUID esta em formato correto
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Contact not found (invalid contact id)' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    //  Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);
      // verificando se o email já está cadastrado
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail already in use' });
      }
    }

    // caso não esteja cadastrado, vai para tela de cadastro
    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Contact not found (invalid contact id)' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      // Verificar se o email existe, e verificar se id encontrado é dirente do id que será alterado
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is already use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id: category_id || null, // caso o category_id nao for preenchido, retorna null
    });

    response.json(contact);
  }

  async delete(request, response) {
    //  Deletar um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Contact not found (invalid contact id)' });
    }

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

// padrão singleton
module.exports = new ContactController();
