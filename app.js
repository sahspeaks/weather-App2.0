require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY=process.env.API_KEY;
app.get("/", function (req, res) {
    res.render("home")
});

app.post("/weather", function (req, res) {

    const cityName=req.body.city;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY+"&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            //console.log(weatherData);
            const temp=weatherData.main.temp;
            const temp_min=weatherData.main.temp_min;
            const temp_max=weatherData.main.temp_max;
            const city=weatherData.name;
            const country=weatherData.sys.country;
            const weatherStatus=weatherData.weather[0].main;
            
            res.render("weather",{
            temp:weatherData.main.temp,
            temp_min:weatherData.main.temp_min,
            temp_max:weatherData.main.temp_max,
            city:weatherData.name,
            country:weatherData.sys.country,
            status:weatherData.weather[0].main
            });
        });
    });

});


let port =process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
