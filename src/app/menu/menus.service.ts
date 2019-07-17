import { MenuList } from './../models/menu/menuList';
import { Restaurant } from './../models/restaurant/restaurant';
import { Menu } from './../models/menu/menu';
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
export class MenusService {
  private url: string;
  constructor(
    private http: HttpClient,
  ) {
    this.url = `${URL_API}/api/menus/`;
  }
 
  /** GET heroes from the server */
  getMenus (id): Observable<Menu[]> {
    this.url = this.url + id;

    console.log(this.url);
    return this.http.get<Menu[]>(this.url)
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
