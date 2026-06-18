import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

    const quotes =
        await prisma.quote.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

    return NextResponse.json(quotes);
}

export async function POST(
    request: Request
) {

    const body =
        await request.json();

    const shareToken =
        crypto.randomUUID();

    const quote =
        await prisma.quote.create({
            data: {
                customerName:
                    body.customerName,

                quoteName:
                    body.quoteName,

                termLength:
                    body.termLength,

                seats:
                    body.seats,

                discountPct:
                    body.discountPct,

                totalAmount:
                    body.totalAmount,

                productId:
                    body.productId,

                tierId:
                    body.tierId,

                shareToken
            }
        });

    return NextResponse.json(
        quote
    );
}