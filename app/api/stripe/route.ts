// app/api/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/database';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(userId: string, req: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    console.log('Session Claims:', sessionClaims); // Log session claims

    await connectToDatabase();

    
    const account = await stripe.accounts.create({
      country: 'IE',
      controller: {
        fees: {
          payer: 'application',
        },
        losses: {
          payments: 'application',
        },
        stripe_dashboard: {
          type: 'express',
        },
      },
    });

    const accountLink = await createStripeAccountLink(account.id);

    return NextResponse.json({ account });
  } catch (error) {
    console.error('Error creating Stripe account:', error);
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}

export async function createStripeAccountLink(accountId: string) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'https://kids-events.vercel.app/', // Update this with your actual reauth URL
      return_url: 'https://kids-events.vercel.app/', // Update this with your actual return URL
      type: 'account_onboarding',
    });
    alert(accountLink)
    return accountLink;

  } catch (error) {
    console.error('Error creating Stripe account link:', error);
    throw new Error('Failed to create Stripe account link');
  }
}
