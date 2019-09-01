const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const port = process.env.PORT || 3000

const app = express()
// define paths for express config
const htmlDirPath = path.join(__dirname,  "../public")
const viewsPath = path.join(__dirname, '/templates/views')
const hbsPath = path.join(__dirname, '/templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

// setup config for handlebars and views locaion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(hbsPath)

//setup static directory to serve
app.use(express.static(htmlDirPath))


app.get('', (req, res) =>
{
    res.render('index', {
        title: "Weather App",
        name: "Moraish Kapoor"
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About me',
        name: 'Moraish Kapoor'
    })
})

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help Page',
        name: 'Moraish Kapoor',
        message: 'Only god can help you!'
    })
})


app.get('/weather', (req,res) => 
{

    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geoCode(address, (error, {latitude, longitude, placeName} = {}) =>
{
    if(error)
    {
        res.send({
            error: 'Unable to connect to Internet'
        })
    }
    else
    {
        forecast(latitude, longitude, (error, forecastResponse) => 
        {   
            console.log(forecastResponse)
            if(error)
            {
                res.send({
                    error: 'Unable to access the weather service'
                })
            }
            else
            {
                res.send({
                    placeName: placeName,
                    summary: forecastResponse.summary,
                    temperature: forecastResponse.temperature,
                    preciProbability: forecastResponse.preciProbability
                })
                console.log(forecastResponse.summery)
            }
        })
    }
    
})



})

app.get('/help/*', (req, res) =>
{
    res.render('404', {
        title: '404',
        error: 'Help article not found.',
        name: 'Moraish Kapoor'
    })
})

app.get('*', (req,res) =>
{
    res.render('404', {
        title: '404',
        error: 'Page Not Found!',
        name: 'Moraish Kapoor'
    })
})

app.listen(port, () =>
{
    console.log("Server Up!")
})




//C:\Users\Moraish\Desktop\nodeProject\web-server\src\app.js