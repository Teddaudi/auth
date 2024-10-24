import { join } from "path"
import { connect } from "../../../../../dbConfig/dbConfig"
import { getDataFromToken } from "../../../../../helpers/getDataFromToken"
import User from "../../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"


connect()
export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user || !user.image) {
            return NextResponse.json({ success: false, message: "User image not found" }, { status: 404 });
        }

        // Convert the image buffer to a base64 string and specify the MIME type
        const base64Image = user.image.toString('base64');
        const mimeType = 'image/jpeg'; // Change this to the correct MIME type if necessary
        const imgSrc = `data:${mimeType};base64,${base64Image}`;

        return NextResponse.json({
            success: true,
            image: imgSrc,
        });
    } catch (error: any) {
        console.error("Error fetching user image:", error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File
        const userId = await getDataFromToken(request)
    
            if (!file ) {
                return NextResponse.json({ success: false }, { status: 400 });
            }
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const user = await User.findByIdAndUpdate(
                userId,
                { $set: { image: buffer } },
                { new: true } // Return the updated document
            );
        //     const path = join('/','tmp' ,file.name)
        //     await writeFile(path,buffer)
        // console.log("buffer:", path)
        return NextResponse.json({
            success:true,
            message: "User image updated successfully",
        });
    } catch (error: any) {
        console.error("Error updating user image:", error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
