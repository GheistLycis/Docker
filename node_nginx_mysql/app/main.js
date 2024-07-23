const { DB_CONTAINER_NAME, DB_USER, DB_PWD, DB_NAME, DB_PORT } = process.env
const express = require('express')
const mysql = require('mysql2')

const app = express()
const db_conn = mysql.createConnection({
  host: DB_CONTAINER_NAME,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME
})
let db_names = []

db_conn.connect(err => {
  if(err) {
    console.error(`FAILED TO CONNECT TO DATABASE: ${err.stack}`) 
    console.error(
      `ENV VARS: ${JSON.stringify({ DB_CONTAINER_NAME, DB_USER, DB_PWD, DB_NAME, DB_PORT })}`
    ) 
    return
  } 

  db_conn.query(
    'SELECT name FROM people',
    (_, res) => db_names = res.map(({ name }) => name)
  )
})

app.get('/', (_, res) => {
  try {
    db_conn.query(
      `INSERT INTO people(name) VALUES ('Bruno ${db_names.length+1}')`, 
      () => {
        db_names.push(`Bruno ${db_names.length+1}`)

        res.send(`
          <h1>Full Cycle Rocks!</h1>
          <ul>
            ${db_names.reduce((acc, name) => acc += '<li>' + name + '</li>', '')}
          </ul>
        `)
      }
    )
  }
  catch(err) {
    res.status(500).send(err)
  }
})

app.listen(8080, () => console.log('SERVER UP!'))