import React, { useState } from "react";

function CreateDogPrompt({ onAdd }) {
  const [dogData, setDogData] = useState({
    name: "",
    id: "",
    breed: "",
    status: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players",
        {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            name: dogData.name,
            id: dogData.id,
            breed: dogData.breed,
            status: dogData.status.toLowerCase(),
            image: dogData.image,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        onAdd(data.data.player);
        setDogData({
          name: "",
          id: "",
          breed: "",
          status: "",
          image: "",
        });
      } else {
        console.error("Error adding new dog:",data.error);
      }
    } catch (error) {
      console.error("Error adding new dog:",error);
    }
  };

  return (
    <div className="create_dog">
      <h2>Add a New Dog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={dogData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={dogData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Dog Breed"
          value={dogData.breed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={dogData.status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL Link"
          value={dogData.image}
          onChange={handleChange}
        />
        <button type="submit">Create Dog</button>
      </form>
    </div>
  );
}

export default CreateDogPrompt;
