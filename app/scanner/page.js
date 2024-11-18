// "use client"; // For Next.js client components

// import { useState } from "react";

// const MicroblinkScanner = () => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   // Function to convert file to Base64
//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]); // Strip "data:image/jpeg;base64,"
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   // Function to handle file upload and send to API
//   const handleFileUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (!file) {
//         throw new Error("No file selected");
//       }

//       const base64Image = await fileToBase64(file);

//       // API Key and Secret
//       const apiKey = "b323fcff5df04940a44ca1b8e59f76ed";
//       const apiSecret = "5cd958c7-81ee-474d-8440-cfccc9397818";
//       const encodedAuth = btoa(`${apiKey}:${apiSecret}`); // Base64 encode

//       // Input body for API
//       const inputBody = {
//         returnFullDocumentImage: false,
//         returnFaceImage: false,
//         returnSignatureImage: false,
//         allowBlurFilter: false,
//         allowUnparsedMrzResults: false,
//         allowUnverifiedMrzResults: true,
//         validateResultCharacters: true,
//         anonymizationMode: "FULL_RESULT",
//         anonymizeImage: true,
//         ageLimit: 0,
//         imageSource: `base64:${base64Image}`,
//         scanCroppedDocumentImage: false,
//       };

//       // Headers
//       const headers = {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${encodedAuth}`,
//       };

//       // Make the API call
//       const res = await fetch('https://api.microblink.com/v1/recognizers/blinkid', {
//         method: "POST",
//         body: JSON.stringify(inputBody),
//         headers: headers,
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.statusText}`);
//       }

//       const data = await res.json();
//       setResponse(data); // Save response
//       setError(null); // Clear errors
//     } catch (err) {
//       setError(err.message);
//       setResponse(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Microblink BlinkID Scanner</h1>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         style={{ marginBottom: "20px" }}
//       />
//       {response && (
//         <div>
//           <h2>Scan Results:</h2>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}
//     </div>
//   );
// };

// export default MicroblinkScanner;
