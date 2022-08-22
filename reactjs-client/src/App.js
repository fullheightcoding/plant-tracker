import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useReducer } from 'react';
import {reducer} from './reducer'

const url = 'http://localhost:9000/plants';
const defaultState = {
  plants: []
};

function App() {
  // const [formData, setFormData] = useState({newName: "", newLocation: "", newLighting: "", newWatering: ""});
  const [formData, setFormData] = useState({name: "", location: "", lightingRequirements: "", wateringRequirements: ""});

  const [plants, setPlants] = useState([]);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const getPlants = async () => {
    const response = await fetch(url);
    const plants = await response.json();

    setPlants(plants);
    // console.log(plants);
  }

  const postData = async() => {
    // console.log(JSON.stringify(formData));
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    //error handling?
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      //how to update plants array on a successful post?
      plants.push(formData);
      //how to clear formData on a successful post?
      setFormData({name: "", location: "", lightingRequirements: "", wateringRequirements: ""});
    } else {
      //handling errors
      console.log(response.status, response.statusText);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);

    //how to send this to nodejs rest api?
    postData();

    //should we add to the plants array then send to the api?
    // plants.push(formData);

    //should we reset formData after successful submit?
    // setFormData();
  }

  function handleChange(e) {
    const {name, value, type, checked} = e.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  useEffect(() => {
    getPlants();
  },[])

  useEffect(() => {
    console.log('plants changed');
    // setFormData();
  }, [plants])

  return (
    <div className="App">
      <div>Plant Tracker</div>
      <h3>Plants:</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Lighting Requirements</th>
            <th>Watering Requirements</th>
          </tr>
          {plants.map((plant) => {
            const {id, name, location, lighting, watering} = plant;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{location}</td>
                <td>{lighting}</td>
                <td>{watering}</td>
              </tr>
            )
          })}
        </table>
        <div>
            <input type='text' placeholder='Plant name' name='name' value={formData.name} onChange={handleChange}/>
            <input type='text' placeholder='Plant location' name='location' value={formData.location} onChange={handleChange}/>
            <input type='text' placeholder='Lighting requirements' name='lightingRequirements' value={formData.lightingRequirements} onChange={handleChange}/>
            <input type='text' placeholder='Watering requirements' name='wateringRequirements' value={formData.wateringRequirements} onChange={handleChange}/>
            <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
}

export default App;