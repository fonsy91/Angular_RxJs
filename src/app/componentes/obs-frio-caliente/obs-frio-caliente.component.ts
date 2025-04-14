import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-obs-frio-caliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './obs-frio-caliente.component.html',
})
export class ObsFrioCalienteComponent implements OnInit{

  // Observable frio
  data!: Observable<Post>;
  private http = inject(HttpClient);

  // Observable caliente
  counter = 0;
  private intervalSubscription!: Subscription;

  ngOnInit(): void {
    // Observable frio
    this.data = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
  }

  // Metodos para observable caliente
  start() {
    this.intervalSubscription = interval(1000).subscribe(value => {
      this.counter = value;
    });
  }
  
  stop() {
    // Paramos la emision del observable
    this.intervalSubscription.unsubscribe();

  }

}
