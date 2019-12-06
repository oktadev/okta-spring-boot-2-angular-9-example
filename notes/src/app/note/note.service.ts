import { Note } from './note';
import { NoteFilter } from './note-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class NoteService {
  noteList: Note[] = [];

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Note> {
    const url = `http://localhost:8080/api/notes/${id}`;
    const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Note>(url, {params, headers});
  }

  load(filter: NoteFilter): void {
    this.find(filter).subscribe(result => {
        this.noteList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: NoteFilter): Observable<Note[]> {
    const url = `http://localhost:8080/user/notes`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {
      title: filter.title,
    };

    return this.http.get<Note[]>(url, {params, headers});
  }

  save(entity: Note): Observable<Note> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://localhost:8080/api/notes/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Note>(url, entity, {headers, params});
    } else {
      url = `http://localhost:8080/api/notes`;
      return this.http.post<Note>(url, entity, {headers, params});
    }
  }

  delete(entity: Note): Observable<Note> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://localhost:8080/api/notes/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Note>(url, {headers, params});
    }
    return null;
  }
}

