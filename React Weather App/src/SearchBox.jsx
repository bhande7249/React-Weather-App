import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './SearchBox.css';

function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState("");
  let API_URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = "091909990e569e09bc63bbd9691891ea";

  let getWeatherInfo = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let jsonResponse = await response.json();

    if (jsonResponse.cod !== 200) {
      throw new Error(jsonResponse.message);
    }

    return {
      city: jsonResponse.name,
      temp: jsonResponse.main?.temp,
      feelslike: jsonResponse.main?.feels_like,
      humidity: jsonResponse.main?.humidity,
      tempMax: jsonResponse.main?.temp_max,
      tempMin: jsonResponse.main?.temp_min,
      weather: jsonResponse.weather?.[0]?.description,
    };
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let newinfo = await getWeatherInfo();
      updateInfo(newinfo);
      setCity("");
      setError(""); // clear error
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="searchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SearchBox;
