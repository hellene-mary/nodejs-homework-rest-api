const express = require("express")

const {
  validateNewContact,
  validateUpdateContact,
} = require("../../middlewares/validateContacts")

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller")
const {
  addContactSchema,
  putContactSchema,
} = require("../../validation/schemasContacts")

const router = express.Router()

router.get("/", getAllContacts)
router.get("/:contactId", getContactById)
router.post("/", validateNewContact(addContactSchema), addContact)
router.delete("/:contactId", removeContact)
router.put(
  "/:contactId",
  validateUpdateContact(putContactSchema),
  updateContact
)
router.patch("/:contactId/favorite", updateStatusContact)

module.exports = router
