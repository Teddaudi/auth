import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        // console.log("token:",decodedToken)
        return decodedToken.id;
    } catch (error: any) {
        console.log(error.message)
        // throw new Error(error.message)
    }
}
export const getDataAdmin = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        console.log("token:",decodedToken)
        return decodedToken.admin;
    } catch (error: any) {
        console.log(error.message)
        // throw new Error(error.message)
    }
}