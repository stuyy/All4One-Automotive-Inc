import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/Weather/weather.service';
import Weather from 'src/app/models/Weather';
import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public loading: boolean = true;
  private latitude: number;
  private longitude: number;
  public weather: Weather;
  public blocked: boolean = false;
  public weatherInput: FormControl;
  public showInput: boolean = false;
  constructor(private weatherService: WeatherService) {
    this.weatherInput = new FormControl('');
  }
  ngOnInit() {
    // Check Local Storage to see if city exists.
    if(localStorage.getItem('city')) {
      this.getWeather(null, localStorage.getItem('city'));
      console.log("Local Storage")
    }
    else {
      navigator.geolocation.getCurrentPosition(pos => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        this.weatherService.getWeatherByCoords({ lat: this.latitude, lon: this.longitude})
          .subscribe((data : Weather) => {
            this.weather = data;
            this.appendIcons();
            this.loading = false;
          }, err => {
            console.log(err);
            this.loading = false;
          })
      }, err => {
        // Make user enter location manually.
        console.log(err);
        this.blocked = true;
        this.loading = false;
      });
    }
  }
  getWeather(event, city) {
    if(event) {
      city = this.weatherInput.value;
      localStorage.setItem('city', city);
    }
    this.loading = true;
    this.weatherService.getWeatherByCity(city)
      .subscribe((data : Weather) => {
        setTimeout(() => {
          this.weather = data;
        this.appendIcons();
        this.blocked = false;
        this.loading = false;
        }, 1000)
      }, err => console.log(err));
  }
  changeLocation() : void {
    this.showInput = !this.showInput;
  }
  private appendIcons () : void {
    this.weather.weather = this.weather.weather.map((w : any)=> {
      if(w.main === 'Rain') {
        w.icon = 'wi wi-rain weather-icon'
        return w;
      } else if(w.main === 'Snow') {
        w.icon = 'wi wi-snow weather-icon';
        return w;
      } else if(w.main === 'Clear') {
        w.icon = 'wi day-sunny weather-icon';
        return w;
      } else if(w.main === 'Clouds') {
        w.icon = 'wi wi-day-cloudy weather-icon';
        return w;
      } else if(w.main === 'Mist') {
        w.icon = 'wi wi-fog weather-icon';
        return w;
      } else if(w.main === 'Drizzle') {
        w.icon = 'wi wi-day-showers weather-icon';
        return w;
      } else if(w.main === 'Thunderstorm') {
        w.icon = 'wi-day-thunderstorm weather-icon';
        return w;
      }
    })
  }
}
