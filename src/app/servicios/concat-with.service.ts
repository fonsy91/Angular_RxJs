import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatWith, Observable } from 'rxjs';
import { User } from '../interfaceDatos/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ConcatWithService {

  private readonly baseAPI = 'https://jsonplaceholder.typicode.com/todos';
  private readonly http = inject(HttpClient);

  constructor() { }

  // Metodo para operador concatWith
  getData(): Observable<User> {
    const obs1 = this.http.get<User>(`${this.baseAPI}/1`);
    const obs2 = this.http.get<User>(`${this.baseAPI}/2`);
    return obs1.pipe(
      concatWith(obs2)
    );
  }

}
