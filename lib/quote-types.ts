export interface QuoteCalculationItem {
  label: string;
  description: string;
  amount: number;
}

export interface QuoteCalculationResult {
  subtotal: number;
  discountAmount: number;
  total: number;
  items: QuoteCalculationItem[];
}