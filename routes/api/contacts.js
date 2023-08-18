const express = require("express");
const {
  validateData,
  validateStatusData,
} = require("../../middlewares/validateData");
const { validateToken } = require("../../middlewares/validateToken");

const {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controlers/contacts");

const router = express.Router();

router.get("/", validateToken, getAllContacts);

router.get("/:contactId", validateToken, getContactById);

router.post("/", validateToken, validateData, addContact);

router.delete("/:contactId", validateToken, removeContact);

router.put("/:contactId", validateToken, validateData, updateContact);

router.patch(
  "/:contactId/favorite",
  validateToken,
  validateStatusData,
  updateStatusContact
);

module.exports = router;
