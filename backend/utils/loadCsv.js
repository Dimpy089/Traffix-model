const fs = require('fs');
const csv = require('csv-parser');

let accidentData = [];

const loadCSV = () => {
return new Promise((resolve, reject) => {


    fs.createReadStream('public/accidentsnum.csv')
        .pipe(csv())
        .on('data', (row) => {
            accidentData.push(row);
        })
        .on('end', () => {
            console.log('CSV Loaded Successfully');
            resolve(accidentData);
        })
        .on('error', (error) => {
            reject(error);
        });

});


};


const getAccidentData = () => accidentData;

module.exports = {
loadCSV,
getAccidentData
};
