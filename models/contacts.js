const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("models/contacts.json");
async function rewriteContacts(newContact) {
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
}

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(allContacts);
  } catch (error) {
    console.log(error.red);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const result = allContacts.find((item) => item.id === contactId);

    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const idx = allContacts.findIndex((item) => item.id === contactId);

    if (idx === -1) {
      return null;
    }

    const [result] = allContacts.splice(idx, 1);

    await rewriteContacts(allContacts);

    return result;
  } catch (error) {
    console.log(error.red);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const allContacts = await listContacts();

    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);

    await rewriteContacts(allContacts);

    return console.log(newContact, " ADDED!");
  } catch (error) {
    console.log(error.red);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();

    const idx = allContacts.findIndex((item) => item.id === contactId);

    if (idx === -1) {
      return null;
    }

    allContacts[idx] = body;

    await rewriteContacts(allContacts);

    return allContacts[idx];
  } catch (error) {
    console.log(error.red);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
