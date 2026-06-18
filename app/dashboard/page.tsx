'use client';

import {
    useEffect,
    useState
} from 'react';

interface DashboardData {
    stats: {
        productCount: number;
        tierCount: number;
        featureCount: number;
        quoteCount: number;
    };

    recentProducts: any[];

    recentQuotes: any[];
}

export default function DashboardPage() {

    const [data,
        setData] =
        useState<DashboardData | null>(
            null
        );

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard =
        async () => {

            try {

                const response =
                    await fetch(
                        '/api/dashboard'
                    );

                const dashboard =
                    await response.json();

                setData(
                    dashboard
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(
                    false
                );
            }
        };

    if (loading) {
        return (
            <div className="space-y-6">

                <div className="h-12 bg-slate-200 rounded animate-pulse" />

                <div className="grid grid-cols-4 gap-6">

                    {[1, 2, 3, 4].map(
                        (item) => (
                            <div
                                key={item}
                                className="h-32 bg-slate-200 rounded-xl animate-pulse"
                            />
                        )
                    )}

                </div>

            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    Monetizely Quote Builder
                </p>

            </div>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <p className="text-slate-500 text-sm">
                        Products
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data?.stats.productCount}
                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <p className="text-slate-500 text-sm">
                        Tiers
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data?.stats.tierCount}
                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <p className="text-slate-500 text-sm">
                        Features
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data?.stats.featureCount}
                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <p className="text-slate-500 text-sm">
                        Quotes
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data?.stats.quoteCount}
                    </h2>

                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Recent Products
                    </h2>

                    {data?.recentProducts.length === 0 ? (

                        <p className="text-slate-500">
                            No Products Found
                        </p>

                    ) : (

                        data?.recentProducts.map(
                            (product: any) => (

                                <div
                                    key={product.id}
                                    className="py-3 border-b"
                                >

                                    <div className="font-medium">
                                        {product.name}
                                    </div>

                                    <div className="text-sm text-slate-500">
                                        {product.description || 'No Description'}
                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Recent Quotes
                    </h2>

                    {data?.recentQuotes.length === 0 ? (

                        <p className="text-slate-500">
                            No Quotes Found
                        </p>

                    ) : (

                        data?.recentQuotes.map(
                            (quote: any) => (

                                <div
                                    key={quote.id}
                                    className="py-3 border-b"
                                >

                                    <div className="font-medium">
                                        {quote.quoteName}
                                    </div>

                                    <div className="text-sm text-slate-500">
                                        {quote.customerName}
                                    </div>

                                    <div className="text-green-600 font-semibold mt-1">
                                        $
                                        {Number(
                                            quote.totalAmount
                                        ).toLocaleString()}
                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            </div>

        </div>
    );
}