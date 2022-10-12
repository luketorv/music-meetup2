const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const axios = require("axios")
const { User, Comment, FeaturedSong } = require('../models');
const { findByIdAndUpdate } = require('../models/Comment');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('comments')
              .populate('friends');
        
            return userData;
          }
          throw new AuthenticationError('Not Logged In')
        },

        comments: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Comment.find(params).sort({ createdAt: -1 });
        },
        comment: async (parent, { _id }) => {
            return Comment.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('comments');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('comments');
        },
        youtube: async () => {
            const song = await FeaturedSong.find({})
            const lastDate = song[0].today
            console.log("youtube", song)
            if (lastDate == (new Date()).toLocaleDateString) {
              const recentSongs = song[0].songList
              return recentSongs[recentSongs.length-1]
            } else {
              const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.youtube_apikey}&part=snippet,contentDetails,statistics&videoCategoryId=10&regionCode=US`)
              const musicVideoNumber = Math.floor(Math.random() * 5)
              const randomVideo = data.items[musicVideoNumber]
              await FeaturedSong.findByIdAndUpdate(song[0]._id, {
                $push: {
                  songList: randomVideo.id
                },
                today: (new Date()).toLocaleDateString()
              })
              return randomVideo.id
            }
            
            
          },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addComment: async (parent, args, context) => {
            if (context.user) {
              const comment = await Comment.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { comments: comment._id } },
                { new: true }
              );
          
              return comment;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, { commentId, reactionBody }, context) => {
            if (context.user) {
              const updatedComment = await Comment.findOneAndUpdate(
                { _id: commentId },
                { $push: { reactions: { reactionBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedComment;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }

      }
};

module.exports = resolvers;