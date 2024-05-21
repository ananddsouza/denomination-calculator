import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComputeData } from 'src/app/interfaces/compute-data';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css'],
})
export class CalculateComponent {
  // Output Events - these events are used in app component
  @Output() calculateEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();

  // Component specific variables
  amount: number | null = null;
  isCalculateOnServer: boolean = false;
  computeData: ComputeData = {
    currentAmount: 0,
    isCalculateOnServer: false,
    previousAmount: 0,
  };

  amountControl = new FormControl('', [
    Validators.pattern(/^\d+(\.\d{1,2})?$/),
  ]);

  /*   Calculate Denominations - takes the input amount and sets the values for 
compute data triggers the emit of calculate event which is present in app 
component */
  calculateDenominations(): void {
    if (this.amount !== null) {
      this.computeData.currentAmount = this.amount;
      this.computeData.isCalculateOnServer = this.isCalculateOnServer;
      this.calculateEvent.emit(this.computeData);
    }
  }

  // Reset Page method - resets the fields and buttons to original status
  resetPage() {
    this.amount = null;
    this.isCalculateOnServer = false;
    this.resetEvent.emit(true);
  }

  // This method validates input entered in the input field
  validateInput(event: any) {
    let inputValue: string = event.target.value;
    const regex = /^\d*\.?\d{0,2}$/;

    // Disallow negative numbers and 'e'
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Remove extra decimal points and limit decimal places to two
    const parts = inputValue.split('.');
    if (parts.length > 2) {
      inputValue = parts[0] + '.' + parts[1].slice(0, 2);
    } else if (parts.length === 2 && parts[1].length > 2) {
      inputValue = parts[0] + '.' + parts[1].slice(0, 2);
    }

    // Validate against the regex pattern
    if (!regex.test(inputValue)) {
      inputValue = inputValue.slice(0, -1);
    }

    // Update input value and form control
    event.target.value = inputValue;
    this.amount = inputValue ? parseFloat(inputValue) : null;
    this.amountControl.setValue(inputValue, { emitEvent: false });
  }
}
