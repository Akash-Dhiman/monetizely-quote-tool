'use client';

import { useState } from 'react';

interface Props {
    onCreated: () => void;
}

export default function ProductForm({
    onCreated
}: Props) {

    const [name, setName] =
        useState('');

    const createProduct =
        async () => {

            if (!name.trim()) return;

            await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                body: JSON.stringify({
                    name
                })
            });

            setName('');

            onCreated();
        };

    return (
        <div className="border p-4 rounded">
            <input
                className="border p-2 w-full"
                placeholder="Product Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <button
                onClick={createProduct}
                className="mt-3 bg-black text-white px-4 py-2 rounded"
            >
                Create Product
            </button>
        </div>
    );
}