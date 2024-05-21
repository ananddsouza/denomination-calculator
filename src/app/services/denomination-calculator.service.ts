import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denomination } from '../interfaces/denomination';
import { DenominationDifference } from '../interfaces/denomination-difference';
import { CalculationResult } from '../interfaces/calculation-result';
import { Observable } from 'rxjs';
import { ComputeData } from '../interfaces/compute-data';

@Injectable({
  providedIn: 'root',
})
export class DenominationCalculatorService {
  // Variables
  // array to keep track of previous denominations
  private previousDenominations: Denomination[] = [];
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // API URL to fetch calculated results
  private apiUrl = 'http://localhost:8080/api/denominations';

  constructor(private http: HttpClient) {}

  // Method to calculate denominations - this method works on client side
  calculateDenominations(amount: number): Denomination[] {
    // Euro denominations
    const euroDenominations: number[] = [
      200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01,
    ];

    /*     A reduce operation to to calculate quantity of each denomination - 
    loops through each denomination we have and subsequenctly calculates 
    the accumulated value */
    const result = euroDenominations.reduce(
      (acc: Denomination[], denomination: number) => {
        const quantity = Math.floor(amount / denomination);
        if (quantity > 0) {
          acc.push({ denomination, quantity });
          amount = parseFloat((amount % denomination).toFixed(2));
        }
        return acc;
      },
      []
    );

    // Debug/User friendly layout to print denomiantions
    console.table(result);
    return result;
  }

  /*  A specific method to calculate differences between current amount
  denominations and previous amount denominations - Returns a
  DenominationDifference type */
  calculateDifferences(
    previous: Denomination[],
    current: Denomination[]
  ): DenominationDifference[] {
    // get all denominations of current and previous amounts
    const allDenominations = [
      ...new Set([
        ...previous.map((d) => d.denomination),
        ...current.map((d) => d.denomination),
      ]),
    ];

    /*     A reduce function to calculate the differences between each 
    denomination of current and previous amounts - Returns the value of
     differences and assign it to the result variable */
    const result = allDenominations.reduce(
      (acc: DenominationDifference[], denomination) => {
        const prevDenomination = previous.find(
          (d) => d.denomination === denomination
        );
        const currDenomination = current.find(
          (d) => d.denomination === denomination
        );
        const difference =
          (currDenomination ? currDenomination.quantity : 0) -
          (prevDenomination ? prevDenomination.quantity : 0);

        acc.push({ denomination, difference: difference.toString() });

        return acc;
      },
      []
    );

    // Debug/User friendly layout to print differences
    console.table(result);
    return result;
  }

  // calculate Method - Entry point of calculate implementation on client side
  calculateDenominationsOnClient(computeData: ComputeData): CalculationResult {
    // Calculate current denominations - uses calculateDenominations method
    const currentDenominations = this.calculateDenominations(
      computeData.currentAmount
    );

    // formulate result
    const result: CalculationResult = { denominations: currentDenominations };
    const previousDenominations = this.calculateDenominations(
      computeData.previousAmount
    );

    /*  if there are any previous denominations, calculate differences and 
   set result differences value - uses calculateDifferences method */
    // if (this.previousDenominations.length > 0) {
    result.differences = this.calculateDifferences(
      previousDenominations,
      currentDenominations
    );

    /*  sort the differences by denominations in descending order - 
      biggest denomination first */
    result.differences = result.differences.sort(
      (a, b) => b.denomination - a.denomination
    );
    // }

    // update previous denominations
    this.previousDenominations = currentDenominations;

    // return result
    return result;
  }

  /*   Method to calculate denominations on server - takes the amount as input 
from the input field - Returns an observable of CalculationResult type */
  calculateDenominationsOnServer(
    computeData: any
  ): Observable<CalculationResult> {
    // Http POST call with required params
    return this.http.post<CalculationResult>(this.apiUrl, computeData);
  }

  // reset previous denominations
  reset() {
    this.previousDenominations = [];
  }
}
