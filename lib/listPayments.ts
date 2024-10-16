import https from 'https';

interface PaymentResponse {
  status: boolean;
  message: string;
  data: any; // Adjust type as necessary based on expected response structure
}

export function getAllPayments(): Promise<PaymentResponse> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction',
      method: 'GET',
      headers: {
        Authorization: `Bearer sk_test_77400fa9c4ffeffa64d9db42fb17356a5000e042`, // Use the provided secret key
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
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

    req.end();
  });
}
