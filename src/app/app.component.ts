import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { VERSION } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { DenominationCalculatorService } from './services/denomination-calculator.service';
import { CalculationResult } from './interfaces/calculation-result';
import { Denomination } from './interfaces/denomination';
import { DenominationDifference } from './interfaces/denomination-difference';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  // Variables
  denominations: Denomination[] = [];
  differences: DenominationDifference[] = [];
  amountHistory: number[] = [];
  amounts: number[] = [];
  calculationResult: CalculationResult | undefined;
  title: string = 'Denomination Calculator';

  // display resolution identification flag
  isMobile: boolean = false;

  // Angulr Version
  angularVersion: any = VERSION.full;

  // reset form flag
  isReset: boolean = false;

  // display message
  message: string = '';

  /*  when no previous amounts exist, 0 is considered as previous amount for
  calculation purposes */
  previousAmountDefault: number = 0;

  // Variables to operate for display terminal ouput
  informationText: string = '';
  currentIndex: number = 0;

  // Constructor
  constructor(
    private calculatorService: DenominationCalculatorService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    /*  the following lines observe the device display width and adjust
    the isMobile flag - this flag is used to shift/change the layout 
    accordingly */
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  // reset page - resets page to original state
  resetPage(resetValue: any) {
    // update isReset from the user input
    this.isReset = resetValue;

    // if reset is true, reset all values to original state
    if (this.isReset) {
      this.denominations = [];
      this.differences = [];
      this.amountHistory = [];
      this.message = '';
      this.previousAmountDefault = 0;
      this.calculatorService.reset();
      this.resetConsoleMessage(this.message);
    }
  }

  /* handleCalculate - this method decides how to calculate the denominations -
   either use client or server implementation based on the isCalculateOnServer 
   flag */
  handleCalculate(computeData: any): void {
    /* set isReset explicitly to false so that the calculate method
     executes and results are formualted properly */
    this.isReset = false;

    // get previous amount
    computeData.previousAmount = this.amountHistory.at(-1)
      ? this.amountHistory.at(-1)
      : this.previousAmountDefault;

    // transform amount formats
    computeData.currentAmount = this.transformToTwoDecimals(
      computeData.currentAmount
    );
    computeData.previousAmount = this.transformToTwoDecimals(
      computeData.previousAmount
    );

    /*  if isCalculateOnServer flag is true - 
    call server method(calculateDenominationsOnServer) to calculate 
    denominations, 
    else - 
    calculate them on client(calculateDenominationsOnClient)
    After each calculation, pass the result to processResult method */
    if (computeData.isCalculateOnServer) {
      this.calculatorService
        .calculateDenominationsOnServer(computeData)
        .subscribe({
          next: (result) => {
            this.calculationResult = result;
            this.message = '✅' + 'SUCCESS: Computation successful.';
            this.resetConsoleMessage(this.message);
            this.processResult(this.calculationResult);
          },
          error: (error) => {
            this.message = '⛔️ ' + 'ERROR: ' + error.message;
            this.resetConsoleMessage(this.message);
          },
          complete: () => {
            console.log('Calculation complete.');
          },
        });
    } else {
      this.calculationResult =
        this.calculatorService.calculateDenominationsOnClient(computeData);
      this.message = '✅ ' + 'SUCCESS: Computation successful.';
      this.resetConsoleMessage(this.message);
      this.processResult(this.calculationResult);
    }

    // Update amount history
    this.amountHistory.push(computeData.currentAmount);
  }

  // startTyping - Used to emulate typewriter effect in the terminal div
  startTyping(message: string) {
    if (this.currentIndex <= message.length) {
      this.informationText += message.charAt(this.currentIndex);
      this.currentIndex++;

      // Adjust typing speed here
      setTimeout(() => this.startTyping(message), 20);
    }
  }

  /*  processResult - accepts a CalculationResult and based on reset events,
  sets the values of differences and denominations */
  processResult(result: CalculationResult) {
    if (this.isReset) {
      this.denominations = [];
      this.differences = [];
    } else {
      this.denominations = result.denominations;
      this.differences = result.differences || [];
    }
  }

  /*  transformToTwoDecimals - Transformation method to transform any input 
  number to a number with two decimals */
  transformToTwoDecimals(number: number) {
    // Convert the number to a string and split it by the decimal point
    let [integerPart, decimalPart = ''] = number.toString().split('.');

    // Ensure the decimal part has exactly two digits
    decimalPart = decimalPart.slice(0, 2).padEnd(2, '0');

    // Combine the integer part and the formatted decimal part
    let formattedNumber = `${integerPart}.${decimalPart}`;

    // Parse the formatted number back to a floating-point number and return
    return parseFloat(formattedNumber);
  }

  // resetConsoleMessage - resets terminal console message
  resetConsoleMessage(consoleMessage: string) {
    this.informationText = '';
    this.currentIndex = 0;
    this.startTyping(consoleMessage);
  }
}
