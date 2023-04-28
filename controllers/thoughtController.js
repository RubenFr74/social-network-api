const { Thought, User } = require('../models');

const thoughtController = {
    async getThought(req, res) {
        try {
            const dbThoughtData = await Thought.find()
                .sort({ createdAt: -1 });

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.id })

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this user id!' });
            }
            res.json(dbThoughtData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        } 
    },
    async updateThought(req, res) {
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(dbThoughtData);
        console.log(err);
        res.status(500).json(err);
    },
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            const dbUserData = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this user id!' });
            }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;