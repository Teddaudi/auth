import { NextRequest ,NextResponse} from "next/server";
import User from "../../../../models/userModel";

export async function GET(request: NextRequest){
try {
    const users  = await User.find()
    // console.log("users:",users)
    return NextResponse.json({
        message: "Users found",
        data:users
    })
} catch (error:any) {
    return NextResponse.json({
        error: error.message
    })
}
}