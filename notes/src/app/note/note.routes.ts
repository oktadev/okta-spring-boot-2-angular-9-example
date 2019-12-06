import { Routes } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

export const NOTE_ROUTES: Routes = [
  {
    path: 'notes',
    component: NoteListComponent
  },
  {
    path: 'notes/:id',
    component: NoteEditComponent
  }
];
