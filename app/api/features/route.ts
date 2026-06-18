import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const features = await prisma.feature.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return NextResponse.json(features);
}

export async function POST(request: Request) {
    const body = await request.json();

    const feature = await prisma.feature.create({
        data: {
            name: body.name
        }
    });

    return NextResponse.json(feature);
}