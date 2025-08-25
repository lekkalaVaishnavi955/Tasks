const apiKey = "074f24d231cd2c42d3e099a87ea624bb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Main function
async function getWeather() {
  const city = document.getElementById("cityInput").value || "Hyderabad";

  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    // Handle errors (like invalid city)
    if (data.cod !== 200) {
      alert(`Error: ${data.message}`);
      return;
    }

    // Update UI
    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;

    const today = new Date();
    document.getElementById("date").textContent =
      today.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("condition").textContent = data.weather[0].description;

    // Weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon">`;

    // Details
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
    document.getElementById("precip").textContent = data.rain ? `${data.rain["1h"]} mm` : "0 mm";

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Load default city on start
getWeather();
