import { TERM_DISCOUNTS } from './constants';
import {
    QuoteCalculationItem,
    QuoteCalculationResult
} from './quote-types';

export function calculateQuote(
    basePricePerSeat: number,
    seats: number,
    term: 'MONTHLY' | 'ANNUAL' | 'TWO_YEAR',
    addons: QuoteCalculationItem[],
    quoteDiscountPercent: number
): QuoteCalculationResult {

    const items: QuoteCalculationItem[] = [];

    let subtotal = 0;

    const baseAmount =
        basePricePerSeat *
        seats;

    const termDiscount =
        TERM_DISCOUNTS[term];

    const discountedBaseAmount =
        baseAmount -
        (baseAmount * termDiscount) / 100;

    items.push({
        label: 'Base Product',
        description:
            `${seats} seats × $${basePricePerSeat}`,
        amount: discountedBaseAmount
    });

    subtotal += discountedBaseAmount;

    addons.forEach((addon) => {
        subtotal += addon.amount;
        items.push(addon);
    });

    const discountAmount =
        (subtotal * quoteDiscountPercent) / 100;

    const total =
        subtotal -
        discountAmount;

    return {
        subtotal,
        discountAmount,
        total,
        items
    };
}