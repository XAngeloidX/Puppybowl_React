import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DogList from "./components/DogList";
import CreateDogPrompt from "./components/CreateDogPrompt";
import SearchBar from "./components/SearchBar.jsx";
import "./App.css";

function App() {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players");
      const data = await response.json();
      if (data.success) {
        setDogs(data.data.players);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const addDog = async (newDog) => {
    try {
      const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players");
      const data = await response.json();

      if (data.success) {
        setDogs([...dogs, newDog]);
      } else {
        console.error("Error adding new dog:", data.error);
      }
    } catch (error) {
      console.error("Error adding new dog:", error);
    }
  };

  const deleteDog = async (id) => {
    try {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players/${id}`, {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedDogs = dogs.filter((dog) => dog.id !== id);
        setDogs(updatedDogs);
      } else {
        console.error("Error deleting dog:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredDogs = dogs.filter((dog) => {
      return (
        dog.name.toLowerCase().includes(lowercasedSearchTerm) ||
        dog.breed.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
    setFilteredDogs(filteredDogs);
  };

  return (
    <Router>
      <div className="App">
        <h1>Puppy Bowl</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <Link to="/add">Add Dog</Link>
            </li>
          </ul>
        </nav>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <DogList
                dogs={filteredDogs.length > 0 ? filteredDogs : dogs}
                onDelete={deleteDog}
              />
            }
          />
          <Route path="/add" element={<CreateDogPrompt onAdd={addDog} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
