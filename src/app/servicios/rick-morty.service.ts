import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { Character, ResponseInfoResults } from '../interfaceDatos/character';

const mockCharacter = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private readonly http = inject(HttpClient)

  constructor() { }

  // Aqui se esta usando la URL buena (https://rickandmortyapi.com/api/character) que trae los datos que ocurriria 
  // si esa URl esta mal o devuelve algun fallo la API

  getData(): Observable<Character[]> {
    return this.http.get<ResponseInfoResults>('https://rickandmortyapi.com/api/character').pipe(
      map((res: ResponseInfoResults) => res?.results),
      // Tratamientos del error devuelto por la API errores como 404 etc..
      // catchError(() => of([mockCharacter]))
      // catchError(() => throwError(() => new Error('Ups Algo a pasado')))
      catchError(() => EMPTY)
    );
  }

}
