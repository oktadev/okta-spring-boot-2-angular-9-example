import { Component, OnInit } from '@angular/core';
import { NoteFilter } from '../note-filter';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: 'note-list.component.html'
})
export class NoteListComponent implements OnInit {

  filter = new NoteFilter();
  selectedNote: Note;
  feedback: any = {};

  get noteList(): Note[] {
    return this.noteService.noteList;
  }

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.noteService.load(this.filter);
  }

  select(selected: Note): void {
    this.selectedNote = selected;
  }

  delete(note: Note): void {
    if (confirm('Are you sure?')) {
      this.noteService.delete(note).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
