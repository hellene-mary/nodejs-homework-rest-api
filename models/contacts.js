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

const addContact = async (body) => {
  const contacts = await readDb()

  contacts.push(body)

  await fs.writeFile(dbPath, JSON.stringify(contacts))
  return body
}

const removeContact = async (contactId) => {
  const contacts = await readDb()
  const contactById = contacts.find((contact) => contact.id === contactId)
  if (!contactById) {
    return null
  }
  await fs.writeFile(
    dbPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  )
  return contactById
}

const updateContact = async (contactId, body) => {
  const contacts = await readDb()
  const contactById = contacts.find((contact) => contact.id === contactId)

  if (!contactById) {
    return
  }

  const upContact = { ...contactById, ...body }
  const index = contacts.findIndex((contact) => contact.id === contactId)

  contacts.splice(index, 1, upContact)
  await fs.writeFile(dbPath, JSON.stringify(contacts))
  return upContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
