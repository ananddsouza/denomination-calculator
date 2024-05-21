import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  // Amounts to be displayed in History Tracker
  @Input() amounts: number[] = [];

  constructor() {}
}
