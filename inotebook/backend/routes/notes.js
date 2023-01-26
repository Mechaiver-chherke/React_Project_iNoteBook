const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//ROUTE 1: Get Notes Details using GET"/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});
//ROUTE 2: add a new Notes Details using POST"/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please Enter Valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
//ROUTE 3: add a new Notes Details using put"/api/notes/updatenote" login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tags } = req.body;
  // create new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    //find the note to be updated
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).send("Not Found");
    }
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowd");
    }
    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//ROUTE 4: add a new Notes Details using DELETE"/api/notes/deletenote" login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tags } = req.body;
  //Find a Note To be delete
  try {
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).send("Not Found");
    }
    //allow the user
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowd");
    }
    (notes = await Notes.findByIdAndDelete(req.params.id)),
      res.json({ Success: "Note Has Been Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});
module.exports = router;
