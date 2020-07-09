const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine(
    '.hbs',
    exphbs({ defaultLayout: 'main', extname: '.hbs'})
)
app.set('view engine', '.hbs')


// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// var require= NodeRequire (id: String) => any

// Routes
//app.use('/', require('./routes/index'))


app.get('/', function (req, res) {
    res.send('Hello Haiku!')
})


//app.use('/haikuboard', require('./routes/index'))
app.get('/haikuboard', function (req, res) {
    res.send('Haiku Board!')
})

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)