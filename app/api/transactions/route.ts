import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { amount, type, category, date } = await request.json();
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        category,
        date: new Date(date),
      },
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });
    return NextResponse.json(deletedTransaction);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
