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

const updateById = (id, account) => {
  // DO YOUR MAGIC
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
