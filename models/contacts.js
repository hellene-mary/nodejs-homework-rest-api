const fs = require("fs/promises")
const path = require("path")
const dbPath = path.resolve(__dirname, "contacts.json")

async function readDb() {
  const dbRaw = await fs.readFile(dbPath)
  const db = JSON.parse(dbRaw)
  return db
}

const listContacts = async () => {
  return await readDb()
}

const getContactById = async (contactId) => {
  const contacts = await readDb()
  return contacts.find((contact) => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await readDb()
  return contacts.find((contact) => contact.id === contactId)
}

const addContact = async (body) => {
  const contacts = await readDb()

  contacts.push(body)

  await fs.writeFile(dbPath, JSON.stringify(contacts))
  return body
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
