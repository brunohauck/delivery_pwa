import { Restaurant } from './../models/restaurant/restaurant';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RestaurantList } from '../models/restaurant/restaurantList';
import { URL_API } from '../../app.api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {
  private url: string;
  constructor(
    private http: HttpClient,
  ) {
    this.url = `${URL_API}/api/restaurants`;  
  }
 
  /** GET Restorants from the server */
  getRestaurantes (): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url)
      .pipe(
        tap(todos => this.log('listando restaurantes')),
        catchError(this.handleError('getRestaurantes', []))
      );
  }

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

  private log(message: string) {
     console.log(`RestauranteService: ${message}`);
  }
}
