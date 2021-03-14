import React from "react";
import FinalCountry from "./FinalCountry";

const Countries = ({ countries, search, handleClick }) => {
  const countriesToShow = search
    ? countries.filter((e) => {
        var re = new RegExp(search, "i");
        return re.test(e.name);
      })
    : countries;

  if (!search) {
    return <p>Try typing a country's name in the search bar</p>;
  } else if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length === 1) {
    return <FinalCountry country={countriesToShow[0]} />;
  }

  return (
    <div>
      {countriesToShow.map((country) => (
        <div key={country.name}>
          {country.name}
          <button countryname={country.name} onClick={handleClick}>
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
