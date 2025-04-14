import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { log, timeStamp } from 'console';
import { concat, delay, filter, interval, map, merge, Observable, of, single, startWith, Subject, Subscription, switchMap, takeUntil, tap, timestamp } from 'rxjs';
import { User } from '../../interfaceDatos/user.interface';
import { BuscadorService } from '../../servicios/buscador.service';

@Component({
  selector: 'app-operadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operadores.component.html'
})
export class OperadoresComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription = new Subscription();

  // Creamos un observable que emite 5 valores con el operador of 
  numbers = of(1,2,3,4,5);
  numbers2 = of(4,5,6);

  squareNumbers = this.numbers.pipe(
    map(x => x * x)
  );

  paresNumbers = this.numbers.pipe(
    filter(x => x % 2 === 0)
  );

  mergeNumbers = merge(this.numbers, this.numbers2);

  concatNumbers = concat(this.numbers, this.numbers2);

  // Datos y Observables para el buscador y el operador switchMap()
  searchTerm$ = new Subject<string>();
  results$!: Observable<User>;
  private searchSVC = inject(BuscadorService);

  // Observable para la demostracion del operador takeUntil
  stop$ = new Subject<number>();
  counter!: number;

  ngOnInit(): void {
    this.subscriptions.add(
      this.squareNumbers.subscribe(res => console.log('La potencia del número es: ', res))
    );

    this.subscriptions.add(
      this.paresNumbers.subscribe(res => console.log('Los números pares son: ', res))
    );

    this.subscriptions.add(
      this.mergeNumbers.subscribe(res => console.log('Los números mergeados son: ', res))
    );

    this.subscriptions.add(
      this.concatNumbers.subscribe(res => console.log('Los números concatenados son: ', res))
    );

    // Para el operador tap()
    this.subscriptions.add(
      this.numbers2.pipe(
        map((number:number) => number * number),
        tap((result:number) => console.log('Operador tap(): ', result))
      ).subscribe()
    );

    // Para el operador delay()
    this.subscriptions.add(
      this.numbers2.pipe(
        delay(1500),
        tap(res => console.log('Operador delay(): ', res))
      ).subscribe()
    );

    // Para el operador timestamp()
    this.subscriptions.add(
      this.numbers2.pipe(
        timestamp(),
        tap(res => console.log('Operador timestamp(): ', res))
      ).subscribe()
    );

    // Para el operador switchMap()
    // Cada vez que el usuario introduzca un valor en caso de que se equivoque y cambiara 
    // este operador cancelaria esa operacion y haria una nueva
    // Esto esta escuchando todo el rato a this.searchTerm$ y en cuanto tiene el valor hace el pipe 
    this.results$ = this.searchTerm$.pipe(
      switchMap((term: string) => this.searchSVC.search$(term))
    )

    // Para el operador single()
    this.numbers.pipe(
      single((number: number) => number === 3),
      // En caso de no encontrar el valor de la condicion saltara un error en este 
      // caso habria que controlarlo
      tap(res => console.log('Operador single(): ', res))
    ).subscribe()

    // Para el operador startWith()
    this.numbers.pipe(
      startWith(0),
      tap(res => console.log('Operador single(): ', res))
    ).subscribe()

  }

  // METODOS DEL COMPONENTE ********************************************************************
  // *******************************************************************************************

  // metodo recibe un evento en este caso cuando escribes en el input del buscador 
  // obtenemos lo que se escribe y lo emitimos con this.searchTerm$.next(element.value)
  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
  }

  // Metodo que inicia la emision de valores
  start() {
    interval(1000).pipe(
      takeUntil(this.stop$),
      tap((val:number) => this.counter = val)
    ).subscribe((val:number) => console.log(val))
  }

  // Metodo que detiene la emision de valores
  stop() {
    this.stop$.next(0);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

/*
searchTerm$ = new Subject<string>(); -> es como un observable pero tambien puede emitir valores 
manualmente usando next() en este caso se usa para emitir terminos de busqueda como cuando escribes 
algo en el input

results$!: Observable<User>; -> es un observable que emite un User con esto ! le decimos a angular 
"confia en mi voy a asignar esto mas adelante no es ni sera un undefined"


private searchSVC = inject(BuscadorService); -> Este usa el nuevo método de Angular para inyección de 
dependencias sin usar el constructor.

*/