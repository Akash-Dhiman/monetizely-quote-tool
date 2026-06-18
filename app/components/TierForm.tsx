'use client';

import { useState } from 'react';

interface Product {
    id: string;
    name: string;
}

interface Props {
    products: Product[];
    onCreated: () => void;
}

export default function TierForm({
    products,
    onCreated
}: Props) {

    const [name, setName] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [productId, setProductId] = useState('');

    const createTier = async () => {

        if (!name || !productId) {
            return;
        }

        await fetch('/api/tiers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                basePrice: Number(basePrice),
                productId
            })
        });

        setName('');
        setBasePrice('');

        onCreated();
    };

    return (
        <div className="border p-4 rounded mt-6">

            <h3 className="font-semibold mb-3">
                Create Tier
            </h3>

            <select
                className="border p-2 w-full mb-3"
                value={productId}
                onChange={(e) =>
                    setProductId(e.target.value)
                }
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

            <input
                className="border p-2 w-full mb-3"
                placeholder="Tier Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <input
                className="border p-2 w-full mb-3"
                placeholder="Base Price Per Seat"
                type="number"
                value={basePrice}
                onChange={(e) =>
                    setBasePrice(e.target.value)
                }
            />

            <button
                onClick={createTier}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Create Tier
            </button>
        </div>
    );
}