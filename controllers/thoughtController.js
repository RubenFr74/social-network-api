const { User, Thought } = require("../models");

module.exports = {
    // Get all thoughts
    getThought(req, res) {
      Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // gets a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select("-__v")
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No Thought find with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    //create a thought and push the created thought's _id to the associated user's thoughts array field
    createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },







































};