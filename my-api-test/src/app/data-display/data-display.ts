import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { catchError, throwError } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-display.html',
  styleUrl: './data-display.css'
})


export class DataDisplay implements OnInit{

  posts: Post[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(){
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .pipe(
        catchError(err => {
          this.error = "Hiba!";
          console.error('Api error!', err);
          return throwError(() => new Error('Datamanagement error occured!'));
        }
      )
    )
    .subscribe(data => {
      this.posts = data.slice(0, 5);
      this.error = null;
    })
  }

}
