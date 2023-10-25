const express = require('express');
const app = express();
// const { companyModel } = require('../../config/db');
const {company}=require('../models')
function isSuperAdmin(req, res, next) {
 
    const user = req.user;
   
        if (user.role === 'superadmin') {
            next();
        }
       
        else {
            res.status(403).json({ "message": "permission Denied" });
        }
      
   
}

function isCompanyAdmin(req, res, next) {
    const user = req.user;
    const company_id = req.user.company_id;
    if (user.role === 'admin' && sepecificCpmAdmin(company_id)) {
        next();
    }
    else {
        res.status(403).json({ "message": "permission Denied" });
    }
}
function isCompanyAdminOrEmp(req, res, next) {
    const user = req.user;
    const company_id = req.user.company_id;
    if ((user.role === 'admin'||user.role==='emp') && sepecificCpmAdmin(company_id)) {
        next();
    }
    else {
        res.status(403).json({ "message": "permission Denied" });
    }
}
async function sepecificCpmAdmin(companyID) {

    const existingCompany = await company.findOne({ where: {id: companyID } });
    if (!existingCompany) {
        // return res.status(404).json({ "message": "company not exist" });
        return false;
    }
    return true;
}
module.exports = { isSuperAdmin, isCompanyAdmin ,isCompanyAdminOrEmp};