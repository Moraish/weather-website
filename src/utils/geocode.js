const request = require('request')

const geoCode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9yYWlzaC1rYXBvb3IiLCJhIjoiY2p5bjZueG55MGFraDNubGZ0bmdmOWRjdiJ9.ad9C8wO2BmQ0E84bomOnrw&limit=1'
    request({url, json: true}, (error, {body}) => 
    {
        if(error)
        {
            callback('Unable to connect to location services.', undefined)
        }
        else if(body.features.length == 0)
        {
            callback('Location not found, try another search!', undefined)
        }
        else
        {
            callback(undefined, {
                placeName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
                
            })
        }

    })
}

module.exports = geoCode