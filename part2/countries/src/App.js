import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    console.log("filter event: ", event.target.value);
    setSearch(event.target.value);
  };

  const handleClick = (event) => {
    console.log("click event; show", event.target.attributes.countryname.value);
    setSearch(event.target.attributes.countryname.value);
  };

  return (
    <div>
      <Filter value={search} onChange={handleFilterChange} />
      <Countries
        countries={countries}
        search={search}
        handleClick={handleClick}
      />
    </div>
  );
};

export default App;
