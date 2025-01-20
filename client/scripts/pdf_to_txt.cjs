const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path'); 



const pdfPath = "C:\\Users\\shour\\Desktop\\JobNavigator\\client\\scripts\\jakes-resume.pdf"; // Double backslashes

fs.readFile(pdfPath, (err, data) => {
    if (err) {
        console.error("Error reading file:", err.message);
        return;
    }
    pdfParse(data)
        .then(result => console.log(result.text))
        .catch(error => console.error("Error parsing PDF:", error.message));
});
