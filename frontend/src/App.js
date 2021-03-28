import React, { useEffect, useState } from "react";
import { getList } from "./services/locations";

import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState('');

  useEffect(() => {
    let mounted = true;
    return () => (mounted = false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getList(itemInput).then((items) => {
        setList(items);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search API</h1>
      </header>
      <form onSubmit={handleSubmit} >
        <label>
          <p>New Item</p>
          <input onChange={event => setItemInput(event.target.value)} value={itemInput} type="text" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {list.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
