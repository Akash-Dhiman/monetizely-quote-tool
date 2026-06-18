import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const tiers = await prisma.tier.findMany({
        include: {
            product: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json(tiers);
}

export async function POST(request: Request) {
    const body = await request.json();

    const tier = await prisma.tier.create({
        data: {
            name: body.name,
            basePrice: body.basePrice,
            productId: body.productId
        }
    });

    return NextResponse.json(tier);
}