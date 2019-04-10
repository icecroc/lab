const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// (get) localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function(req, res) {
  const query = {
    //user: req.user.id
    orderStatus: "Открыта"
  }

  // Дата старта
  if (req.query.start) {
    query.date = {
      // Больше или равно
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }

    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  if (req.query.userName) {
    query.userName = req.query.userName
  }

  if (req.query.catName) {
    query.catName = req.query.catName
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getClosed = async function(req, res) {
  const query = {
    //user: req.user.id
    orderStatus: "Закрыта"
  }

  // Дата старта
  if (req.query.start) {
    query.date = {
      // Больше или равно
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }

    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  if (req.query.userName) {
    query.userName = req.query.userName
  }

  if (req.query.endUserName) {
    query.endUserName = req.query.endUserName
  }

  if (req.query.catName) {
    query.catName = req.query.catName
  }

  try {
    const orders = await Order
      .find(query)
      .sort({endDate: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getArchived = async function(req, res) {
  const query = {
    //user: req.user.id
    orderStatus: "Архивная"
  }

  // Дата старта
  if (req.query.start) {
    query.date = {
      // Больше или равно
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }

    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  if (req.query.userName) {
    query.userName = req.query.userName
  }

  if (req.query.endUserName) {
    query.endUserName = req.query.endUserName
  }

  if (req.query.catName) {
    query.catName = req.query.catName
  }

  try {
    const orders = await Order
      .find(query)
      .sort({endDate: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    const lastOrder = await Order
      .findOne({//user: req.user.id
      })
      .sort({date: -1})

    const maxOrder = lastOrder ? lastOrder.order : 0

    const order = await new Order({
      catName: req.body.catName,
      name: req.body.name,
      list: req.body.list,
      user: req.user,
      userName: req.user.email,
      order: maxOrder + 1
    }).save()

    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Order.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Заявка удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    endDate : Date.now(),
    endUserName : req.user.email,
    list : req.body.order.list,
    orderStatus: req.body.status
  }

  try {
    const order = await Order.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true})
      res.status(200).json(order)
      console.log(req.body)
  } catch (e) {
    errorHandler(res, e)
  }
}

