'use client';

import { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    description: string | null;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const loadProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    const createProduct = async () => {
        if (!name.trim()) return;

        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
            }),
        });

        setName('');
        setDescription('');

        await loadProducts();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">
                Product Catalog
            </h1>

            <div className="space-y-3 mb-8">
                <input
                    className="border p-2 w-full"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    className="border p-2 w-full"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    onClick={createProduct}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Save Product
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

                {products.map((product: any) => (

                    <div
                        key={product.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >

                        <h3 className="font-semibold text-lg">
                            {product.name}
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Product
                        </p>

                    </div>

                ))}

            </div>
        </div>
    );
}