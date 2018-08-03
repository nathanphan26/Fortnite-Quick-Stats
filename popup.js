const url = 'https://api.fortnitetracker.com/v1/profile/pc/daddy%20natty';
const params = {
  headers:{
    "trn-api-key": "e4060f2a-df44-45a7-8ca5-3938e2c2a631"
  },
  method: "GET"
};

fetch(url,params)
  .then(data=>{return data.json()})
  .then(res=>{console.log(res)});
