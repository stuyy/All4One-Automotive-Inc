import { Component, OnInit } from '@angular/core';
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
  constructor(private weatherService: WeatherService) {
    this.weatherInput = new FormControl('');
  }
  ngOnInit() {
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
  getWeather() {
    this.loading = true;
    this.weatherService.getWeatherByCity(this.weatherInput.value)
      .subscribe((data : Weather) => {
        this.weather = data;
        this.blocked = false;
        this.loading = false;
      }, err => console.log(err));
  }

}
