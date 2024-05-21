import { Denomination } from './denomination';
import { DenominationDifference } from './denomination-difference';

// Interface - Calculation Result
export interface CalculationResult {
  denominations: Denomination[];
  differences?: DenominationDifference[];
}
