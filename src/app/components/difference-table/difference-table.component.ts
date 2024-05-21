import { Component, Input, OnChanges } from '@angular/core';
import { DenominationDifference } from 'src/app/interfaces/denomination-difference';

@Component({
  selector: 'app-difference-table',
  templateUrl: './difference-table.component.html',
  styleUrls: ['./difference-table.component.css'],
})
export class DifferenceTableComponent {
  // Differences mapped to the table
  @Input() differences: DenominationDifference[] = [];

  // Table Columns
  displayedColumns: string[] = ['denomination', 'difference'];
}
