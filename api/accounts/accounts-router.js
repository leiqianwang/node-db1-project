const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

const router = require('express').Router();
const Account = require('./accounts-model');


router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll();
    console.log(accounts); // Debugging output
    res.json(accounts);
} catch (err) {
 next(err);
}
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
       const account = await Account.getById(req.params.id)
       res.json(account)
  } catch (err) {
       next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create(req.body)
       res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
 
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.body);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }catch (err){
       next(err)
  }
})



router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    customMessage: 'Something went wrong inside the accounts router',
    message: err.message,
    stack: err.stack,
});

})

module.exports = router;
