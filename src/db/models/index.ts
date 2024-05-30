import Notification from './Notification';
import Story from './Story';
import User from './User';
import Interest from './Interest';
import Profile from './Profile';
import Review from './Review';
import Friendship from './Friendship'
import Fanpage from './Fanpage';

// User Relationships
const userRelationships = () => {
  User.hasOne(Profile, {
    foreignKey: 'user_id'
  })
  User.hasMany(Notification, {
    foreignKey: 'user_id',
    as: 'notifications'
  });
  User.belongsToMany(Interest, {
    through: 'UserInterests',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
 
  User.belongsToMany(User, {
    through: 'Friendships',
    as: 'Friends',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })

  User.belongsToMany(User, {
    through: 'Friendships',
    as: 'UserFriends',
    foreignKey: 'friend_id',
    onDelete: 'CASCADE'
  })
};

// Profile Relationships
const profileRelationships = () => {
  Profile.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
    onDelete: 'CASCADE'
  });
};

// Interest Relationships
const interestRelationships = () => {
  Interest.belongsToMany(User, {
    through: 'UserInterests',
    foreignKey: 'interest_id',
    onDelete: 'CASCADE'
  });
};


// Notification Relationships
const notificationRelationships = () => {
  Notification.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};
// FanPage Relationships
const fanpageRelationships = () => {
  Fanpage.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });
}

// Story Relationships
const storyRelationships = () => {
  Story.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

export const setupModelRelationships = () => {
  userRelationships();
  notificationRelationships();
  storyRelationships();
  profileRelationships();
  interestRelationships();
  fanpageRelationships();
};

const models = { User,Friendship, Notification,  
  Story, Interest, Profile, Review, Fanpage };

export default models;
