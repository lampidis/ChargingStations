import requests

post_url = 'http://localhost:3000'
d = {'user_id': 1,
    'comment': 'Nice place!',
    'review': 4,
    'checkIn': 'yes',
    'fav_id': 1}

chose = int(input("1. ch_station\n2. review \n input:"))
match(chose):
    case(1): res = requests.post(post_url + '/map', data= {'lat' : 38.25, 'lon' : 21.74, 'radious' : 0.01})
    case(2): res = requests.post(post_url + '/user/comment', data= {'comment': 'Nice place!', 'station_id': 1})


print(res.text)