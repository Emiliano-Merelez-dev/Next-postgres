
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            {description: 'piedra del alma', complete: true},
            {description: 'piedra del poder'},
            {description: 'piedra del tiempo', complete: true},
            {description: 'piedra del viento'}
        ]
    })

  
 
    
    

    return NextResponse.json({ message: 'Seed Executed' });
}