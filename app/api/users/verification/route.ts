import { NextRequest, NextResponse } from "next/server";
import https from 'https';
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";



export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    const userId = await getDataFromToken(req);
    let idName;
    // Convert file to base64 string if the API requires it.
    const bytes = await file.arrayBuffer();
    const base64File = Buffer.from(bytes).toString('base64');

    const api_key = process.env.ID_ANALYZER_API_KEY!;
    const profile_id = process.env.ID_ANALYZER_PROFILE_ID!;
    const payload = JSON.stringify({
      profile: profile_id,
      document: base64File // Use "document" or the required parameter name.
    });

    const options = {
      hostname: 'api2.idanalyzer.com',
      port: 443,
      path: '/scan',
      method: 'POST',
      headers: {
        'X-API-KEY': api_key,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const apiRes: any = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(payload);
      req.end();
    });
    idName = apiRes.data.fullName[0].value;
    // console.log(apiRes.success)
    if (apiRes.success) {
      await User.findByIdAndUpdate(
        userId,
        { idVerification: true },
        { new: true }
      );
      // console.log("User ID verification status:", updatedUser.idVerification)
      return NextResponse.json({
        message: "Verification successful",
        success: true,
      })
    }

  } catch (error: any) {
    console.error('Error verifying ID:', error.message);
    return NextResponse.json({ error: error.message });
  }
}


// export async function PUT(req: NextRequest, res: NextResponse) {
//   console.log(req.json)
// }