const { User, Thought } = require("../models");

module.exports = {
    // Get all thoughts
    getThought(req, res) {
      Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    }, 







































};