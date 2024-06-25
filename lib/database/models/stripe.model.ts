import { Schema, model, models } from "mongoose";

const StripeSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  signedUp: { type: Boolean, required: true, unique: true, default: false },
  paymentSetup: { type: Boolean, required: true, unique: true, default: false },
})

const Stripe = models.Stripe || model('Stripe', StripeSchema);

export default Stripe;