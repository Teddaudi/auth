import axios from "axios";


export default function verifyId() {
    const options = {
        method: 'POST',
        url: 'https://api2.idanalyzer.com/scan',
        headers: { accept: 'application/json', 'content-type': 'application/json' }
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });

} 