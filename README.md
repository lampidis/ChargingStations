#### Routes ####
## 
--------------------
-----Get Routes-----
/home
Cheching if server works

/evs
Reply -> {car_id, car_company, model, type}

## 
---------------------
-----Post Routes-----
res = requests.post(post_url, data= {'name', value})

-------------info
/map 
data= {'lat' : float, 'lon' : float, 'radious' : float}
Reply -> {ChStations : [{station_id, name, latitude, longitude, schedule, nearby_restrooms, total, available}]}

/user/info
data= {user_id: int}
Reply -> {user_id, username, mail, fav_companies, fav_stations}

/station/info
data= {station_id: int}
Reply -> {station_id, latitude, longitude, notes, schedule, weather, nearby_restrooms, photos_rep, chargers[charger_id, status, cost, kW, quantity, available, type]}

/company/info
data= {company_id: int}
Reply -> {company_id, name}

-------------user
/user/comment
data= {user_id: int, comment: string}
Reply -> {Reply: Success}

/user/checkIn
data= {user_id: int, station_id: int}
Reply -> {Reply: Success}

/user/review
data= {user_id: int, review: int[1-5]}
Reply -> {Reply: Success}

/user/favorite/station
data= {user_id: int, station_id: int}
Reply -> {Reply: Success}

/user/favorite/company
data= {user_id: int, company_id: int}
Reply -> {Reply: Success}


-------------add to database
/addCharger
data= {type, name, lat, lon, schedule, restrooms, cost, kW, quantity, available}
Reply -> {Reply: charger added}
// adds ch_station, ch_type also if needed



-------------for station simulator
/sim/getRandUser
Reply -> {user_id}

/sim/startCharging
data = {type, chStation_id}
Reply -> {charger in use}

/sim/endCharging
data = {type, chStation_id}
Reply -> {charger freed}


To start the server local run the start.js script with 
- npm run debug