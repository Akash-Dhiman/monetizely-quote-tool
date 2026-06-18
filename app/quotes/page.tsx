'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function QuotesPage() {

    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadQuotes();
    }, []);

    const loadQuotes = async () => {

        try {

            const response =
                await fetch('/api/quotes');

            const data =
                await response.json();

            setQuotes(data);

        } finally {

            setLoading(false);

        }
    };

    const filteredQuotes =
        quotes.filter((quote) =>
            quote.quoteName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            quote.customerName
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    const copyShareLink = (
        shareToken: string
    ) => {

        const link =
            `${window.location.origin}/share/${shareToken}`;

        navigator.clipboard.writeText(link);

        alert('Share link copied');
    };

    return (

        <div className="space-y-6">

            <Header
                title="Quotes"
                description="Manage all customer quotes"
            />

            <div className="bg-white border rounded-2xl p-5">

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search Quotes..."
                    className="w-full border rounded-xl p-3"
                />

            </div>

            {loading && (

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="h-40 rounded-2xl bg-slate-200 animate-pulse"
                        />

                    ))}

                </div>

            )}

            {!loading &&
                filteredQuotes.length === 0 && (

                    <div className="bg-white rounded-2xl border p-12 text-center">

                        <h2 className="text-xl font-semibold">
                            No Quotes Found
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Create your first quote.
                        </p>

                    </div>

                )}

            {!loading &&
                filteredQuotes.length > 0 && (

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredQuotes.map(
                            (quote: any) => (

                                <div
                                    key={quote.id}
                                    className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition"
                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h3 className="font-bold text-lg">
                                                {quote.quoteName}
                                            </h3>

                                            <p className="text-slate-500">
                                                {quote.customerName}
                                            </p>

                                        </div>

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                            Active
                                        </span>

                                    </div>

                                    <div className="mt-6">

                                        <p className="text-slate-500 text-sm">
                                            Quote Value
                                        </p>

                                        <p className="text-3xl font-bold text-blue-600">

                                            $
                                            {Number(
                                                quote.totalAmount
                                            ).toLocaleString()}

                                        </p>

                                    </div>

                                    <div className="mt-6 flex gap-2">

                                        <a
                                            href={`/share/${quote.shareToken}`}
                                            target="_blank"
                                            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-xl"
                                        >
                                            Open
                                        </a>

                                        <button
                                            onClick={() =>
                                                copyShareLink(
                                                    quote.shareToken
                                                )
                                            }
                                            className="flex-1 border rounded-xl"
                                        >
                                            Copy Link
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

        </div>

    );
}