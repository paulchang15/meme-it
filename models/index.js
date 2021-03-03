const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");
const Vote = require("./Vote");
const Image = require("./Image");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

// Vote Associations
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

// Image associations
User.hasOne(Image, {
  // Cant User hasMany Image here?
  foreignKey: "user_id",
});

Post.hasOne(Image, {
  foreignKey: "post_id",
});
// add belongs to associations
Image.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

Image.belongsTo(User, {
  through: "user_id",
  onDelete: "SET NULL",
});

module.exports = { User, Post, Comment, Vote, Image };
