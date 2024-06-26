import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/database';
import { getUserById } from '@/lib/actions/user.actions';
import { createStripeAccountLink } from '@/lib/actions/stripe.actions';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    console.log('Session Claims:', sessionClaims); // Log session claims

    const userId = sessionClaims?.userId as string;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await getUserById(userId);
    if (!user) {
      console.log('User not found for ID:', userId); // Log if user not found
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const account = await stripe.accounts.create({
      country: 'IE',
      type: 'express',
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
      business_type: 'individual',
      business_profile: {
        url: 'https://kids-events.vercel.app/',
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || '0.0.0.0',
      },
    });

    const accountLink = await createStripeAccountLink(account.id);
    return NextResponse.json({ account, accountLink });
  } catch (error) {
    console.error('Error creating Stripe account:', error);
    return NextResponse.json({ error: error! }, { status: 500 });
  }
}

