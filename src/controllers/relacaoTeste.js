
const ActivePrinciple = require('../model/ActivePrinciple')
const TherapeuticClass = require('../model/TherapeuticClass')
const Medicine = require('../model/Medicine')

ActivePrinciple.create({
    name: "My super company"
  })
  .then((active_principle) => {
    // The get() function allows you to recover only the DataValues of the object
    console.log(active_principle.get())
  })
  .catch((err) => {
    console.log("Error while principio_ativo creation : ", err)
  })

  TherapeuticClass.bulkCreate([
    {name: 'Analgésico'},
    {name: 'Antipirético'},
    {name: 'Anti-inflamatório'},
  ])
  .then((newTherapeuticClass) => {
    console.log(newTherapeuticClass)
  })
  .catch((err) => {
    console.log("Error while therapeutic_class creation : ", err)
  })