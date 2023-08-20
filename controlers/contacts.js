const Contact = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite !== undefined) {
    const result = await Contact.find({ owner, favorite })
      .skip(skip)
      .limit(limit)
      .populate("owner", "email");

    return res.json(result);
  }

  const result = await Contact.find({ owner }).skip(skip).limit(limit);

  return res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(result);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await Contact.create({ ...req.body, owner });
  return res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const id = req.params;
  const removedContact = await Contact.findByIdAndDelete(id.contactId);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updatedContact);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContact = async (req, res) => {
  const id = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id.contactId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updatedContact);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
