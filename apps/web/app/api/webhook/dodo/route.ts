import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';

const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error('DODO_PAYMENTS_WEBHOOK_SECRET environment variable is required');
}

const webhook = new Webhook(WEBHOOK_SECRET);

export async function POST(request: NextRequest) {
  try {
    console.log("Req recived");

    const body = await request.text();

    const webhookId = request.headers.get('webhook-id');
    const webhookSignature = request.headers.get('webhook-signature');
    const webhookTimestamp = request.headers.get('webhook-timestamp');

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      console.error('Missing required webhook headers');
      return NextResponse.json(
        { error: 'Missing webhook headers' },
        { status: 400 }
      );
    }

    const headers = {
      'webhook-id': webhookId,
      'webhook-signature': webhookSignature,
      'webhook-timestamp': webhookTimestamp,
    };
    
    interface WebhookPayload {
  event: string;
  // Add other properties if your webhook expects them
}

const verifiedPayload = webhook.verify(body, headers) as WebhookPayload;
    console.log('Webhook signature verified successfully');
    console.log('Verified Payload:', verifiedPayload);

    // Check event type
    const eventType = verifiedPayload?.event;
    console.log('Event Type:', eventType);

    switch (eventType) {
      case 'payment.succeeded':
        console.log('Handling payment succeeded');
        // Add your business logic here
        break;
      case 'payment.failed':
        console.log('Handling payment failed');
        // Add your business logic here
        break;
      case 'payment.processing':
        console.log('Handling payment processing');
        break;
      case 'payment.cancelled':
        console.log('Handling payment cancelled');
        break;
      case 'refund.succeeded':
        console.log('Handling refund succeeded');
        break;
      case 'refund.failed':
        console.log('Handling refund failed');
        break;
      case 'dispute.opened':
        console.log('Handling dispute opened');
        break;
      case 'dispute.expired':
        console.log('Handling dispute expired');
        break;
      case 'dispute.accepted':
        console.log('Handling dispute accepted');
        break;
      case 'dispute.cancelled':
        console.log('Handling dispute cancelled');
        break;
      case 'dispute.challenged':
        console.log('Handling dispute challenged');
        break;
      case 'dispute.won':
        console.log('Handling dispute won');
        break;
      case 'dispute.lost':
        console.log('Handling dispute lost');
        break;
      case 'subscription.active':
        console.log('Handling subscription active');
        break;
      case 'subscription.on_hold':
        console.log('Handling subscription on hold');
        break;
      case 'subscription.renewed':
        console.log('Handling subscription renewed');
        break;
      case 'subscription.paused':
        console.log('Handling subscription paused');
        break;
      case 'subscription.plan_changed':
        console.log('Handling subscription plan changed');
        break;
      case 'subscription.cancelled':
        console.log('Handling subscription cancelled');
        break;
      case 'subscription.failed':
        console.log('Handling subscription failed');
        break;
      case 'subscription.expired':
        console.log('Handling subscription expired');
        break;
      case 'license_key.created':
        console.log('Handling license key created');
        break;
      default:
        console.warn('Unhandled event type:', eventType);
    }

    return NextResponse.json({ received: true, processed: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export function GET(){
    return NextResponse.json("hi")
}