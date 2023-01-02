const express = require("express")
const { nanoid } = require("nanoid")
const {
  validateNewContact,
  validateUpdateContact,
} = require("../../middlewares/validateContacts")

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

router.post(
  "/",
  validateNewContact(addContactSchema),
  async (req, res, next) => {
    const { name, email, phone } = req.body
    const body = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    }
    addContact(body)

    res.status(201).json(body)
  }
)

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const response = await removeContact(contactId)

  if (!response) {
    res.status(404).json({ message: "Not found" })
    return
  }

  res.status(200).json({ message: "contact deleted" })
})

router.put(
  "/:contactId",
  validateUpdateContact(putContactSchema),
  async (req, res, next) => {
    const { contactId } = req.params
    const response = await updateContact(contactId, req.body)
    if (!response) {
      res.status(404).json({ message: "Not found" })
      return
    }
    res.status(200).json(response)
  }
)

module.exports = router
