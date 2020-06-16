import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';

const app = express();
const apiKey = 'your-API-key';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('weather', {
    weather: null, 
    error: null
  });
});

/** @desc your-unit-here
 * Fill the units with the standard unit you're using.
 * Ex: Metric (km) or Imperial (mil)'
 * */ 


app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `
  http://api.openweathermap.org/data/2.5/weather?q=
  ${
    city
  }
  &units=your-unit-here
  &appid=${
    apiKey
  }`;

  request(url, (err, response, body) => {
    if(err){
      res.render('weather', {
        weather: null, 
        error: 'Error, please try again'
      });
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('weather', {
          weather: null, 
          error: 'Error, please try again'
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('weather', {
          weather: weatherText, 
          error: null
        });
      };
    };
  });
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('initialized in 3000!');
});