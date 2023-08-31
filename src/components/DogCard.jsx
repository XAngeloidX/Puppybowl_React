import React, { useState } from "react";

function DogCard({ dog, onDelete }) {
  const [expand,setExpand] = useState(false);

  const handleDelete = () => {
    console.log("handleDelete DogCard");
  };

  return (
    <div className="dog-card">
      <img src={dog.imageUrl} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>ID: {dog.id}</p>
      {expand && (
        <>
          <p>Breed: {dog.breed}</p>
          <p>Status: {dog.status}</p>
        </>
      )}
      <button onClick={() => setExpand(!expand)}>
        {expand ? "Hide Details" : "Expand Details"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DogCard;
