class Forecast {
    constructor (){
        this.key = 'Twq4o2R3B01FHX7fl0rGQXc6INHYzPvc';
        this.cityBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherBase = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){
    
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);

        console.log(weather.IsDayTime);
    
        return {
            cityDetails,
            weather
        }
    }

    async getCity(city){

        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityBase + query);
        const data = await response.json()
        
        return data[0];
    }

    async getWeather(id){

        const query = `${id}?&apikey=${this.key}`;

        const response = await fetch(this.weatherBase + query);
        const data = await response.json();

        return data[0];
    }
}
