const UserModel = require('../models/User'); 

const findAllUsers = async (req, res, next) => {
  try {
    // Find all users
    const { page = 1, limit = 3 } = req.query;
    const options = {
      page,
      limit
    };

    const users = await UserModel.paginate({}, options);

    if (!users) return res.status(503).send('Service Unavailable');

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const findUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if(!userId) return res.status(403).send('Bad request');

    // Find user by id
    const user = await UserModel.findOne({ _id: userId });

    if (!user) return res.status(503).send('Service Unavailable');

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const createUser = async (req, res) => {
  try {
    if(!req.body) return res.status(403).send('Bad request');

    const user = await UserModel.create(req.body);

    if(!user) return res.status(503).send('Service Unavailable');

    return res.status(200).send(user);
  } catch (error) {
    console.log("🚀 ~ file: userController.js ~ line 42 ~ createUser ~ error", error);
    return res.status(500).send('Internal server error');
  }
}

const updateUser = async ( req, res ) => {
  try {
    const { userId } = req.params;
    if(!userId || !req.body) return res.status(403).send('Bad request');

    // Find user by id
    const user = await UserModel.findByIdAndUpdate(userId, req.body);

    if (!user) return res.status(503).send('Service Unavailable');

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if(!userId) return res.status(403).send('Bad request');

    // Find user by id
    const user = await UserModel.findByIdAndRemove(userId);

    if (!user) return res.status(503).send('Service Unavailable');

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const searchUser = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("🚀 ~ file: userController.js ~ line 82 ~ searchUser ~ req.query", req.query)


    const condition = {
      $or:[
        {name: {$regex: query, $options: 'i'} }, // regular expression flag
        {email: {$regex: query, $options: 'i'} }
      ]
    };

    const users = await UserModel.find(condition);

    return res.status(200).send(users);
  } catch (error) {
    console.log("🚀 ~ file: userController.js ~ line 93 ~ searchUser ~ error", error)
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser
}

