import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RickMortyService } from '../../servicios/rick-morty.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-controlerrores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controlerrores.component.html'
})
export class ControlerroresComponent implements OnInit{

  private dataRickMorty = inject(RickMortyService);

  ngOnInit(): void {
    this.dataRickMorty.getData().pipe(
      tap((res) => console.log('res rickMorty: ', res))
    ).subscribe({
      error: (error) => console.log('Erros Suscribe', error)
    });
  }

  // Codigo a mostrar en el DOM
  code: string = `
  getData(): Observable&lt;Character[]&gt; { 
    return this.http.get&lt;ResponseInfoResults&gt;('https://rickandmortyapi.com/api/character').pipe(
      map((res: ResponseInfoResults) =&gt; res?.results),
      // Tratamientos del error devuelto por la API errores como 404 etc..
      // catchError(() =&gt; of([mockCharacter]))
      // catchError(() =&gt; throwError(() =&gt; new Error('Ups Algo a pasado')))
      catchError(() =&gt; EMPTY)
    );
  }
  `;

}
