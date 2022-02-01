import requests

post_url = 'http://localhost:8080'
d = {'user_id': 1,
    'comment': 'Nice place!',
    'review': 4,
    'checkIn': 'yes',
    'fav_id': 1}

chose = int(input("1. get ch_station\n2. review \n3. post ch_station\n4. get ch_station info\n5. get rand user\n6. start Charging\n7. end Charging\n8. login\n9. register\n input:"))
match(chose):
    case(1): res = requests.post(post_url + '/map', json= {'lat' : 38.32, 'lon' : 21.86, 'radious' : 13})
    case(2): res = requests.post(post_url + '/user/comment', json= {'comment': 'Nice place!', 'station_id': 1})
    case(3): res = requests.post(post_url + '/addCharger', json=  {'type' : 'Type 2', 'name': 'Tesla Supercharger', 'lat': 38.32447723, 'lon': 21.86919166, 'schedule': '24 hour', 'restrooms': 'no', 'cost': 0.0, 'kW': 22, 'quantity': 2, 'available': 2})
    case(4): res = requests.post(post_url + '/chStation/info', json=  {'chStation_id' : 1})
    case(5): res = requests.get(post_url + '/sim/getRandUser')
    case(6): res = requests.post(post_url + '/sim/startCharging', json=  {'type': 'CCS', 'chStation_id' : 1})
    case(7): res = requests.post(post_url + '/sim/endCharging', json=  {'type': 'CCS', 'chStation_id' : 1})
    case(8): res = requests.post(post_url + '/login', json= {'username' : 'demo_user4', 'password' : '1234'})
    case(9): res = requests.post(post_url + '/register', json= {'username' : 'demo_user5', 'password' : '1234', 'email' : 'demo_user5@ev.com'})

print(res.text)

