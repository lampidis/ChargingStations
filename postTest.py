import requests

post_url = 'http://localhost:3000'
d = {'user_id': 1,
    'comment': 'Nice place!',
    'review': 4,
    'checkIn': 'yes',
    'fav_id': 1}

chose = int(input("1. get ch_station\n2. review \n3. post ch_station\n4. get ch_station info\n5. get rand user\n input:"))
match(chose):
    case(1): res = requests.post(post_url + '/map', json= {'lat' : 38.32, 'lon' : 21.86, 'radious' : 0.1})
    case(2): res = requests.post(post_url + '/user/comment', data= {'comment': 'Nice place!', 'station_id': 1})
    case(3): res = requests.post(post_url + '/addCharger', json=  {'type' : 'Type 2', 'name': 'Tesla Supercharger', 'lat': 38.32447723, 'lon': 21.86919166, 'schedule': '24 hour', 'restrooms': 'no', 'cost': 0.0, 'kW': 22, 'quantity': 2, 'available': 2})
    case(4): res = requests.post(post_url + '/chStation/info', json=  {'chStation_id' : 1})
    case(5): res = requests.get(post_url + '/sim/getRandUser')

print(res.text)