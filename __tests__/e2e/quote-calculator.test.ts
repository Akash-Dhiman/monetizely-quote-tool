import { expect } from '@playwright/test';
import { describe, it } from 'node:test';
import { calculateQuote } from '../../lib/quote-calculator';

describe('Quote Calculator', () => {

    it('should calculate monthly pricing', () => {

        const result = calculateQuote(
            100,
            10,
            'MONTHLY',
            [],
            0
        );

        expect(result.total).toBe(1000);

    });

    it('should apply discount', () => {

        const result = calculateQuote(
            100,
            10,
            'MONTHLY',
            [],
            10
        );

        expect(result.total).toBe(900);

    });

});