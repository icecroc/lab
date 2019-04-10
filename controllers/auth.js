const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
        fName: candidate.fName,
        lName: candidate.lName,
        perms: candidate.perms
      }, keys.jwt, {expiresIn: 60 * 60 * 12})
      res.status(200).json({
        token: `Bearer ${token}`,
        perms: candidate.perms,
        email: candidate.email
      })
      //console.log(candidate.email, candidate.password, candidate.fName, candidate.lName, candidate.perms)
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Пароли не совпадают. Попробуйте снова.'
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'Пользователь с таким login не найден.'
    })
  }
}


module.exports.register = async function(req, res) {
  // email password
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такой login уже занят. Попробуйте другой.'
    })
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      fName: req.body.fName,
      lName: req.body.lName,
      perms: req.body.perms
    })

    try {
      await user.save()
      res.status(201).json(user)
      console.log(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}

module.exports.changePass = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {

    }
  }
}

