import requests

post_url = 'http://localhost:3000'
d = {'user_id': 1,
    'comment': 'Nice place!',
    'review': 4,
    'checkIn': 'yes',
    'fav_id': 1}

chose = int(input("1. get ch_station\n2. review \n3. post ch_station\n input:"))
match(chose):
    case(1): res = requests.post(post_url + '/map', data= {'lat' : 38.25, 'lon' : 21.74, 'radious' : 0.01})
    case(2): res = requests.post(post_url + '/user/comment', data= {'comment': 'Nice place!', 'station_id': 1})
    case(3): res = requests.post(post_url + '/addCharger', json=  {'type' : 'CCS', 'name': 'Tesla Supercharger', 'lat': 38.32447723, 'lon': 21.86919166, 'schedule': '24 hour', 'restrooms': 'no', 'cost': 0.0, 'kW': 250, 'quantity': 4})


print(res.text)