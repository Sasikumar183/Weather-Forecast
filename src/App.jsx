import { useEffect, useState } from 'react';
import bgim from './assets/images/bgimage.webp';
import { WeatherDetails } from './assets/components/WeatherDetails';

function App() {
  return (
    <>
      <div className='h-[105vh] bg-cover' style={{ backgroundImage: `url(${bgim})` }}>
        <WeatherDetails />
      </div>
    </>
  );
}

export default App;
