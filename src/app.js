const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define Paths for Express Config
const publiDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publiDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nishant Jakhar',

    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Nishant Jakhar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For the further Qurries mail to : ',
        title: 'Help',
        name: 'Nishant Jakhar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You did not provided an Address"
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
    
            if (error){
                return res.send({
                    error: error
                })
            }
    
            res.send({
                forecast: forecastData ,
                location: location,
                address: req.query.address,
        
            })
            
        })
    })

    
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term '
        })
    }



    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Nishant Jakhar',
        error: 'Help Article Not Found, Sorry!'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        name: 'Nishant Jakhar',
        error: '404 Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server Satered On Port ' + port)
})