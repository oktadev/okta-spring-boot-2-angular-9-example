import { TestBed } from '@angular/core/testing';
import { NoteService } from './note.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });

    service = TestBed.get(NoteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
