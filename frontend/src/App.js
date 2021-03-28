import React, { useEffect, useState } from "react";
import { getList } from "./services/locations";

import "./App.css";

function App() {

  const [alert, setAlert] = useState(false);
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState('');

  const handleSubmit = (e) => {

    setAlert(false)

    e.preventDefault();
    getList(itemInput).then((res) => {
        setList(res.data);
    }).catch(err =>{
      setList([])
      setAlert(true)
      console.log(err)
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search API</h1>
      </header>
      <form onSubmit={handleSubmit} >
        <label>
          <input onChange={event => setItemInput(event.target.value)} value={itemInput} type="text" placeholder="Search for a location" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul className="location-list">
        {list.map((item) => (
          <li key={item.geonameid} >{item.name}</li>
        ))}
         {alert && <h2> There was an error getting these results</h2>}
      </ul>
    </div>
  );
}

export default App;
