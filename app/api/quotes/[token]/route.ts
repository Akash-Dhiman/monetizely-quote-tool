import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: {
        params: Promise<{
            token: string;
        }>
    }
) {

    const { token } =
        await params;

    const quote =
        await prisma.quote.findFirst({
            where: {
                shareToken: token
            },

        });

    if (!quote) {
        return NextResponse.json(
            {
                message:
                    'Quote not found'
            },
            {
                status: 404
            }
        );
    }

    return NextResponse.json(
        quote
    );
}