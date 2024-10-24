const https = require('https');
const fs = require('fs');

function encodeImage(image_path) {
  // Encode an image file into base64
  const bitmap = fs.readFileSync(image_path);
  return Buffer.from(bitmap).toString('base64');
}

// Set up your data
const api_key = "your api key";
const profile_id = "your profile id";
const api_url = 'https://api2.idanalyzer.com/scan';
const document_image_path = "testsample_id.jpg";
const face_image_path = "testsample_face.jpg";

// Encode images
const document_base64 = encodeImage(document_image_path);
const face_base64 = encodeImage(face_image_path);

// Build the payload
const payload = JSON.stringify({
  "profile": profile_id,
  "document": document_base64,
  "face": face_base64
});

// Set options for the request
const options = {
  hostname: 'api2.idanalyzer.com',
  port: 443,
  path: '/scan',
  method: 'POST',
  headers: {
    'X-API-KEY': api_key,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

// Create and send the request
const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);

  res.on('data', (data) => {
    process.stdout.write(data); 
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(payload);
req.end();