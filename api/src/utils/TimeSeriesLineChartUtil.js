const { trimLastNullValues, getLongestLength, calculateCumulative, addMissingYears } = require('./DataProcessingUtils');

// Expects { year: \d{4,}, month: \d{1,2}, name: \w+, count: \d+ }
function sqlResultToTimeSeriesLineChart(array, cumulative) {
  array = addMissingYears(array);
  const years = [...new Set(array.map((e) => e.year))];
  const persons = [...new Set(array.map((e) => e.name))];
  const categories = [];
  const series = [];
  
  years.forEach((year) => {
    categories.push(
      ...Array.from({ length: 12 }, (x, i) => i + 1 + '-' + year)
    );
  });

  persons.forEach((person) => {
    const entry = {
      name: person,
      data: [],
    };

    years.forEach((year) => {
      const newYear = Array(12).fill(0);
      array
        .filter((e) => e.year === year && e.name === person)
        .forEach((m) => (newYear[m.month - 1] = m.count));
      entry.data.push(...newYear);
    });

    series.push(entry);
  });
  
 
  trimLastNullValues(series, getLongestLength(series));

  if (cumulative) {
    calculateCumulative(series);
  }

  return {
    series,
    categories,
  };
}


module.exports = { sqlResultToTimeSeriesLineChart };
