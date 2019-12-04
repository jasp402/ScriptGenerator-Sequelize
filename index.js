let xlsx = require('node-xlsx').default;

const workSheetsFromFile = xlsx.parse(`${__dirname}/Libro1.xlsx`);
console.log(JSON.stringify(workSheetsFromFile));
workSheetsFromFile[0].data.forEach((row, index) => {
        console.log("row:", index, row);
});