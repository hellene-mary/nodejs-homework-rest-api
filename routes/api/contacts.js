const express = require("express")
const { nanoid } = require("nanoid")

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts")

const {
  addContactSchema,
  putContactSchema,
} = require("../../validation/schemasContacts")

const router = express.Router()

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts()
  res.status(200).json(allContacts)
})

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const contactById = await getContactById(contactId)

  if (!contactById) {
    res.status(404).json({ message: "Not found" })
    return
  }

  res.status(200).json(contactById)
})

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

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const response = await removeContact(contactId)

  if (!response) {
    res.status(404).json({ message: "Not found" })
    return
  }

  res.status(200).json({ message: "contact deleted" })
})

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const { error } = putContactSchema.validate(req.body)
  if (error) {
    res.status(400).json({ message: "validation error" })
    return
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" })
    return
  }

  const response = await updateContact(contactId, req.body)
  if (!response) {
    res.status(404).json({ message: "Not found" })
    return
  }
  res.status(200).json(response)
})

module.exports = router
