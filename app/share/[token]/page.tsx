'use client';

import {
    useEffect,
    useState
} from 'react';

export default function ShareQuotePage(
    {
        params
    }: {
        params: Promise<{
            token: string;
        }>
    }
) {

    const [quote,
        setQuote] =
        useState<any>(null);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        loadQuote();

    }, []);

    const loadQuote =
        async () => {

            try {

                const {
                    token
                } = await params;

                const response =
                    await fetch(
                        `/api/quotes/${token}`
                    );

                const data =
                    await response.json();

                setQuote(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );

            } finally {

                setLoading(
                    false
                );

            }

        };

    if (loading) {

        return (
            <div className="max-w-4xl mx-auto p-10">
                Loading Quote...
            </div>
        );

    }

    if (!quote) {

        return (
            <div className="max-w-4xl mx-auto p-10">
                Quote Not Found
            </div>
        );

    }

    return (

        <div className="max-w-4xl mx-auto p-10">

            <div className="border rounded-lg p-8">

                <h1 className="text-4xl font-bold mb-6">
                    Monetizely Quote
                </h1>

                <div className="space-y-3">

                    <div>
                        <strong>
                            Customer:
                        </strong>
                        {' '}
                        {quote.customerName}
                    </div>

                    <div>
                        <strong>
                            Quote:
                        </strong>
                        {' '}
                        {quote.quoteName}
                    </div>

                    <div>
                        <strong>
                            Product:
                        </strong>
                        {' '}
                        {quote?.productId}
                    </div>

                    <div>
                        <strong>
                            Tier:
                        </strong>
                        {' '}
                        {quote?.tierId}
                    </div>

                    <div>
                        <strong>
                            Seats:
                        </strong>
                        {' '}
                        {quote.seats}
                    </div>

                    <div>
                        <strong>
                            Term:
                        </strong>
                        {' '}
                        {quote.termLength}
                    </div>

                    <div>
                        <strong>
                            Discount:
                        </strong>
                        {' '}
                        {quote.discountPct}%
                    </div>

                </div>

                <hr className="my-6" />

                <div className="text-3xl font-bold text-green-600">

                    Total:
                    {' '}
                    $
                    {Number(
                        quote.totalAmount
                    ).toFixed(2)}

                </div>

            </div>

        </div>

    );
}