import { useEffect, useState } from "react"
import clear from '/icons/clear.png'
import cloud from '/icons/cloud.png'
import mist from '/icons/mist.png'
import broken from '/icons/broken_cloud.png'
import drizzle from '/icons/drizzle.png'
import rain from '/icons/rain.png'
import scattered from '/icons/scattered.png'
import snow from '/icons//snow.png'
import thunderstorm from '/icons/thunderstorm.png'

function App() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date();
  let day = days[date.getDay()]
  const [datas,setDatas] = useState({
    name:'--',
    celcius:'--',
    wind:'--',
    condition:'weather',
    cloud:'--',
    humidity:'--',
  })
  const [icon,setIcon] = useState(cloud)
  let apiKey = "444d62a504d9ec7d427139b0cd40326c"
  const cities = document.querySelectorAll('.city');

  cities.forEach((c) => {
      c.addEventListener('click',(e) => {
        cityInput = e.target.innerHTML;
        fetchData()
      })
    });
  let cityInput = 'London'
  const input = document.getElementsByClassName('search')
  const search = (e) => {
    e.preventDefault();
    if(input[0].value === '')
    {
      alert('Enter correct city name')
    }
    else{
    cityInput = input[0].value;
    fetchData();
    input[0].value='';
    }
  }
  const fetchData = async(e) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`
    let response = await fetch(url);
    let data =await response.json();

    if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
      setIcon(clear)
    }
    else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
      setIcon(cloud)
    }
    else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
      setIcon(scattered)
    }
    else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
      setIcon(broken)
    }
    else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
      setIcon(rain)
    }    
    else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
      setIcon(drizzle)
    }    
    else if(data.weather[0].icon === '11d' || data.weather[0].icon === '11n'){
      setIcon(thunderstorm)
    }
    else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
      setIcon(snow)
    }
    else{
      setIcon(mist)
    }



    setDatas({...datas,name:data.name, celcius:(data.main.temp - 273.15).toFixed(2),
                      condition:data.weather[0].main, cloud:data.clouds.all, wind:data.wind.speed,
                      humidity:data.main.humidity})
                      console.log(data);

  }
  useEffect(()=> {
     fetchData();
  },[])
  return (
    <>
      <div className="weather-app">
        <div className="box">
                <h3 className="brand">The Weather App</h3>
                <div className='main d-flex justify-content-center align-items-center'>
                  <h1 className="temp">{Math.round(datas.celcius)}&#176;</h1>
                  <div className="city-time">
                    <h1 className="name">{datas.name}</h1>
                    <small>
                      <span className="date"></span>
                    </small>
                    <div className="weather d-flex m-2">
                      <img src={icon} className="icon" width={50} height={50} alt="icon"/>
                      <span className="condition py-3 px-2">{datas.condition}</span>
                    </div>
                    <p>{`${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}  -  ${day}`}</p>
                  </div>
                </div>

                <div className="panel">
                  <form onSubmit={search} >
                    <input type="text" className='search' placeholder='Search Location'/>
                    <button type='submit'  className='submit'><i class="fas fa-search"></i></button>
                  </form>
                  
                
                <ul className='details'>
                  <h4>Weather Details</h4>
                  <li>
                    <span><i class="fa-solid fa-cloud me-2"></i>Cloudy</span>
                    <span className='cloud'>{datas.cloud} %</span>
                  </li>
                  <li>
                    <span><i class="fa-solid fa-droplet me-3"></i>Humidity</span>
                    <span className='humidity'>{datas.humidity} %</span>
                  </li>
                  <li>
                    <span><i class="fa-solid fa-wind me-3"></i>Wind</span>
                    <span className='wind'>{datas.wind} Km/h</span>
                  </li>
                </ul>
                <ul className='cities'>
                    <li className='city' onClick={() => cityInput = 'chennai'}>Chennai</li>
                    <li className='city' onClick={() => cityInput = 'tokyo'}>Tokyo</li>
                    <li className='city' onClick={() => cityInput = 'california'}>California</li>
                  </ul>

                </div>

            </div>
          </div>
    </>
  )
}

export default App
