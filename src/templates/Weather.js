import axios from 'axios';
import React, { useState} from 'react';

export default function Weather() {

  const [formData, setFormData] = useState('');
  const [tempData, setTemp] =useState('');
   const data = formData;


    const fatchWeather = async ()=>{

      try{
        const response =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=2cc711b1a7ffa12a235ee3b46f4e21c5&units=metric`)
        
        if(response){
          const temp = response.data.main.temp;
          console.log(temp);
          setTemp(temp);
          
        }
      }
      catch(error){
        console.log(error);
      }
    }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log('formData', formData);
    fatchWeather();
    setFormData('');
  }
  return (
    <div>
      <div className='waether-show-div'>
       <form onSubmit={handleSubmit}>
        <input type="text" name='name' value={formData} onChange={(e)=>setFormData(e.target.value)}/>
        <button type="submit">Submit</button>
       </form>
       <p>{tempData ? `Temp: ${tempData}°C` : 'No temperature data available'}</p>      </div>
      
    </div>
  )
}
