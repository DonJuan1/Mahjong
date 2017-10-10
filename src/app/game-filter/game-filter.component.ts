import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-game-filter',
  templateUrl: './game-filter.component.html',
})
export class GameFilterComponent implements OnInit {

  //Event fired when a filter is changed
  @Output() filtered: EventEmitter<any> = new EventEmitter();

  createdByMe: boolean;
  joinedByMe: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.createdByMe = false
    this.joinedByMe = false
  }

  //Change state of the filter and emit the filtered event
  toggle() {
    let filters = {
      createdByMe: this.createdByMe,
      joinedByMe: this.joinedByMe
    }

    this.filtered.emit(filters);
  }
}
