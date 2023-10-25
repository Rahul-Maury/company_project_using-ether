const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware')
const { isSuperAdmin } = require('../middlewares/authorized.middleware');
const {
    createAdmin,
    updateAdmin,
    deleteAdmin,
    findAllAdmin,
    findAdmin,
    createCompany,
    updateCompany,
    deleteCompany
     } = require('../controllers/company.controller');



router.route('/delete/:id').delete(deleteCompany);

 router.route('/superAdmin/findAllAdmin').get(auth, isSuperAdmin, findAllAdmin);
 router.route('/superAdmin/createAdmin').post(auth, isSuperAdmin, createAdmin);

router.route('/superAdmin/updateAdmin').put(auth, isSuperAdmin, updateAdmin)

 router.route('/superAdmin/createCompany').post(auth,isSuperAdmin,createCompany);

router.route('/superAdmin/updateCompany').put(auth, isSuperAdmin, updateCompany);
module.exports = router;
