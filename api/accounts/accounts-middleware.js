const AccountId = require('./accounts-model')
const db = require('../../data/db-config')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  // 400 with if `req.body` is invalid:

  const error = {status: 400};
  const {name, budget} = req.body;
   if(name === undefined || budget === undefined ) { //If either name or budget are undefined, return `{ message: "name and budget are required" }`
   error.message = "name and budget are required";
   }else if (typeof name !== 'string') {
    error.message = "name of account must be a string";
   }else if(name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100"
   }else if(typeof budget !== 'number' || isNaN(budget)) { 
     //- If budget is not able to be converted into a number, return `{ message: "budget of account must be a number" }`
       error.message = "budget of account must be a number";
   }else if(budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small"
   }

   if(error.message) {
    next(error);
   }else {
    next();
   }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
// console.log('checkAccountNameUnique middleware');
 //`checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` 
 //if the _trimmed_ `req.body.name` already exists in the database
 const accountName = req.body.name;
 try {
  const nameExist = await db('accounts').where('name', accountName.trim()).first();
  if(nameExist) {
    res.status(404).json({
      message: "that name is taken"
    })
 } else {
  next()
   } 
 }catch( err) {
  next(err);
 }
 

}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await AccountId.getById(req.params.id)
    if(account) {
     req.account = account;
     next();
    }else {
     next({ status: 404, message: "account not found"})
    }
   }catch(err) {
     next(err);
   }
   
}


