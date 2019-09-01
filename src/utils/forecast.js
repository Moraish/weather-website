const request = require('request')

const forecast = (longitude, latitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/6a87fa0d189dbbcc681be800260429fd/' + longitude + ',' + latitude + '?units=si&exclude=[minutely,hourly,alerts,flags]'
    request({url, json: true},  (error, {body}) =>
    {
        if(error)
        {
            callback('Unable to connect to the weather service!',undefined)
        }
        else if(body.error)
        {
            callback('Could not find location!', undefined)
        }
        else
        {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                preciProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast