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
const db_names = []

db_conn.connect(err => {
  if(err) {
    console.error(`FAILED TO CONNECT TO DATABASE: ${err.stack}`) 
    console.error(
      `ENV VARS: ${JSON.stringify({ DB_CONTAINER_NAME, DB_USER, DB_PWD, DB_NAME, DB_PORT })}`
    ) 
    return
  } 

  db_conn.query("INSERT INTO people(name) VALUES('Bruno')")
  db_conn.query(
    'SELECT name FROM people', 
    (_, res) => db_names.push(...res.map(({ name }) => name))
  )
  db_conn.end()
})

app.get('/', (_, res) => res.send(`
  <h1>Full Cycle Rocks!</h1>
  <ul>
    ${db_names.reduce((acc, el) => acc += '<li>' + el + '</li>', '')}
  </ul>
`))

app.listen(8080, () => console.log('SERVER UP!'))