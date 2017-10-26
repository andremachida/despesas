const lodash = require('lodash')
const Despesas = require('./despesas')

Despesas.methods(['get', 'post', 'put', 'delete'])
Despesas.updateOptions({new: true, runValidators: true})

Despesas.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  lodash.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

module.exports = Despesas
