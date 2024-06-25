'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Stripe from '@/lib/database/models/stripe.model'
import { handleError } from '@/lib/utils'

import {CreateStripeParams } from '@/types'

export async function createStripeUser(stripeUser: CreateStripeParams) {
  try {
    await connectToDatabase()

    const newStripe = await Stripe.create(stripeUser)
    return JSON.parse(JSON.stringify(newStripe))
  } catch (error) {
    handleError(error)
  }
}

