'use client';

import { useEffect, useState } from 'react';

import Header from '../components/Header';
import EmptyState from '../components/EmptyState';

import ProductForm from '../components/ProductForm';
import TierForm from '../components/TierForm';
import FeatureForm from '../components/FeatureForm';
import TierFeatureForm from '../components/TierFeatureForm';

interface Product {
    id: string;
    name: string;
}

export default function CatalogPage() {

    const [products, setProducts] =
        useState<Product[]>([]);

    const [tiers, setTiers] =
        useState<any[]>([]);

    const [features, setFeatures] =
        useState<any[]>([]);

    const [tierFeatures, setTierFeatures] =
        useState<any[]>([]);

    const loadProducts = async () => {

        const response =
            await fetch('/api/products');

        const data =
            await response.json();

        setProducts(data);
    };

    const loadTiers = async () => {

        const response =
            await fetch('/api/tiers');

        const data =
            await response.json();

        setTiers(data);
    };

    const loadFeatures = async () => {

        const response =
            await fetch('/api/features');

        const data =
            await response.json();

        setFeatures(data);
    };

    const loadTierFeatures = async () => {

        const response =
            await fetch('/api/tier-features');

        const data =
            await response.json();

        setTierFeatures(data);
    };

    useEffect(() => {

        loadProducts();
        loadTiers();
        loadFeatures();
        loadTierFeatures();

    }, []);

    return (

        <div className="space-y-8">

            <Header
                title="Catalog Management"
                description="Manage Products, Tiers, Features & Pricing"
            />

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="text-slate-500">
                        Products
                    </div>

                    <div className="text-3xl font-bold mt-2">
                        {products.length}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="text-slate-500">
                        Tiers
                    </div>

                    <div className="text-3xl font-bold mt-2">
                        {tiers.length}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="text-slate-500">
                        Features
                    </div>

                    <div className="text-3xl font-bold mt-2">
                        {features.length}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="text-slate-500">
                        Mappings
                    </div>

                    <div className="text-3xl font-bold mt-2">
                        {tierFeatures.length}
                    </div>
                </div>

            </div>

            {/* Forms */}

            <div className="grid lg:grid-cols-2 gap-6">

                <ProductForm
                    onCreated={loadProducts}
                />

                <TierForm
                    products={products}
                    onCreated={loadTiers}
                />

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <FeatureForm
                    onCreated={loadFeatures}
                />

                <TierFeatureForm
                    tiers={tiers}
                    features={features}
                    onCreated={loadTierFeatures}
                />

            </div>

            {/* Products */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-bold mb-4">
                    Products
                </h2>

                {products.length === 0 ? (
                    <EmptyState title="No Products Found" />
                ) : (

                    <div className="grid md:grid-cols-3 gap-4">

                        {products.map((product) => (

                            <div
                                key={product.id}
                                className="border rounded-xl p-4 hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-lg">
                                    {product.name}
                                </h3>

                                <p className="text-slate-500 mt-2">
                                    SaaS Product
                                </p>
                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* Tiers */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-bold mb-4">
                    Pricing Tiers
                </h2>

                {tiers.length === 0 ? (
                    <EmptyState title="No Tiers Found" />
                ) : (

                    <div className="grid md:grid-cols-3 gap-4">

                        {tiers.map((tier: any) => (

                            <div
                                key={tier.id}
                                className="border rounded-xl p-4"
                            >

                                <h3 className="font-semibold text-lg">
                                    {tier.name}
                                </h3>

                                <div className="text-green-600 font-bold mt-2">
                                    ${tier.basePrice}
                                    /seat
                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* Features */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-bold mb-4">
                    Features
                </h2>

                {features.length === 0 ? (
                    <EmptyState title="No Features Found" />
                ) : (

                    <div className="grid md:grid-cols-4 gap-4">

                        {features.map((feature: any) => (

                            <div
                                key={feature.id}
                                className="border rounded-xl p-4"
                            >
                                <div className="font-medium">
                                    {feature.name}
                                </div>
                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* Tier Feature Matrix */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-bold mb-6">
                    Tier Feature Mapping
                </h2>

                {tierFeatures.length === 0 ? (
                    <EmptyState title="No Mappings Found" />
                ) : (

                    <div className="overflow-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left p-3">
                                        Tier
                                    </th>

                                    <th className="text-left p-3">
                                        Feature
                                    </th>

                                    <th className="text-left p-3">
                                        Availability
                                    </th>

                                    <th className="text-left p-3">
                                        Pricing
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {tierFeatures.map((item: any) => (

                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {item.tier?.name}
                                        </td>

                                        <td className="p-3">
                                            {item.feature?.name}
                                        </td>

                                        <td className="p-3">

                                            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">

                                                {item.availability}

                                            </span>

                                        </td>

                                        <td className="p-3">

                                            {item.pricingModel}

                                            {' '}

                                            (${item.priceValue})

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Products
                    </h2>

                    <div className="space-y-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-xl p-4"
                            >
                                <div className="font-semibold">
                                    {product.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Pricing Tiers
                    </h2>

                    <div className="space-y-3">
                        {tiers.map((tier: any) => (
                            <div
                                key={tier.id}
                                className="border rounded-xl p-4"
                            >
                                <div className="font-semibold">
                                    {tier.name}
                                </div>

                                <div className="text-green-600">
                                    ${tier.basePrice}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-bold mb-4">
                    Features
                </h2>

                <div className="grid md:grid-cols-3 gap-3">

                    {features.map((feature: any) => (

                        <div
                            key={feature.id}
                            className="border rounded-xl p-4"
                        >
                            {feature.name}
                        </div>

                    ))}

                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-bold mb-4">
                    Feature Mapping
                </h2>

                <div className="space-y-3">

                    {tierFeatures.map((item: any) => (

                        <div
                            key={item.id}
                            className="border rounded-xl p-4 flex justify-between"
                        >

                            <div>
                                {item.tier?.name}
                            </div>

                            <div>
                                {item.feature?.name}
                            </div>

                            <div className="text-blue-600">
                                {item.availability}
                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}