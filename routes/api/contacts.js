const express = require("express");

const {
  validateContactField,
  validateUpdateContact,
} = require("../../middlewares/validateContacts");

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");

const {
  addContactSchema,
  putContactSchema,
  updateStatusSchema,
} = require("../../validationSchemas/schemasContacts");

const { tryCatchWrapper } = require("../../helpers/helpers");
const { validateToken } = require("../../middlewares/validateToken");

const router = express.Router();

router.get(
  "/",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(getAllContacts)
);
router.get(
  "/:contactId",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(getContactById)
);
router.post(
  "/",
  tryCatchWrapper(validateToken),
  validateContactField(addContactSchema),
  tryCatchWrapper(addContact)
);
router.delete(
  "/:contactId",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(removeContact)
);
router.put(
  "/:contactId",
  tryCatchWrapper(validateToken),
  validateUpdateContact(putContactSchema),
  tryCatchWrapper(updateContact)
);
router.patch(
  "/:contactId/favorite",
  tryCatchWrapper(validateToken),
  validateContactField(updateStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
