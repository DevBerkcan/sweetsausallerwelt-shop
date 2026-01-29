import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.warn('Stripe publishable key not configured');
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export async function createCheckoutSession(
  items: CheckoutItem[],
  customerEmail?: string
): Promise<CreateCheckoutSessionResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';

  const response = await fetch(`${apiUrl}/api/payments/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items,
      customerEmail,
      successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/checkout`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to create checkout session');
  }

  return response.json();
}

export async function redirectToCheckout(
  items: CheckoutItem[],
  customerEmail?: string
): Promise<void> {
  try {
    const { url } = await createCheckoutSession(items, customerEmail);

    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}
