window.onload = function() {
    const rainContainer = document.getElementById('rainContainer');
    const apiKey = '814d4172821a42a3ac494a2fa08f0e14'; // Ganti dengan API key Anda
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    // Fungsi untuk memulai hujan
    function startRain() {
        // Hapus partikel hujan sebelumnya
        rainContainer.innerHTML = '';

        // Buat partikel hujan dan tambahkan ke rainContainer
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');
            raindrop.style.left = `${Math.random() * 100}vw`; // Posisi horizontal acak
            raindrop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`; // Durasi animasi acak
            rainContainer.appendChild(raindrop);
        }
    }

    // Fungsi untuk menghapus hujan
    function stopRain() {
        rainContainer.innerHTML = ''; // Hapus elemen hujan
    }

    // Event listener untuk tombol pencarian
    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (!city) {
            weatherResult.innerHTML = 'Please enter a city name!';
            stopRain(); // Pastikan hujan berhenti jika tidak ada nama kota
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
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
                    
                    // Periksa apakah cuaca mendukung hujan
                    if (description.toLowerCase().includes('rain')) {
                        startRain(); // Mulai hujan jika ada deskripsi hujan
                    } else {
                        stopRain(); // Hentikan hujan jika tidak ada hujan
                    }

                } else {
                    weatherResult.innerHTML = `
                        <img src="src/error.png" alt="Not Found" class="mx-auto w-20 h-20 rounded-lg">
                        <p class="text-red-500 font-semibold mt-2">City not found!</p>
                    `;
                    stopRain(); // Pastikan hujan berhenti jika kota tidak ditemukan
                }
            })
            .catch(error => {
                weatherResult.innerHTML = 'Error fetching data!';
                console.error(error);
                stopRain(); // Pastikan hujan berhenti jika terjadi kesalahan
            });
    });
};
