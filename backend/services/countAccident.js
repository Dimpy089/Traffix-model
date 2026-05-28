const { getAccidentData } = require('../utils/loadCsv');

const countAccidentsByLocation = (location) => {

const data = getAccidentData();

const target = location.trim().toLowerCase();

let totalCount = 0;

data.forEach((row) => {

    const city = row.city
        ? row.city.toLowerCase()
        : "";

    const state = row.state
        ? row.state.toLowerCase()
        : "";

    if (
        city === target ||
        state === target
    ) {
        totalCount++;
    }

});

return totalCount;


};

module.exports = {
countAccidentsByLocation
};
