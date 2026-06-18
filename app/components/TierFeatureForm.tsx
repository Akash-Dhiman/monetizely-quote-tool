'use client';

import { useState } from 'react';

export default function TierFeatureForm({
    tiers,
    features,
    onCreated
}: any) {

    const [tierId, setTierId] =
        useState('');

    const [featureId, setFeatureId] =
        useState('');

    const [availability,
        setAvailability] =
        useState('INCLUDED');

    const [pricingModel,
        setPricingModel] =
        useState('FIXED_MONTHLY');

    const [priceValue,
        setPriceValue] =
        useState('');

    const [loading,
        setLoading] =
        useState(false);

    const save =
        async () => {

            if (!tierId || !featureId) {
                return;
            }

            setLoading(true);

            try {

                await fetch(
                    '/api/tier-features',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify({
                            tierId,
                            featureId,
                            availability,
                            pricingModel,
                            priceValue:
                                Number(priceValue)
                        })
                    }
                );

                setPriceValue('');

                onCreated();

            } finally {

                setLoading(false);

            }
        };

    return (

        <div className="bg-white border rounded-2xl shadow-sm p-6">

            <h2 className="text-xl font-bold mb-2">
                Tier Feature Mapping
            </h2>

            <p className="text-slate-500 mb-5">
                Attach features to pricing tiers
            </p>

            <div className="space-y-4">

                <select
                    className="w-full border rounded-xl px-4 py-3"
                    value={tierId}
                    onChange={(e) =>
                        setTierId(e.target.value)
                    }
                >
                    <option value="">
                        Select Tier
                    </option>

                    {tiers.map((tier: any) => (

                        <option
                            key={tier.id}
                            value={tier.id}
                        >
                            {tier.name}
                        </option>

                    ))}
                </select>

                <select
                    className="w-full border rounded-xl px-4 py-3"
                    value={featureId}
                    onChange={(e) =>
                        setFeatureId(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Select Feature
                    </option>

                    {features.map(
                        (feature: any) => (

                            <option
                                key={feature.id}
                                value={feature.id}
                            >
                                {feature.name}
                            </option>

                        )
                    )}
                </select>

                <select
                    className="w-full border rounded-xl px-4 py-3"
                    value={availability}
                    onChange={(e) =>
                        setAvailability(
                            e.target.value
                        )
                    }
                >
                    <option value="INCLUDED">
                        Included
                    </option>

                    <option value="ADDON">
                        Add-On
                    </option>

                    <option value="NOT_AVAILABLE">
                        Not Available
                    </option>
                </select>

                <select
                    className="w-full border rounded-xl px-4 py-3"
                    value={pricingModel}
                    onChange={(e) =>
                        setPricingModel(
                            e.target.value
                        )
                    }
                >
                    <option value="FIXED_MONTHLY">
                        Fixed Monthly
                    </option>

                    <option value="PER_SEAT">
                        Per Seat
                    </option>

                    <option value="PERCENT_OF_PRODUCT">
                        Percent Of Product
                    </option>
                </select>

                <input
                    type="number"
                    value={priceValue}
                    onChange={(e) =>
                        setPriceValue(
                            e.target.value
                        )
                    }
                    placeholder="Price Value"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <button
                    onClick={save}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white rounded-xl py-3 font-medium hover:bg-indigo-700"
                >
                    {loading
                        ? 'Saving...'
                        : 'Save Mapping'}
                </button>

            </div>

        </div>

    );
}