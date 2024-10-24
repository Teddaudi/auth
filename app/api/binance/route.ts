// // pages/api/binance.js
// import Binance from 'binance-api-node';
// import { NextRequest, NextResponse } from 'next/server';
// import { Spot } from '@binance/connector'



// export async function GET(request: NextRequest) {
//     try {
//         const client = new Spot(
//             process.env.BINANCE_API_KEY,
//             process.env.BINANCE_API_SECRET,
//             {
//                 baseURL: 'https://api1.binance.com'
//             }
//         )
//         client.account().then(response => client.logger.log(response.data))
//     } catch (error: any) {
//         console.log(error.message)
//     }
// }

// export async function POST(req: NextRequest, res: NextResponse) {
//     const client = Binance({
//         apiKey: "eFtOGmBmZTeZ97i1VliJyvK9uK2oxkZLPhB7iNbBZNfi2SA6zIDiKk8YnoLtwPfG",
//         apiSecret: "GotwgUvDIrMzcKcD0OqCKiXMdZjxhxHHNRzOci0sBanOc0KPJXnvVJ3lcOFd2ymd",
//     });

//     try {
//         // if (req.method === 'GET') {
//         //   // Example: Get account information and balances
//         //   const accountInfo = await client.accountInfo();
//         //   return res.status(200).json(accountInfo.balances);
//         // }
//         const reqBody = req.json()
//         console.log("reqBody:",reqBody)
//         const { symbol, quantity } = reqBody;

//         // Example: Place a market order
//         const order = await client.order({
//             symbol: symbol || 'BTCUSDT',
//             side: 'BUY',
//             type: 'MARKET',
//             quantity: quantity || 0.01,
//         });

//         return NextResponse.json({
//             message: "Payment initiated",
//             order: order
//         });
//         // if (req.method === 'POST') {
//         // }

//     } catch (error: any) {
//         console.log("error:", error.message)
//         NextResponse.json({ error: error.message });
//     }
// }
