import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-game-filter',
  templateUrl: './game-filter.component.html',
  styleUrls: ['./game-filter.component.scss'],
})
export class GameFilterComponent implements OnInit {

  @Output() filtered: EventEmitter<any> = new EventEmitter();

  createdByMe: boolean;
  joinedByMe: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.createdByMe = false
    this.joinedByMe = false
  }

  toggle() {
    let filters = {
      createdByMe: this.createdByMe,
      joinedByMe: this.joinedByMe
    }

    this.filtered.emit(filters);
  }
}
