import React, { useEffect, useState } from "react";
import { getList } from "./services/locations";

import "./App.css";

function App() {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState("");

  // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let currentQuery = true;

    const loadList = async () => {
      setAlert(false);
      setAlertMessage(
        "There was an error getting the results, please try again later"
      );

      if (itemInput.length > 2) {

        await sleep(350);
        if (currentQuery) {
          
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
        }
      } else {

        setList([]);
        setAlert(true);
        setAlertMessage(
          "You need to enter more than two characters to start your search"
        );
      }
    };

    loadList();

    return () => {
      currentQuery = false;
    };
  }, [itemInput]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search API</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="search"
            onChange={(e) => setItemInput(e.target.value)}
            value={itemInput}
            type="text"
            placeholder="Type to begin your search"
          />
        </label>
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
