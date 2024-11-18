import { NextRequest, NextResponse } from "next/server";
import https from 'https';
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";
import Verification from "../../../../models/verificationModel"


// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     const data = await req.formData();
//     console.log("first")
//     const file: File | null = data.get('file') as unknown as File;
//     const userId = await getDataFromToken(req);
//     let idName;
//     // Convert file to base64 string if the API requires it.
//     const bytes = await file.arrayBuffer();
//     const base64File = Buffer.from(bytes).toString('base64');

//     const api_key = process.env.ID_ANALYZER_API_KEY!;
//     const profile_id = process.env.ID_ANALYZER_PROFILE_ID!;
//     const payload = JSON.stringify({
//       profile: profile_id,
//       document: base64File // Use "document" or the required parameter name.
//     });

//     const options = {
//       hostname: 'api2.idanalyzer.com',
//       port: 443,
//       path: '/scan',
//       method: 'POST',
//       headers: {
//         'X-API-KEY': api_key,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(payload),
//       },
//     };

//     const apiRes: any = await new Promise((resolve, reject) => {
//       const req = https.request(options, (res) => {
//         let data = '';
//         res.on('data', (chunk) => {
//           data += chunk;
//         });
//         res.on('end', () => {
//           resolve(JSON.parse(data));
//         });
//       });

//       req.on('error', (error) => {
//         reject(error);
//       });

//       req.write(payload);
//       req.end();
//     });
//     idName = apiRes.data.fullName[0].value;
//     // console.log(apiRes.success)
//     if (apiRes.success) {
//    const user =   await User.findByIdAndUpdate(
//         userId,
//         { idVerification: true },
//         { new: true }
//       );
//       await Verification.create({
//         email:user.email,
//         idVerification:true,
//         image:user.image
//       })
//       // console.log("User ID verification status:", updatedUser.idVerification)
//       return NextResponse.json({
//         message: "Verification successful",
//         success: true,
//       })
//     }

//   } catch (error: any) {
//     console.error('Error verifying ID:', error.message);
//     return NextResponse.json({ error: error.message });
//   }
// }


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.formData();
    // console.log("Received form data entries:", Array.from(data.entries())); // Logs all form data entries

    const file = data.get('file[0]') as File | null;
    if (!file) {
      // console.error("File not found in the request.");
      return NextResponse.json({ error: "No file provided for verification." }, { status: 400 });
    }

    const userId = await getDataFromToken(req);
    if (!userId) {
      console.error("User ID could not be retrieved from token.");
      return NextResponse.json({ error: "Invalid user token." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64File = Buffer.from(bytes).toString('base64');

    const api_key = process.env.ID_ANALYZER_API_KEY!;
    const profile_id = process.env.ID_ANALYZER_PROFILE_ID!;
    const payload = JSON.stringify({
      profile: profile_id,
      document: base64File,
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
          try {
            resolve(JSON.parse(data));
          } catch (parseError) {
            reject(new Error("Failed to parse API response"));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(payload);
      req.end();
    });

    // console.log("ID Analyzer API Response:", apiRes);

    if (apiRes.success) {
      const user = await User.findByIdAndUpdate(
        userId,
        { idVerification: true },
        { new: true }
      );

      // await Verification.create({
      //   email: user.email,
      //   idVerification: true,
      //   image: user.image,
      // });

      return NextResponse.json({
        message: "Verification successful",
        success: true,
      });
    } else {
      // console.error("Verification failed with message:", apiRes.message);
      return NextResponse.json({
        message: "Verification failed",
        success: false,
        error: apiRes.message || "Unknown error during verification",
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error verifying ID:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
