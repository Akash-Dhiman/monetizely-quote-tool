'use client';

import { useState } from 'react';

export default function FeatureForm({
    onCreated
}: {
    onCreated: () => void;
}) {

    const [name, setName] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const createFeature =
        async () => {

            if (!name.trim()) return;

            setLoading(true);

            try {

                await fetch('/api/features', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name
                    })
                });

                setName('');

                onCreated();

            } finally {

                setLoading(false);

            }
        };

    return (

        <div className="bg-white border rounded-2xl shadow-sm p-6">

            <h2 className="text-xl font-bold mb-2">
                Create Feature
            </h2>

            <p className="text-slate-500 mb-5">
                Create reusable platform features
            </p>

            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                placeholder="Feature Name"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={createFeature}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700"
            >
                {loading
                    ? 'Creating...'
                    : 'Create Feature'}
            </button>

        </div>

    );
}