const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlzaGFudDM1MTEiLCJhIjoiY2t3ZmZ5cHBmMGNkczJvbnZvd2JvZDI1eSJ9.mtj24RJ_hSb22P_pW6fxDA&limit=1'

    request({url, json:true, }, (error, {body}) => {
        if (error) {
            callback('Unable To Connect To Location-Services !!', undefined)
        }else if (body.features.length === 0) {
            callback('Unable To Find the Location', undefined)
        }else{
            callback(undefined, {
                 latitude : body.features[0].center[1], 
                 longitude : body.features[0].center[0], 
                 location : body.features[0].place_name, 
            })
        }
    })
}

module.exports = geocode
