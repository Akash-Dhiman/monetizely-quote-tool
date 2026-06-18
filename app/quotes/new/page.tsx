'use client';

import { useEffect, useState } from 'react';
import { calculateQuote } from '@/lib/quote-calculator';
import { QuoteCalculationItem } from '@/lib/quote-types';

export default function NewQuotePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [tiers, setTiers] = useState<any[]>([]);
    const [tierFeatures, setTierFeatures] = useState<any[]>([]);

    const [customerName, setCustomerName] = useState('');
    const [quoteName, setQuoteName] = useState('');

    const [productId, setProductId] = useState('');
    const [tierId, setTierId] = useState('');

    const [seats, setSeats] = useState(1);
    const [discountPct, setDiscountPct] = useState(0);

    const [termLength, setTermLength] = useState<
        'MONTHLY' | 'ANNUAL' | 'TWO_YEAR'
    >('MONTHLY');

    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const [result, setResult] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProducts();
        loadTiers();
        loadTierFeatures();
    }, []);

    const loadProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    const loadTiers = async () => {
        const response = await fetch('/api/tiers');
        const data = await response.json();
        setTiers(data);
    };

    const loadTierFeatures = async () => {
        const response = await fetch('/api/tier-features');
        const data = await response.json();
        setTierFeatures(data);
    };

    const filteredTiers = tiers.filter(
        (tier: any) => tier.productId === productId
    );

    const availableAddons = tierFeatures.filter(
        (item: any) =>
            item.tierId === tierId &&
            item.availability === 'ADDON'
    );

    const calculate = () => {
        const selectedTier = tiers.find(
            (tier: any) => tier.id === tierId
        );

        if (!selectedTier) {
            alert('Please select a tier');
            return;
        }

        const addons: QuoteCalculationItem[] = [];

        availableAddons.forEach((addon: any) => {
            if (selectedAddons.includes(addon.id)) {
                addons.push({
                    label: addon.feature.name,
                    description: addon.pricingModel,
                    amount: Number(addon.priceValue || 0)
                });
            }
        });

        const calculation = calculateQuote(
            Number(selectedTier.basePrice),
            seats,
            termLength,
            addons,
            discountPct
        );

        setResult(calculation);
    };

    const saveQuote = async () => {
        if (!result) return;

        try {
            setSaving(true);

            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerName,
                    quoteName,
                    productId,
                    tierId,
                    seats,
                    discountPct,
                    termLength,
                    totalAmount: result.total
                })
            });

            const quote = await response.json();

            alert(`Quote Saved Successfully!\n${quote.id}`);
            const shareUrl =
                `${window.location.origin}/share/${quote.shareToken}`;

            alert(
                `Quote Saved Successfully`
            );

            navigator.clipboard.writeText(
                shareUrl
            );

            window.open(
                shareUrl,
                '_blank'
            );
        } catch (error) {
            console.error(error);
            alert('Failed to save quote');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-6">
                Create Quote
            </h1>

            <div className="space-y-4">

                <input
                    className="border p-3 rounded w-full"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(e.target.value)
                    }
                />

                <input
                    className="border p-3 rounded w-full"
                    placeholder="Quote Name"
                    value={quoteName}
                    onChange={(e) =>
                        setQuoteName(e.target.value)
                    }
                />

                <select
                    className="border p-3 rounded w-full"
                    value={productId}
                    onChange={(e) => {
                        setProductId(e.target.value);
                        setTierId('');
                        setSelectedAddons([]);
                    }}
                >
                    <option value="">
                        Select Product
                    </option>

                    {products.map((product) => (
                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>
                    ))}
                </select>

                <select
                    className="border p-3 rounded w-full"
                    value={tierId}
                    onChange={(e) => {
                        setTierId(e.target.value);
                        setSelectedAddons([]);
                    }}
                >
                    <option value="">
                        Select Tier
                    </option>

                    {filteredTiers.map((tier: any) => (
                        <option
                            key={tier.id}
                            value={tier.id}
                        >
                            {tier.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    className="border p-3 rounded w-full"
                    placeholder="Seats"
                    value={seats}
                    onChange={(e) =>
                        setSeats(Number(e.target.value))
                    }
                />

                <input
                    type="number"
                    className="border p-3 rounded w-full"
                    placeholder="Discount %"
                    value={discountPct}
                    onChange={(e) =>
                        setDiscountPct(Number(e.target.value))
                    }
                />

                <select
                    className="border p-3 rounded w-full"
                    value={termLength}
                    onChange={(e) =>
                        setTermLength(
                            e.target.value as
                            | 'MONTHLY'
                            | 'ANNUAL'
                            | 'TWO_YEAR'
                        )
                    }
                >
                    <option value="MONTHLY">
                        Monthly
                    </option>

                    <option value="ANNUAL">
                        Annual
                    </option>

                    <option value="TWO_YEAR">
                        Two Year
                    </option>
                </select>

                {availableAddons.length > 0 && (
                    <div>

                        <h3 className="font-semibold mb-2">
                            Add-ons
                        </h3>

                        {availableAddons.map((addon: any) => (
                            <label
                                key={addon.id}
                                className="block"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedAddons.includes(addon.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedAddons([
                                                ...selectedAddons,
                                                addon.id
                                            ]);
                                        } else {
                                            setSelectedAddons(
                                                selectedAddons.filter(
                                                    (x) => x !== addon.id
                                                )
                                            );
                                        }
                                    }}
                                />

                                {' '}
                                {addon.feature.name}
                                {' '}
                                (${addon.priceValue})
                            </label>
                        ))}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Calculate Quote
                </button>

                {result && (
                    <div className="border rounded p-5">

                        <h2 className="font-bold text-xl mb-3">
                            Quote Summary
                        </h2>

                        {result.items.map(
                            (
                                item: any,
                                index: number
                            ) => (
                                <div
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <span>{item.label}</span>

                                    <span>
                                        ${item.amount}
                                    </span>
                                </div>
                            )
                        )}

                        <hr className="my-3" />

                        <div>
                            Subtotal: ${result.subtotal}
                        </div>

                        <div>
                            Discount: ${result.discountAmount}
                        </div>

                        <div className="font-bold text-lg">
                            Total: ${result.total}
                        </div>

                        <button
                            onClick={saveQuote}
                            disabled={saving}
                            className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
                        >
                            {saving
                                ? 'Saving...'
                                : 'Save Quote'}
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}