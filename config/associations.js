const {Post} = require('./../models/post');
const {Photo} = require('./../models/photo');

Post.hasMany(Photo);
Photo.belongsTo(Post);