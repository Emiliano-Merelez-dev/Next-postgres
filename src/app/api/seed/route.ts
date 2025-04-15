
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }
  
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();
  
    const user = await prisma.user.create({
      data: {
        email: 'test1@google.com',
        password: bcrypt.hashSync('123456'),
        roles: ['admin','client','super-user'],
        todos: {
          create: [
            {description: 'piedra del alma', complete: true},
            {description: 'piedra del poder'},
            {description: 'piedra del tiempo'},
            {description: 'piedra del viento'},
            {description: 'piedra del realidad'},
          ]
        }
      }
    });
  
    return NextResponse.json({ message: 'Seed Executed' });
  }
  