"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function SendMessages() {
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    async function handleSubmit() {
        try {
            if (!email || !subject || !message) {
                return alert("Provide all neccessary details!")
            }
            const response = await axios.post("/api/mail/users", {
                email: email, userSubject: subject, userMessage: message
            })
            if (response.data.status === "success") {
                return alert("Mail delivered successfully!")
            } else {
                alert("Mail not delivered!")
            }
            // console.log("message:", { response })
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <form className="flex flex-col border message shadow-xl rounded w-full" >
            <label className="mt-4 mx-4">Client Email address</label>
            <input className="mt-4 mx-4 border rounded-sm py-2 px-1" placeholder="Client email address" onChange={(e) => setEmail(e.target.value)} />
            <label className="mt-4 mx-4">Subject</label>
            <input className="mt-4 mx-4 border rounded-sm py-2 px-1" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
            <label className="mt-4 mx-4  ">Message</label>
            <textarea className="mt-4 mx-4 border rounded-sm py-2 px-1" onChange={(e) => setMessage(e.target.value)}></textarea>
            <input value="Send Message" type="button" className="bg-green-300 max-w-[300px] mx-auto px-4 py-2 rounded-md cursor-pointer text-white 
            hover:bg-green-700 my-4
            "
                onClick={handleSubmit}
            />
        </form>
    )
}