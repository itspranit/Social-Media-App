const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        // console.log(req.cookies);
        // res.cookie('user_id', 25);

        // Fetch all posts
        // Populate the user for each post
        // Also populate each comment and the user who made that comment
        const posts = await Post.find({})
            .populate('user') // populate the user who created the post
            .populate({
                path: 'comments',
                populate: {
                    path: 'user' // populate the user of each comment
                }
            });

        // Fetch all users (for use in friend list or suggestions)
        const users = await User.find({});

        // Render the home page view with posts and all users
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.error('Error in home controller:', err);
        return res.status(500).send('Internal Server Error');
    }
};
