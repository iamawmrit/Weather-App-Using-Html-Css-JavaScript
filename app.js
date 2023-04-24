const form = document.querySelector('.search-form');
const card = document.querySelector('.card');


const forecast = new Forecast();

form.addEventListener('submit', e => {
    
    e.preventDefault();
    const city = form.searchBox.value.trim();

    forecast.updateCity (city)
    .then (data => {
        updateUI(data);
    })
    .catch (err => {
        console.log(err);
    });

    form.reset();
});


const updateUI = (data) => {
    
    const {cityDetails, weather} = data;
    
    card.innerHTML =
    `
    <div class="time card-img-top"></div>
    <div class="details">
        <div class="icon shadow"></div>
        <h4 class="my-3 text-muted">${cityDetails.EnglishName}</h4>
        <span class="my-3">${weather.WeatherText}</span>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `;
    const icon = document.querySelector('.icon');
    const time = document.querySelector('.time')

    const timeUrl = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('style', `background-image: url(${timeUrl});`);

    icon.setAttribute('style', `background-image: url(img/icons/${weather.WeatherIcon}.svg)`);
};
