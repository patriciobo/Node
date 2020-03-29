const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

const getId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Phonebook API!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`<h4>Phonebook has info for ${persons.length} people </h4> \n <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    res.json(person)
  }
  else{
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'Name missing' 
    })
  }

  if (!body.number) {
    return res.status(400).json({ 
      error: 'Number missing' 
    })
  }

  if(persons.find(p => p.name === body.name)){
    return res.status(400).json({ 
      error: 'Name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getId()
  }

  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})