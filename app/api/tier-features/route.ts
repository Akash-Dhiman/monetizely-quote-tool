import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

    const data =
        await prisma.tierFeature.findMany({
            include: {
                tier: true,
                feature: true
            }
        });

    return NextResponse.json(data);
}

export async function POST(
    request: Request
) {

    const body =
        await request.json();

    const result =
        await prisma.tierFeature.create({
            data: {
                tierId: body.tierId,
                featureId: body.featureId,
                availability: body.availability,
                pricingModel: body.pricingModel,
                priceValue: body.priceValue
            }
        });

    return NextResponse.json(result);
}