import React, { useEffect, useState } from "react";
import { getList } from "./services/locations";

import "./App.css";

function App() {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemInput.length > 2) {
      // reset these values on submit
      setloading(true);
      setAlert(false);
      getList(itemInput)
        .then((res) => {
          setList(res.data);
          setloading(false);
        })
        .catch((err) => {
          setList([]);
          setAlert(true);
          setloading(false);
          console.log(err);
        });
    } else {
      setAlert(true);
      setAlertMessage("You need to enter more than two characters to use this search function")
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search API</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={(event) => setItemInput(event.target.value)}
            value={itemInput}
            type="text"
            placeholder="Search for a location"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul className="location-list">
        {loading && <h2> Getting results....</h2>}
        {!loading &&
          list.map((item) => <li key={item.geonameid}>{item.name}</li>)}
        {alert && <h2> {alertMessage}</h2>}
      </ul>
    </div>
  );
}

export default App;
