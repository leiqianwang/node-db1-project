const db = require('../../data/db-config')


const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()
}

const create = async account => {
  // DO YOUR MAGIC
  //insert into accounts (name, budget) values ('wow', 10000)
  const [id] = await db('accounts').insert(account);
  return getById(id)

}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
 // Update the account where the id matches
 await db('accounts').where('id', id).update(account);
 // Return the updated account
 return getById(id); // Assuming getById is implemented to return a single account by id
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).del()
  //delete from account where id = 1
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
