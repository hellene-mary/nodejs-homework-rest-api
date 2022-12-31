const express = require("express")
const { nanoid } = require("nanoid")

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
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
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const contactById = await removeContact(contactId)

  if (!contactById) {
    res.status(404).json({ message: "Not found" })
  }

  res.status(200).json({ message: "contact deleted" })
})

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

module.exports = router
