#### Routes ####
## Get Routes
/evs
Reply -> {car_id, car_company, model, type}

## Post Routes
res = requests.post(post_url, data= {'name', value})


/map 
data= {'lat' : float, 'lon' : float, 'radious' : float}
Reply -> {ChStations : {station_id, status, lat, lon}}

/user/info
data= {user_id: int}
Reply -> {user_id, username, mail, fav_companies, fav_stations}

/station/info
data= {station_id: int}
Reply -> {station_id, latitude, longitude, notes, schedule, weather, nearby_restrooms, photos_rep}
Reply -> {}

/company/info
data= {company_id: int}
Reply -> {company_id, name}


/user/comment
data= {user_id: int, comment: string}
Reply -> {Success: boolean}

/user/checkIn
data= {user_id: int, station_id: int}
Reply -> {Success: boolean}

/user/review
data= {user_id: int, review: int[1-5]}
Reply -> {Success: boolean}

/user/favorite/station
data= {user_id: int, station_id: int}
Reply -> {Success: boolean}

/user/favorite/company
data= {user_id: int, company_id: int}
Reply -> {Success: boolean}





To start the server local run the start.js script with 
- npm run debug