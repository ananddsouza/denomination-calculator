import { Component, Input, OnChanges } from '@angular/core';
import { Denomination } from 'src/app/interfaces/denomination';

@Component({
  selector: 'app-denomination-table',
  templateUrl: './denomination-table.component.html',
  styleUrls: ['./denomination-table.component.css'],
})
export class DenominationTableComponent {
  // Denominations mapped to the table component
  @Input() denominations: Denomination[] = [];

  // Table columns
  displayedColumns: string[] = ['denomination', 'quantity'];
}
