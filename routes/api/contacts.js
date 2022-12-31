const express = require("express")
const { listContacts, getContactById } = require("../../models/contacts")
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require('../../models/contacts')

const router = express.Router()

// @ GET /api/contacts
router.get("/", async (req, res, next) => {
  const allContacts = await listContacts()
  res.status(200).json(allContacts)
})

// @ GET /api/contacts/:id
// !Не отримує body
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const contactById = await getContactById(contactId)

  if (!contactById) {
    res.status(404).json({ message: "Not found" })
  }

  res.status(200).json(contactById)
})

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" })
})

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" })
})

module.exports = router
