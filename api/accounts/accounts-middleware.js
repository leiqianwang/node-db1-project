const AccountId = require('./accounts-model')
const db = require('../../data/db-config')


// const yup = require('yup');

// // Define a schema for the account payload using Yup
// const accountSchema = yup.object().shape({
//   name: yup.string().trim().min(3, 'name of account must be between 3 and 100').max(100).required('name and budget are required'),
//   budget: yup.number().required('name and budget are required').min(0, 'budget of account is too large or too small')
//   .max(1000000, 'budget of account is too large or too small'),
// });


exports.checkAccountPayload = (req, res, next) => {
  
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  // 400 with if `req.body` is invalid:
//   accountSchema
//   .validate(req.body, { abortEarly: false, stripUnknown: true })
//     .then((validated) => {
//       req.body = validated; // Update req.body to the validated (and possibly coerced) values
//       next();
//     })
//     .catch((err) => {
//       // Custom error handling
//       const errors = err.inner.reduce((acc, currentError) => {
//         // Assuming your tests require a specific format or handling based on field
//         acc[currentError.path] = currentError.errors[0]; // Taking the first error message for each field
//         return acc;
//       }, {});

//       // Respond with a 400 status code and the aggregated errors
//       res.status(400).json(errors);
//     });
// };

const error = {status: 400};
let {name, budget} = req.body;

// Trim the name field if it's not undefined
if (typeof name === 'string') {
  name = name.trim();
}

if(name === undefined || budget === undefined ) { // If either name or budget are undefined
  error.message = "name and budget are required";
} else if (typeof name !== 'string') { // If name is not a string
  error.message = "name of account must be a string";
} else if(name.length < 3 || name.length > 100) { // Check length after trimming
  error.message = "name of account must be between 3 and 100";
} else if(typeof budget !== 'number' || isNaN(budget)) { // If budget is not a number
  error.message = "budget of account must be a number";
} else if(budget < 0 || budget > 1000000) { // If budget is out of range
  error.message = "budget of account is too large or too small";
}

if(error.message) {
  res.status(400).json({ message: error.message });
} else {
  // Update req.body.name with the trimmed name
  req.body.name = name;
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
    res.status(400).json({
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


