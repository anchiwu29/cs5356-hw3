document.addEventListener("DOMContentLoaded", function () {
    // Food section
    const foodTrack = document.querySelector("#favorite-food-slider .slider-track");
    const foodImages = document.querySelectorAll("#favorite-food-slider .slider-track img");
    const foodPrevBtn = document.querySelector("#favorite-food-slider .prev-btn");
    const foodNextBtn = document.querySelector("#favorite-food-slider .next-btn");

    // Trip section
    const tripTrack = document.querySelector("#favorite-trip-slider .slider-track");
    const tripImages = document.querySelectorAll("#favorite-trip-slider .slider-track img");
    const tripPrevBtn = document.querySelector("#favorite-trip-slider .prev-btn");
    const tripNextBtn = document.querySelector("#favorite-trip-slider .next-btn");

    // Initialize index for both sections
    let foodIndex = 0;
    let tripIndex = 0;

    // Get the total number of images in each section
    const foodTotalImages = foodImages.length;
    const tripTotalImages = tripImages.length;

    // Define image width including margin
    const foodImageWidth = foodImages[0].clientWidth + 10; // Image width + margin
    const tripImageWidth = tripImages[0].clientWidth + 10; // Image width + margin

    // Function to duplicate images for seamless looping
    function duplicateImages(track, images) {
        const clonedImages = Array.from(images).map(image => image.cloneNode(true));
        clonedImages.forEach(image => track.appendChild(image));
    }

    // Function to move to a specific index
    function moveToIndex(track, index, imageWidth) {
        track.style.transition = "transform 0s"; // No transition during manual move
        track.style.transform = `translateX(-${index * imageWidth}px)`;
    }

    // Function to handle next slide for both sections
    function nextSlide(track, index, totalImages, imageWidth) {
        index++;
        if (index === totalImages) {
            index = 0; // Loop back to the first image
        }
        moveToIndex(track, index, imageWidth);
        return index;
    }

    // Function to handle previous slide for both sections
    function prevSlide(track, index, totalImages, imageWidth) {
        index--;
        if (index < 0) {
            index = totalImages - 1; // Loop back to the last image
        }
        moveToIndex(track, index, imageWidth);
        return index;
    }

    // Event listeners for navigation buttons (Food section)
    foodPrevBtn.addEventListener("click", function () {
        foodIndex = prevSlide(foodTrack, foodIndex, foodTotalImages, foodImageWidth);
    });

    foodNextBtn.addEventListener("click", function () {
        foodIndex = nextSlide(foodTrack, foodIndex, foodTotalImages, foodImageWidth);
    });

    // Event listeners for navigation buttons (Trip section)
    tripPrevBtn.addEventListener("click", function () {
        tripIndex = prevSlide(tripTrack, tripIndex, tripTotalImages, tripImageWidth);
    });

    tripNextBtn.addEventListener("click", function () {
        tripIndex = nextSlide(tripTrack, tripIndex, tripTotalImages, tripImageWidth);
    });

    // Auto-scroll when hovering over the navigation buttons (Food section)
    foodPrevBtn.addEventListener("mouseenter", function () {
        foodPrevSlideInterval = setInterval(function () {
            foodIndex = prevSlide(foodTrack, foodIndex, foodTotalImages, foodImageWidth);
        }, 700);
    });

    foodNextBtn.addEventListener("mouseenter", function () {
        foodNextSlideInterval = setInterval(function () {
            foodIndex = nextSlide(foodTrack, foodIndex, foodTotalImages, foodImageWidth);
        }, 700);
    });

    // Auto-scroll when hovering over the navigation buttons (Trip section)
    tripPrevBtn.addEventListener("mouseenter", function () {
        tripPrevSlideInterval = setInterval(function () {
            tripIndex = prevSlide(tripTrack, tripIndex, tripTotalImages, tripImageWidth);
        }, 700);
    });

    tripNextBtn.addEventListener("mouseenter", function () {
        tripNextSlideInterval = setInterval(function () {
            tripIndex = nextSlide(tripTrack, tripIndex, tripTotalImages, tripImageWidth);
        }, 700);
    });

    // Stop auto-scroll when the mouse leaves the button area
    foodPrevBtn.addEventListener("mouseleave", function () {
        clearInterval(foodPrevSlideInterval);
    });

    foodNextBtn.addEventListener("mouseleave", function () {
        clearInterval(foodNextSlideInterval);
    });

    tripPrevBtn.addEventListener("mouseleave", function () {
        clearInterval(tripPrevSlideInterval);
    });

    tripNextBtn.addEventListener("mouseleave", function () {
        clearInterval(tripNextSlideInterval);
    });

    // Duplicate images for both sections to create seamless looping
    duplicateImages(foodTrack, foodImages);
    duplicateImages(tripTrack, tripImages);

    // Initialize the slider by moving to the first image
    moveToIndex(foodTrack, foodIndex, foodImageWidth);
    moveToIndex(tripTrack, tripIndex, tripImageWidth);

    // Weather section
    const apiKey = '1bf9f3d85355fac048057d20d664366a'; // Your API Key
    const city = 'New York,US'; // City name
    const weatherDescription = document.getElementById('weather-description');
    const weatherTemperature = document.getElementById('weather-temperature');

    // Display loading text until data is fetched
    weatherDescription.textContent = "Loading weather...";
    weatherTemperature.textContent = "";

    // Fetch weather data using the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Update the weather section with the fetched data
                const description = data.weather[0].description;
                const temperature = data.main.temp;
                weatherDescription.textContent = `Current Weather: ${description}`;
                weatherTemperature.textContent = `Temperature: ${temperature}°C`;
            } else {
                weatherDescription.textContent = "Failed to load weather data.";
                weatherTemperature.textContent = "";
            }
        })
        .catch(error => {
            weatherDescription.textContent = "Failed to load weather data.";
            weatherTemperature.textContent = "";
            console.error("Error fetching weather data:", error);
        });
});
