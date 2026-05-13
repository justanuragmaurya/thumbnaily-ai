export interface WebhookPayload {
  business_id: string;
  type: string;
  timestamp: string;
  data: {
    payload_type: string;
    payment_id: string;
    customer: {
      email: string;
    };
    product_cart: {
      product_id: string;
      quantity: number;
    }[];
  };
}
