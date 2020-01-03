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
            console.log(this.weather)
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
        this.weather = data;
        this.blocked = false;
        this.loading = false;
      }, err => console.log(err));
  }
  changeLocation() : void {
    this.showInput = !this.showInput;
  }
}
