window.onload = function() {
    const rainContainer = document.getElementById('rainContainer');
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    function startRain() {
        rainContainer.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');
            raindrop.style.left = `${Math.random() * 100}vw`;
            raindrop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
            rainContainer.appendChild(raindrop);
        }
    }

    function stopRain() {
        rainContainer.innerHTML = '';
    }

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (!city) {
            weatherResult.innerHTML = 'Please enter a city name!';
            stopRain();
            return;
        }

        const url = `http://localhost:3000/weather?city=${city}`; // Ambil dari backend
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const { temp, humidity } = data.main;
                    const { description } = data.weather[0];
                    weatherResult.innerHTML = `
                        <p>City: ${city}</p>
                        <p>Temperature: ${temp}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Description: ${description}</p>
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                    `;

                    if (description.toLowerCase().includes('rain')) {
                        startRain();
                    } else {
                        stopRain();
                    }
                } else {
                    weatherResult.innerHTML = `
                        <img src="src/error.png" alt="Not Found" class="mx-auto w-20 h-20 rounded-lg">
                        <p class="text-red-500 font-semibold mt-2">City not found!</p>
                    `;
                    stopRain();
                }
            })
            .catch(error => {
                weatherResult.innerHTML = 'Error fetching data!';
                console.error(error);
                stopRain();
            });
    });
};
