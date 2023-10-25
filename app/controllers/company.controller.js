
const ethers = require('ethers');
const {
    company,
    user
   } = require('../models');

const { asynchandler } = require('../utils/asyncHandler');

const { getKey } = require('../utils/getKeys');
const { HttpException } = require('../errors/HttpException')
const { validateCreateCompany,
    validateUpdateCompany,
    validateCreateAdmin, 
    validateUpdateUser} = require('../validators/user.validators');
    



module.exports.createCompany = asynchandler(async (req, res) => {
    const { error } = validateCreateCompany(req.body);
    if (error) {
        throw new HttpException(400, error.details[0].message);
    }
        const wallet = ethers.Wallet.createRandom();
        const pr = wallet.privateKey;
        const publicKey = wallet.signingKey.publicKey;
        const companyDetails = req.body;

        companyDetails.publicKey = publicKey;
        companyDetails.superadmin_id = req.user.id;

        const existingCompany = await company.findOne({
            where: {
                superadmin_id: req.user.id,
                company_name: companyDetails.company_name,
            },
        });

        if (existingCompany) {
            throw new HttpException(400, 'A company with the same attributes already exists');
        }

        const company_Details = await company.create(companyDetails);
        res.status(201).json({ message: company_Details, company_private_key: pr });
    
});




module.exports.updateCompany = asynchandler(async (req, res) => {
    const { error } = validateUpdateCompany(req.body);
    if (error) {
        throw new HttpException(400, error.details[0].message);
    }
        const companyData = req.body;
        const pr = req.body.company_private_key;
        const wallet = new ethers.Wallet(pr);
        const pb = wallet.signingKey.publicKey;

        const existingCompany = await company.findOne({ where: { publicKey: pb } });

        if (!existingCompany) {
            throw new HttpException(404, 'Company does not exist');
        }

        if (companyData.company_name) {
            existingCompany.company_name = companyData.company_name;
        }
        if (companyData.company_email) {
            existingCompany.company_email = companyData.company_email;
        }
        if (companyData.company_address) {
            existingCompany.company_address = companyData.company_address;
        }
        if (companyData.company_logo) {
            existingCompany.company_logo = companyData.company_logo;
        }
        if (companyData.company_description) {
            existingCompany.company_description = companyData.company_description;
        }

        const company_Details = await existingCompany.save();
        res.status(200).json({ Data: company_Details, message: 'Company updated successfully' });
    
});




module.exports.createAdmin=asynchandler(async(req, res) => {
    const { error } = validateCreateAdmin(req.body);
    if (error) {
        throw new HttpException(400, error.details[0].message);
    }
        const wallet = ethers.Wallet.createRandom();
        const pr = wallet.privateKey;
        const publicKey = wallet.signingKey.publicKey;
        const admin_details = req.body;
        admin_details.publicKey = publicKey;
        admin_details.role='admin',
        admin_details.created_by = req.user.id;
        const companyID = req.body.company_id;

        const existingCompany = await company.findOne({ where: { id: companyID } });
        if (!existingCompany) {
            throw new HttpException(404, 'Company does not exist');
        }

        const existingAdmin = await user.findOne({
            where: {
                email: admin_details.email,
            },
        });

        if (existingAdmin) {
            throw new HttpException(400, 'An admin with the same attributes already exists.');
        }

        const Admin_Details = await user.create(admin_details);
        res.status(201).json({ message: Admin_Details, private_key: pr });

    }

)




module.exports.updateAdmin = asynchandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error)
        throw new HttpException(400, error.details[0].message);
        const admin_detail = req.body;
        const pr = req.body.user_private_key;
        const wallet = new ethers.Wallet(pr);
        const pb = wallet.signingKey.publicKey;
      

        const existingAdmin = await user.findOne({ where: { publicKey: pb } });
        if (!existingAdmin) {
            throw new HttpException(404, 'Admin does not exist');
        }

       
      
        if (admin_detail.name) {
            existingAdmin.name = admin_detail.name;
        }
        
    if (admin_detail.email) {
        const Admin = await user.findOne({
            where: {
                email: admin_detail.email,
            },
        });

        if (Admin) {
            throw new HttpException(400, "An admin with the same Email's ID already exists.");
        }

            existingAdmin.email = admin_detail.email;
        }
    if (admin_detail.company_id) {
            
        const existingCompany = await company.findOne({ where: { id:admin_detail.company_id} });
        if (!existingCompany) {
            throw new HttpException(404, 'Company does not exist');
        }
            existingAdmin.company_id = admin_detail.company_id;
        }

        if (admin_detail.role) {
            existingAdmin.role = admin_detail.role;
        }
       

        const Admin_Details = await existingAdmin.save();
        res.status(200).json({ message: Admin_Details, Admin_private_key: pr });
   
});
 



module.exports.findAllAdmin = asynchandler(async (req, res, next) => {

        const list = await user.findAll({ where: { role: 'admin' } });
        if (list.length === 0) {
            throw new HttpException(404, 'No administrators found');
        }
        res.status(200).json({ msg: list });

});




module.exports.deleteCompany = asynchandler(async(req, res) => {
    const user_id = req.params.id;
    const obj = getKey(req,res);
    console.log(obj);
})