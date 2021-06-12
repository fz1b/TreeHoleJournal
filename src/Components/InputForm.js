import React, { useState } from "react";
import "../stylesheets/inputForm.css";

export default function InputForm(prop) {
  const [name, setName] = useState("");
  const [weather, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  const clearState = (e) => {
    e.preventDefault();
    setName("");
    setLocation("");
    setDescription("");
    setURL("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    prop.action(name, weather, url, description);
    clearState(e)
  };

  return (
    <>
    <div className = "title"> New entry</div>
    <form className="ui form settings" style={{ width: 400 }}>
      <div className="field">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="field">
        <label>Weather</label>
        <input
          value={weather}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </div>
      <div className="field">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell yourself about how you feel..."
          rows="3"
        ></textarea>
      </div>
      <button onClick={handleSubmit} type="submit" className="submit ui button">
        Submit
      </button>
      <button onClick={clearState} className="ui button">
        Reset
      </button>
    </form>
    </>
  );
}
