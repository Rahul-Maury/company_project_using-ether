
const ethers = require('ethers');
const { 
    user,
    company
   } = require('../models');

const generateToken = require('../utils/getJwtToken');
const { asynchandler } = require('../utils/asyncHandler');


const { HttpException } = require('../errors/HttpException');
const { validateSignUp, userLoginValidation, validateUpdateUser, validateCreateUser } = require("../validators/user.validators");

module.exports.userRegister = asynchandler(async (req, res, next) => {
    const data = req.body;
    const {error} = validateSignUp(data);
   // const { error } = validateCreateBot(body);
    if (error) throw new HttpException(400, error.details[0].message);


    const { name, email, company_id, created_by } = data;
     const role='superadmin'
    const wallet = ethers.Wallet.createRandom();
    const pr = wallet.privateKey;
    const publicKey = wallet.signingKey.publicKey;
    const newUserData = { name, email, role, company_id, created_by, publicKey };
    const User = await user.create(newUserData);
    res.status(201).json({ msg: User, privateKey: pr });
    
}
)
module.exports.loginUser = asynchandler(async (req, res) => {    
    
    const { error } = userLoginValidation(req.body);
     
    if (error) throw new HttpException(400, error.details[0].message);
    const pr = req.body.user_private_key; 
    const wallet = new ethers.Wallet(pr);
    const pb = wallet.signingKey.publicKey;   
    const User = await user.findOne({ where: { publicKey: pb } });   
    if (!User) {
      
        throw new HttpException(404, "user not  found");
    }
         
    if (User.publicKey === pb) {
        const token = generateToken(User);
        return res.cookie('token', token).json({ msg: "User logged In" ,Token:token});
        
    }
}
)



module.exports.logOutUser = (req, res) => {
    res.clearCookie('token').json({ msg: "you are log out" });
}





module.exports.createUser = asynchandler(async (req, res) => {
    const { error } = validateCreateUser(req.body);
    if (error)
        throw new HttpException(400, error.details[0].message);
    const wallet = ethers.Wallet.createRandom();
    const pr = wallet.privateKey;
    const publicKey = wallet.signingKey.publicKey;
    const User = req.body;
          User.role = 'employee';
    
    User.publicKey = publicKey;
    const companyID = req.user.company_id;
  

    const existingCompany = await company.findOne({ where: { id: companyID } });
    if (!existingCompany) {
        throw new HttpException(404, 'Company does not exist');
    }
    User.company_id = companyID;
    User.created_by = req.user.id;
    
    const user_Details = await user.create(User);
    res.status(200).json({ message: user_Details, "employee_private_key": pr });


}
)

module.exports.updateUser = asynchandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
        throw new HttpException(400, error.details[0].message);
    }
        const empkey = req.body.user_private_key; 
    
        const wallet = new ethers.Wallet(empkey);
        const pb = wallet.signingKey.publicKey;
        const User = req.body;   
    
        const existingUser = await user.findOne({ where: { publicKey:pb} });
        
        if (!existingUser||existingUser.role!=='employee') {
            return res.status(404).json({ message: "Please provide Employee's Private Key." });
            
        }        
        if (User.first_name) {
            existingUser.first_name = User.first_name;
        }
        if (User.middle_name) {
            existingUser.middle_name = User.middle_name;
        }
        if (User.last_name) {
            existingUser.last_name = User.last_name;
        }
        if (User.email) {
           const userVal= await user.findOne({
                      where: {
                          email: User.email
                        },});
      
          if (userVal) {
            return res.status(400).json({ "message": "A User with the same Email's ID already exists." });
          }
        
            existingUser.email = User.email;
        }
        if (User.company_id&&req.user.role==='admin') {
            existingUser.company_id = User.company_id;
        }
        if (User.role && req.user.role === 'admin') {
            existingUser.role = User.role;
        }
       
       
        const updated_Details = await existingUser.update(existingUser);
       
        res.status(200).json({ message:"Employee updated successfully" });
        
        updated_Details.save();
      

  
    
})

module.exports.deleteUser = asynchandler(async(req, res) => {
 
        const user_id = req.params.id;
        const existingUser = await user.findOne({ where: { id: user_id } });
        if (!existingUser) {
            return res.status(404).json({ "message": "User not exists." });
        }
         await user.destroy({
            where: { id: user_id },
          })
          res.status(204).json({ "message":"Content status on successful deletion" });        
        
    
    
})


module.exports.findAllUser = asynchandler(async (req, res) => {
 
        const companyID= req.user.company_id;
    const User = await user.findAll({ where: { company_id: companyID, role:"employee"}});
        if (User) {
            res.status(200).json({"message": 'Users List', "data": User });
        }
       else {
        res.status(404).json({ status: 'error', message: 'User List not found' });
        }
   
})
module.exports.findUserById= asynchandler(async (req, res) => {
  
    const user_id = req.params.id;
    const User = await user.findByPk(user_id);
   
    if (User) {
         res.status(200).json({"message": 'User found', "data": User });
    } else {
        
        //res.status(404).json({ status: 'error', message: 'User not found' });
        throw new HttpException(404, "User Not found");
    }
 
})


