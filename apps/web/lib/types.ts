export interface WebhookPayload {
    business_id: string;
    type: string;
    timestamp: string;
    data: {
      payload_type: string;
      payment_id: string;
      business_id: string;
      status: string;
      total_amount: number;
      currency: string;
      payment_method: string;
      payment_method_type: string;
      created_at: string;
      updated_at: string | null;
      disputes: [];
      refunds: [];
      customer: {
        customer_id: string;
        name: string;
        email: string;
      };
      subscription_id: string | null;
      product_cart: {
        product_id: string;
        quantity: number;
      }[];
      payment_link: string;
      tax: number;
      metadata: {};
      error_message: string | null;
      error_code: string | null;
      discount_id: string | null;
      settlement_amount: number;
      settlement_tax: number;
      settlement_currency: string;
      billing: {
        country: string;
        state: string;
        city: string;
        street: string;
        zipcode: string;
      };
      card_last_four: string | null;
      card_issuing_country: string | null;
      card_type: string | null;
      card_network: string | null;
      brand_id: string;
    };
  }