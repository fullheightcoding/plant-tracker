import '../App.css';
import { useState, useEffect } from 'react';
// import {reducer} from './reducer';
import Modal from './Modal';

const url = 'http://localhost:9000/plants';
// const defaultState = {
//   plants: []
// };

export default function App() {
  const [formData, setFormData] = useState({name: "", location: "", lightingRequirements: "", wateringRequirements: ""});
  const [plants, setPlants] = useState([]);
  // const [state, dispatch] = useReducer(reducer, defaultState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
      setPlants((prevPlants) => [...prevPlants, formData]);

      //how to clear formData on a successful post?
      setFormData({name: "", location: "", lightingRequirements: "", wateringRequirements: ""});

      //display message in modal
      setIsModalOpen(true);
      setModalContent('Successfully added a new plant');
    } else {
      //handling errors
      //display message in modal
      setIsModalOpen(true);
      setModalContent('Error: not able to add a new plant');

      console.log(response.status, response.statusText);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);

    //how to send this to nodejs rest api?
    postData();
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

  function closeModal() {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPlants();
  },[])

  useEffect(() => {
    console.log('plants changed');
    // setFormData();
  }, [plants])

  return (
    <div className="App">
      <h1>Plant Tracker</h1>
      {isModalOpen && (
        <Modal closeModal={closeModal} modalContent={modalContent}/>
      )}
      <h3>Plants:</h3>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <table class='center'>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Lighting Requirements</th>
            <th>Watering Requirements</th>
          </tr>
          {plants.map((plant) => {
            const {id, name, location, lightingRequirements, wateringRequirements} = plant;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{location}</td>
                <td>{lightingRequirements}</td>
                <td>{wateringRequirements}</td>
              </tr>
            )
          })}
        </table>
        <div class='center'>
            <input type='text' placeholder='Plant name' name='name' value={formData.name} onChange={handleChange}/>
            <input type='text' placeholder='Plant location' name='location' value={formData.location} onChange={handleChange}/>
            <input type='text' placeholder='Lighting requirements' name='lightingRequirements' value={formData.lightingRequirements} onChange={handleChange}/>
            <input type='text' placeholder='Watering requirements' name='wateringRequirements' value={formData.wateringRequirements} onChange={handleChange}/>
            <button type='submit' onClick={handleSubmit}>add</button>
        </div>
      </form>
    </div>
  );
}