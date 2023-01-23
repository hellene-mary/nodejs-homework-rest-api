const { Contact } = require("../models/contacts");

async function getAllContacts(req, res) {
  const { id: owner } = req.user;
  console.log("owner", owner);
  console.log("req.user", req.user);
  const allContacts = await Contact.find({ owner });
  res.status(200).json(allContacts);
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(contactById);
}

async function addContact(req, res) {
  const { name, email, phone } = req.body;
  const { id: owner } = req.user;

  const NewContact = await Contact.create({ name, email, phone, owner });
  console.log("NewContact", NewContact);

  res.status(201).json(NewContact);
}

async function removeContact(req, res) {
  const { contactId } = req.params;
  const response = await Contact.findByIdAndRemove(contactId);

  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ message: "Contact deleted" });
}

async function updateContact(req, res) {
  const { contactId } = req.params;
  const upContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log("upContact", upContact);
  if (!upContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(upContact);
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params;

  const upContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!upContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(upContact);
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
