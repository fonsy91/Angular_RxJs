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

}
