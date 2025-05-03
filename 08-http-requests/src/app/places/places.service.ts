import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  private fetchPlaces<T, R>(
    url: string,
    errorMessage: string,
    transformFn: (data: T) => R
  ) {
    return this.httpClient.get<T>(url).pipe(
      map((resData: T) => transformFn(resData)),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  loadAvailablePlaces() {
    return this.fetchPlaces<{ places: Place[] }, Place[]>(
      `${BASE_URL}/places`,
      'An error occurred while fetching places.',
      (data) => data.places
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces<{ userPlaces: Place[] }, Place[]>(
      `${BASE_URL}/user-places`,
      'An error occurred while fetching favorite places.',
      (data) => data.userPlaces
    ).pipe(
      tap({
        next: (userPlace) => this.userPlaces.set(userPlace),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((userPlace) => userPlace.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }
    return this.httpClient
      .put<{ userPlaces: Place[] }>(`${BASE_URL}/user-places`, {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          console.log(error);

          this.errorService.showError(
            'An error occurred while adding favorite place.'
          );
          return throwError(
            () => new Error('An error occurred while adding favorite place.')
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }
    return this.httpClient.delete(`${BASE_URL}/user-places/${place.id}`).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        console.log(error);

        this.errorService.showError(
          'An error occurred while removing favorite place.'
        );
        return throwError(
          () => new Error('An error occurred while removing favorite place.')
        );
      })
    );
  }
}
