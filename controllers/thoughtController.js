const { User, Thoughts } = require('../models');

const userController = {
    async getUsers(req, res) {
        try {
            const dbUserData = await User.find()
                .select('-__v')
                
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //Gets a single user by id
    async getSingleUser(req,res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.id })
                .populate('friends')
                .populate('thoughts')
                .select('-__v');
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //Creates a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //Updates a user by id
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: req.body,
                },
                {
                    runValidators: true,
                    new: true,
                }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //Deletes a user by id
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.id })
            if (!dbUserData) { 
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            await Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
            res.json({ message: 'User and their thoughts deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },  
async addFriend(req, res) {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
async removeFriend(req, res) {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true });

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
};
module.exports = userController;