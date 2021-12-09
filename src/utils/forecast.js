const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b92d7370320f5dd425d2e41a9e3e5a85/' + encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) +'?units=si'

    request({url, json: true, }, (error, {body}) => {
        if(error){
            callback('Unable To Connect To Weather-services!! Please Try Again Later', undefined)
        }else if(body.error){
            callback('Unable to Find location', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a '+  body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast