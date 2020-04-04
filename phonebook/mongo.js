const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://patriciobo:${password}@cluster0-maijc.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  console.log('Phonebook:');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`\n${person.name} ${person.number}`);
    })
    mongoose.connection.close();
  })
}
else{

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log(`Added ${person.name} to the phonebook`)
    mongoose.connection.close()
  })
}



