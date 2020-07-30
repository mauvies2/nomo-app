const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

router.get("/", (req, res) => {
  Contact.find({})
    .then((contacts) => res.status(200).json(contacts))
    .catch((err) => console.log(err));
});

router.post("/", async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;

  const newContact = await new Contact({
    firstName,
    lastName,
    phoneNumber,
    email,
  });
  Contact.findOne({ email })
    .then((contact) =>
      contact
        ? res.status(200).json("Email is already registered")
        : newContact
            .save()
            .then(() => res.status(200).json("Contact Added!"))
            .catch((err) =>
              res
                .status(500)
                .json("Server internal error and contact could not be added")
            )
    )
    .catch((err) => res.status(500).json("Server internal error", err));
});

router.delete("/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((contacts) => res.status(200).json(contacts))
    .catch((err) => console.log(err));
});

router.put("/:id", async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  Contact.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      phoneNumber,
      email,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
