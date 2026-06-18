import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

    try {

        const [
            productCount,
            tierCount,
            featureCount,
            quoteCount,
            recentProducts,
            recentQuotes
        ] = await Promise.all([

            prisma.product.count(),

            prisma.tier.count(),

            prisma.feature.count(),

            prisma.quote.count(),

            prisma.product.findMany({
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                }
            }),

            prisma.quote.findMany({
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                }
            })

        ]);

        return NextResponse.json({
            stats: {
                productCount,
                tierCount,
                featureCount,
                quoteCount
            },
            recentProducts,
            recentQuotes
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: 'Failed To Load Dashboard'
            },
            {
                status: 500
            }
        );
    }
}