const express = require('express');
const router = express.Router();
const auth=require('../middlewares/auth.middleware')
const { createUser,
    loginUser,
    updateUser,
    deleteUser,
    findAllUser,
    findUserById,
  
    logOutUser,

    userRegister } = require('../controllers/users.controller');
const { isCompanyAdmin } = require('../middlewares/authorized.middleware');
    
router.route('/user/signUp').post(userRegister);

router.route('/user/login').post(loginUser);

router.route('/user/logOut').get(auth, logOutUser);

router.route('/user/createUser').post(auth,isCompanyAdmin, createUser);

router.route('/user/updateUser').put(auth, isCompanyAdmin,updateUser);
 
router.route('/user/deleteUser/:id').delete(auth, isCompanyAdmin, deleteUser);

router.route('/user/findEmployee/:id').get(auth, isCompanyAdmin, findUserById);

 router.route('/user/findAllEmployee').get(auth,isCompanyAdmin,findAllUser);

module.exports = router;
