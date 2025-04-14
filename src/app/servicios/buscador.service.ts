import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { User } from '../interfaceDatos/user.interface';
import { users } from '../interfaceDatos/users-data';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor() { }

  search$(user: string): Observable<User> {
    const found = users.find((item: User) => item.name === user);
    return found ? of(found) : EMPTY
  }

  /*
  En este metodo esta buscando el nombre en formato string en la lista de 
  Usuarios del archivo users-data.ts si encuentra ese usuario found estara
  no vacio y con of(found) que es una funcion RxJs que convierte un valor en 
  un Observable en este caso emite ese valor el usuario encontrado esto (Observable<User>)
  y si no lo encuentra entoces devuelve EMPTY que es un observable que que no emite ningun 
  valor
  */

}
