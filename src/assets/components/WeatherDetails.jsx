import React, { useState, useEffect } from 'react';
import Search from '../images/search.png';
import Clear from '../images/clear.png';
import Cloudy from '../images/cloudy.jfif';
import Drizzle from '../images/drizzle.jfif';
import Humidity from '../images/humidity.jfif';
import Rain from '../images/rain.jfif';
import Snow from '../images/snow.jfif';
import Wind from '../images/wind.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const WeatherDetails = () => {
    const [icon, setIcon] = useState(Snow);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(0);
    const [log, setLog] = useState(0);
    const [humiv, setHumv] = useState(0);
    const [winds, setWinds] = useState(0);
    const [windicon, setWindIcon] = useState(Wind);
    const [text, setText] = useState('');
    const weathermap = {
        "01n": Clear,
        "01d": Clear,
        "02n": Cloudy,
        "02d": Cloudy,
        "03n": Cloudy,
        "03d": Cloudy,
        "04n": Cloudy,
        "04d": Cloudy,
        "09n": Drizzle,
        "09d": Drizzle,
        "10n": Rain,
        "10d": Rain,
        "13n": Snow,
        "13d": Snow
    };

    useEffect(() => {
        setCity("Search City");
    }, []);

    const getdata = async () => {
        let apikey = '763ef2a9daea49fe1f574f193cdc1807';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            let data = await response.json();
            console.log(data);
            const weathericon = data.weather[0].icon;
            setIcon(weathermap[weathericon] || Clear);
            setCity(data.name);
            setTemp(data.main.temp + `°C`);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLog(data.coord.lon);
            setHumv(data.main.humidity);
            setWinds(data.wind.speed);
        } catch (error) {
            setCity("City Not Found");
            setTemp("No data");
            setCountry("No data");
            setLat(0);
            setLog(0);
            setHumv(0);
            setWinds(0);
            console.error(error);
        }
    };

    return (
        <>
            <br />
            <br />
            <div className='flex flex-col space-y-4 mx-auto p-5 shadow-black shadow-lg rounded-lg bg-transparent backdrop-blur-3xl w-[90%]  md:w-[40%] xl:w-[30%]'>
                <span className='flex border bg-white rounded-xl'>
                    <input
                        type='text'
                        placeholder='Search City'
                        className='mx-auto grid-rows-2 h-12 text-black p-2 rounded-md outline-none bg-transparent w-[65%]'
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                getdata();
                            }
                        }}
                    />
                    <FontAwesomeIcon icon={faSearch} className='w-6 h-8 m-2 text-black cursor-pointer' onClick={getdata} />
                </span>
                <div>
                    <img src={icon} alt='' className='mx-auto h-28 rounded-sm' />
                </div>
                <div>
                    <p className='text-center mx-auto text-4xl font-bold'>{temp}</p>
                </div>
                <div>
                    <p className='text-center text-green-700 text-4xl uppercase font-semibold'>{city}</p>
                </div>
                <div>
                    <p className='text-center text-white text-3xl font-bold'>{country}</p>
                </div>
                <div>
                    <span className=''>
                        <div className='flex space-x-4 mx-auto items-center font justify-center'>
                            <div>
                                <p className='text-xl font-semibold'>Longitude</p>
                                <p className='text-center mt-1'>{log}</p>
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>Latitude</p>
                                <p className='text-center mt-1'>{lat}</p>
                            </div>
                        </div>
                    </span>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <img src={Humidity} className='w-16 h-14 mx-auto' alt='' />
                        <p className='text-center p-1'>{humiv} %</p>
                        <p className='text-xl font-semibold'>Humidity Level</p>
                    </div>
                    <div>
                        <img src={Wind} alt='' className='w-16 h-14 mx-auto' />
                        <p className='text-center p-1'>{winds} km/h</p>
                        <p className='text-xl font-semibold'>Wind Speed</p>
                    </div>
                </div>
            </div>
        </>
    );
};
