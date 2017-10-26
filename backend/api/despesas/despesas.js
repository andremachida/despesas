const restful = require('node-restful')
const mongoose = restful.mongoose

const credito = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min: 0, required: true }
})

const debito = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min: 0, required: true },
  situacao: { type: String, required: false, uppercase: true,
    enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

const despesas = new mongoose.Schema({
  mes: { type: Number, min: 1, max: 12, required: true },
  ano: { type: Number, min: 2000, required: true },
  creditos: [credito],
  debitos: [debito]
})

module.exports = restful.model('Despesas', despesas)
