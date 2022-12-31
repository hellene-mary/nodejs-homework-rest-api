const express = require("express")
const { nanoid } = require("nanoid")

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts")

const { addContactSchema } = require("../../validation/schemasContacts")

const router = express.Router()

// @ GET /api/contacts
router.get("/", async (req, res, next) => {
  const allContacts = await listContacts()
  res.status(200).json(allContacts)
})

// @ GET /api/contacts/:id
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const contactById = await getContactById(contactId)

  if (!contactById) {
    res.status(404).json({ message: "Not found" })
  }

  res.status(200).json(contactById)
})

// @ POST /api/contacts
router.post("/", async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body)
  if (error) {
    res.status(400).json({ message: "missing required name field" })
    return
  }

  const { name, email, phone } = req.body
  const body = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  }
  addContact(body)

  res.status(201).json(body)
})

// @ DELETE /api/contacts/:id
// ! обробити помилку при відсутності контакту
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const response = await removeContact(contactId)
  console.log("response", response)

  if (response === false) {
    res.status(404).json({ message: "Not found" })
  }

  res.status(200).json({ message: "contact deleted" })
})

// @ PUT /api/contacts/:id
// Отримує параметр id
// Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
// Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
// Якщо з body всі добре, викликає функцію updateContact(contactId, body). (Напиши її) для поновлення контакту в файлі contacts.json
// За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" })
    return
  }

  const response = await updateContact(contactId, req.body)
  if (!response) {
    res.status(404).json({ message: "Not found" })
  }
  res.status(200).json(response)
})

module.exports = router
