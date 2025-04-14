import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { concatAll, map, Observable, switchMap } from 'rxjs';

interface info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

interface Origin {
  name: string;
  url: string;
}

interface Location {
  name: string;
  url: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  create: Date;
}

interface Response {
  info: info;
  results: Character[];
}

@Component({
  selector: 'app-obs-superiores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obs-superiores.component.html'
})
export class ObsSuperioresComponent implements OnInit{

  data!: Observable<Character>;

  private readonly API = 'https://rickandmortyapi.com/api/character';
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.data = this.http.get<Response>(this.API).pipe(
      map((response: Response) => response.results),
      // Generamos numeros aleatorios del 1 al 20
      map(() => Math.floor(Math.random() * 20) + 1),
      // Volvemos a realizar la llamada
      map((id: number) => this.http.get<Character>(`${this.API}/${id}`)),
      concatAll()
      // Tambien se puede utilizar en vez de concatAll convertirlo con 
      // switchMap(map((id: number) => this.http.get<Character>(`${this.API}/${id}`))),

    );
  }

}
