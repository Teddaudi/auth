// lib/payment.ts
import https from 'https';

interface PaymentParams {
  email: string;
  amount: number; // Assuming the amount is in Naira and needs to be converted to kobo.
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data?: any;
}

export function initializePayment(params: PaymentParams): Promise<PaystackResponse> {
  return new Promise((resolve, reject) => {
    // Convert the amount from Naira to kobo by multiplying by 100
    const postData = JSON.stringify({
      ...params,
      amount: params.amount * 100, // Convert to kobo before sending to Paystack
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk_test_77400fa9c4ffeffa64d9db42fb17356a5000e042', // Replace with your actual secret key
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk: Buffer) => {
        data += chunk;
      });

      res.on('end', () => {
        try {

          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(new Error('Error parsing Paystack response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}
