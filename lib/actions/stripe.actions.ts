// lib/actions/stripe.actions.ts
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/database';
import StripeModel from '@/lib/database/models/stripe.model'
import { getUserById } from './user.actions';
import {CreateStripeParams } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function createStripeAccountLink(accountId: string) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'https://kids-events.vercel.app/', // Update this with your actual reauth URL
      return_url: 'https://kids-events.vercel.app/', // Update this with your actual return URL
      type: 'account_onboarding',
    });
    return accountLink;
  } catch (error) {
    console.error('Error creating Stripe account link:', error);
    throw new Error('Failed to create Stripe account link');
  }
}

export async function createStripeAccount(userId: string) {
  try {
    await connectToDatabase();

    const user = await getUserById(userId);
    if (!user) {
      throw new Error('User not found');
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
        url: 'https://kids-events.vercel.app', // Update with your business URL
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: '0.0.0.0', // Replace with the real user IP address
      },
    });

    const accountLink = await createStripeAccountLink(account.id);
    return { account, accountLink };
  } catch (error) {
    console.error('Error creating Stripe account:', error);
    throw new Error('Failed to create Stripe account');
  }
}


export async function getStripeUserById(userId: string) {
  try {
    await connectToDatabase();

    const stripeUser = await StripeModel.findOne({ userId });

    if (!stripeUser) throw new Error('Stripe user not found');
    return JSON.parse(JSON.stringify(stripeUser));
  } catch (error) {
    console.error("Error fetching Stripe user data:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function createStripeUser(stripeUser: CreateStripeParams) {
  try {
    await connectToDatabase();

    const newStripe = await StripeModel.create(stripeUser);
    return JSON.parse(JSON.stringify(newStripe));
  } catch (error) {
    console.error('Error creating Stripe user:', error);
    throw new Error('Failed to create Stripe user');
  }
}
