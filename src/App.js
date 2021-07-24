import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
function App() {
  console.log("started")
  let date = new Date();
  let time = date.toLocaleTimeString();
  let localdate = date.toLocaleDateString();
  let arrday = [
    "sunday",
    "monday",
    "tuesday",
    "thursday",
    "weddnesday",
    "friday",
    "saturday",
  ];
  let arrmonth = ["jan","feb","mar","apr","may","june","july","aug","sep","nov","dec"]
  let [day, month] = [arrday[date.getDay()], arrmonth[date.getMonth()]];
  let [timer, setTimer] = useState();

  const UpdateTime = () => {
    let date = new Date();
    time = date.toLocaleTimeString();
    setTimer(time);
  };
    setInterval(UpdateTime, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////

  const api ={
    key:"36094e4f5ad4dc323078617916db16b0",
    base:"http://api.openweathermap.org/data/2.5/"
  }
  
  const [query,setQuery]=useState("pune");
  const [weather,setWeather]=useState({});
  useEffect(()=>{
fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result.main);
        console.log(weather)
      }).catch((err)=>{console.log(err,"error in fetching data")});
  },[query]);

  return (
    <div className={weather ? ((weather.temp>30) ? "app warm" :"app"):"app"} >
      <div className="searchdiv">
      <input
      className="citySearch"
       type="search"
       placeholder="Enter city name"
       onChange={e=>setQuery(e.target.value)}
       value={query}
       />
      </div>
      
      {weather ? (
        <div className="box">
          <div className="inbox">
       <h1 className="same name">{query}</h1>
       <h2 className="same temperature">{Math.round(weather.temp)}&#176;C</h2>
       
       <h2 className="same pressure">Pressure:{weather.pressure}</h2>
       <h2 className="same humidity">Humidity:{weather.humidity}</h2>
       <h2 className="same macTemperature">Temp Max: {Math.round(weather.temp_max)}&#176;c | Temp Min: {Math.round(weather.temp_min)}&#176;C</h2>
       <div className="other">{localdate} | <span>{timer}</span>  </div>
       <div className="other">{day}  { month} </div>
       </div>
       </div>
      ):(
        <p className="errmsg">Please enter avalid city Name</p>
      )}
      
    </div>
  );
}

export default App;
