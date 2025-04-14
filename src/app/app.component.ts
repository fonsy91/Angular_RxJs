import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { ObsFrioCalienteComponent } from './componentes/obs-frio-caliente/obs-frio-caliente.component';
import { ObsSuperioresComponent } from './componentes/obs-superiores/obs-superiores.component';
import { OperadoresComponent } from './componentes/operadores/operadores.component';


@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  imports: [CommonModule, HttpClientModule, ObsFrioCalienteComponent, ObsSuperioresComponent, OperadoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{

  title = 'RxJs';

  // Observable que emite un flujo de informacion (1,2,3)
  observable = new Observable((suscriber) => {
    suscriber.next(1);
    suscriber.next(2);
    suscriber.next(3);
  });

  constructor() {

    // Si quieres suscribirte y escuchar a este observable
    this.observable.subscribe({
      next(x){
        console.log('Next: ', x);
      },
      error(err){
        console.log(err);
      },
      complete(){
        console.log('Flujo terminado');
      }

    });

  }


  ngOnInit(): void {

  }


}


/**
 * ESTUDIO DE LA LIBRERIA RxJs
 * 
 * Programacion reactiva: paradigma de programacion en el cual los datos fluyen a traves 
 * de un sistema, en lugar de ser manejados por eventos puntuales. Se basa en la idea de 
 * que los datos son un flujo continuo que cambia con el tiempo, y que el sistema debe 
 * reaccionar a estos cambios de manera eficiente y escalable. Los terminos clave la 
 * programacion reactiva son: (Observables, operadores, observadores, suscriptores y
 * asincronia).
 * 
 * -Los observables son la base de la programacion ractiva, permiten representar un flujo de
 * datos a lo largo del tiempo. Los observables emiten los datos a medida que cambian, y los
 * programas pueden "suscribirse" a estos observables para recibir y procesar los datos.
 * 
 * -Los operadores son funciones que se pueden aplicar a los observables para transformar y 
 * filtrar los datos que fluyen a traves del sistema, ademas permiten realizar operaciones 
 * complejas con los datos como transformaciones, filtrado, agrupamiento y agregado.
 * 
 * -Los observadores son los que "escuchan" a los observables y realizan alguna accion cada 
 * vez que hay un cambio en los datos.
 * 
 * -Los suscriptores son los que conectan los observables y los observadores, permitiendo que 
 * los datos fluyan a traves del sistema.
 * 
 * -La asincronia la programacion reactiva permite trabajar con flujos de datos asincronos de 
 * manera mas facil y predecible
 * 
 * -------------------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------------------  
 * 
 * El patron observer: El patrón Observer es un patrón de diseño de software que permite establecer una 
 * relación entre objetos, donde uno (el Observable ) notifica a otros (los Observers ) sobre cambios 
 * en su estado. Este patrón es especialmente útil para manejar eventos asíncronos y flujos de datos.
 * 
 * -------------------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------------------
 * 
 * El patron Iterator: proporciona una forma estandarizada de recorrer un objeto de forma secuencial,
 * este patron se divide en dos elemento: el iterador y el contenedor.
 * 
 * El iterador: es un objeto que proporciona una interfaz para recorrer un contenedor de forma secuencial
 * El contenedor: es un objeto que contiene los elementos que se van a recorrer.
 * 
 * -------------------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------------------
 * 
 * Observable que es?: es un objeto que representa un flujo de datos a lo largo del tiempo, los observables
 * emiten datos a medida que cambian. Puede emitir tres tipos de evento son: next (el flujo del dato como tal),
 * error (en caso de que haya un error en el flujo) y complete (emite un evento cuando el flujo de datos se 
 * ha compeletado).
 * 
 * Un stream de datos es un flujo continuo de informacion que fluye a traves de un sistema puede ser usado 
 * para transmitir cualquier tipo de informacion audio, videos, datos etc.. y es el observable el que emite
 * esta informacion. 
 * 
 * Los observables se pueden cloasificar en dos son:
 * 
 * Frios: son aquellos que no empiezan a emitir datos hasta que alguien se suscribe a ellos. Estos observables
 * son unicast se puede decir que el dataSource se crea y se activa dentro del observable
 *  
 * Calientes: son aquellos que comienzan a emitir datos independientemente de si se han suscrito a ellos o no.
 * Estos observables son multicast se puede decir que el dataSource se crea y se activa fuera del observable
 * 
 * -------------------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------------------
 * 
 * Observables de orden superior: son aquellos que operan sobre otros observables, son utiles para crar nuevos
 * observables a partir de un observable o incluso para transdormar los datos emitidos por un observable 
 * 
 * -------------------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------------------
 * 
 * Los operadores  RxJs: son funciones que permiten manipular y transformar flujos de datos observables 
 * estos operadores incluyen map, filter, reduce, merge, concat y mas. Vamos a usar estas funciones a 
 * traves del pipe que nos permite encadenar varios operadores en una sola llamada.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * CURSO: https://www.youtube.com/watch?v=EVF1xnDWlV4&list=PL_9MDdjVuFjEscTzZSLo6upnX1AbHj-dl&index=5
 * EMPEZAR VIDEO: 17
 * Importante ver datos de navegacion en angular
 *  
 */