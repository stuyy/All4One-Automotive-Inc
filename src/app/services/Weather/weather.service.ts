import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Weather from 'src/app/models/Weather';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { 
    
  }
  getWeatherByCoords(coords) : Observable<Weather> {
    return this.http.get<Weather>(`${environment.host}/weather/coordinates/${coords.lat}/${coords.lon}`);
  }
  getWeatherByCity(city) : Observable<Weather> {
    console.log(city)
    return this.http.get<Weather>(`${environment.host}/weather/city/${city}`);
  }
}
