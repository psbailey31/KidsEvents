'use server'

import { revalidatePath } from 'next/cache'
import { getUserById } from './user.actions'
import { connectToDatabase } from '@/lib/database'
import StripeModel from '@/lib/database/models/stripe.model'
import { handleError } from '@/lib/utils'
import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'


import {CreateStripeParams } from '@/types'
import { redirect } from 'next/navigation'

export async function createStripeUser(stripeUser: CreateStripeParams) {
  try {
    await connectToDatabase()

    const newStripe = await StripeModel.create(stripeUser)
    return JSON.parse(JSON.stringify(newStripe))
  } catch (error) {
    handleError(error)
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

export async function createStripeAccountLink(userId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
  const response = await fetch(`${baseUrl}/api/stripe`, {
    method: 'POST',
  });


  if (!response.ok) {
    throw new Error('Failed to create Stripe account');
  }

  const data = await response.json();
  return data.account;
}