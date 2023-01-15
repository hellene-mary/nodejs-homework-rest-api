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
const { tryCatchWrapper } = require("../../helpers/helpers")

const router = express.Router()

router.get("/", tryCatchWrapper(getAllContacts))
router.get("/:contactId", tryCatchWrapper(getContactById))
router.post(
  "/",
  validateNewContact(addContactSchema),
  tryCatchWrapper(addContact)
)
router.delete("/:contactId", tryCatchWrapper(removeContact))
router.put(
  "/:contactId",
  validateUpdateContact(putContactSchema),
  tryCatchWrapper(updateContact)
)
router.patch("/:contactId/favorite", tryCatchWrapper(updateStatusContact))

module.exports = router
