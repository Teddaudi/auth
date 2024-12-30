import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const frontFile = data.get('file[0]') as File | null;
    const backFile = data.get('file[1]') as File | null;
    console.log({ frontFile, backFile })
    if (!frontFile || !backFile) {
      return NextResponse.json({ error: "Both front and back images are required." }, { status: 400 });
    }

    const frontImageBuffer = Buffer.from(await frontFile.arrayBuffer());
    const backImageBuffer = Buffer.from(await backFile.arrayBuffer());

    const userId = await getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Invalid user token." }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "images.frontIdImage": frontImageBuffer,
          "images.backIdImage": backImageBuffer,
        },
      },
      { new: true }
    );
    // user.images = {
    //   frontIdImage: frontImageBuffer,
    //   backIdImage: backImageBuffer,
    // };

    // await user.save();

    return NextResponse.json({ message: "ID verification images uploaded successfully.", success: true });

  } catch (error: any) {
    console.error("Error uploading ID images:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     const data = await req.formData();
//     const frontFile = data.get('file[0]') as File | null;
//     const backFile = data.get('file[1]') as File | null;
//     console.log({ frontFile, backFile })
//     if (!frontFile || !backFile) {
//       return NextResponse.json({ error: "Both front and back images are required." }, { status: 400 });
//     }

//     const frontImageBuffer = Buffer.from(await frontFile.arrayBuffer());
//     const backImageBuffer = Buffer.from(await backFile.arrayBuffer());

//     const userId = await getDataFromToken(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Invalid user token." }, { status: 400 });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     user.images = {
//       frontIdImage: frontImageBuffer,
//       backIdImage: backImageBuffer,
//     };

//     await user.save();

//     return NextResponse.json({ message: "ID verification images uploaded successfully.", success: true });

//   } catch (error: any) {
//     console.error("Error uploading ID images:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

