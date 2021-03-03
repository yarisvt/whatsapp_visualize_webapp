const { addMissingYears } = require('./DataProcessingUtils');

// Expects { year: \d{4,}, month: \d{1,2}, count: \d+ }
function sqlResultToHeatMapSeries(array) {
  array = addMissingYears(array, addName = false);
  const years = [... new Set(array.map(e => e.year))];
  const result = years.map(year => {
    return { name: year, data: Array(12) };
  });

  result.forEach(y => {
    array.filter(e => e.year === y.name).forEach(m => {
      y.data[m.month - 1] = m.count;
    });
  });

  return result;
}

module.exports = { sqlResultToHeatMapSeries };
