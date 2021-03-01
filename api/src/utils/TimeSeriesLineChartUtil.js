// Expects { year: \d{4,}, month: \d{1,2}, name: \w+, count: \d+ }
function sqlResultToTimeSeriesLineChart(array, cumulative) {
  const years = [...new Set(array.map((e) => e.year))];
  const persons = [...new Set(array.map((e) => e.name))];
  const categories = [];
  const series = [];

  years.forEach((year) => {
    categories.push(
      ...Array.from({ length: 12 }, (x, i) => i + 1 + "-" + year)
    );
  });

  persons.forEach((person) => {
    const entry = {
      name: person,
      data: [],
    };

    years.forEach((year) => {
      const newYear = Array(12);
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

function trimLastNullValues(arr, longestLength) {
  arr.forEach((elt) => {
    for (let i = elt.data.length - 1; i >= 0; i--) {
      if (elt.data.length <= longestLength + 1) {
        break;
      }
      if (!elt.data[i]) {
        elt.data.splice(i, 1);
      } else {
        break;
      }
    }
  });
}

function getLongestLength(arr) {
  let lastIndex = -1;
  arr.forEach((data) => {
    data.data.forEach((elt, index) => {
      if (elt) {
        if (index > lastIndex) {
          lastIndex = index;
        }
      }
    });
  });
  return lastIndex;
}

function calculateCumulative(series) {
  series.forEach((serie) => {
    const newData = serie.data.reduce((sum, value, idx) => {
      if (!value) {
        value = 0;
      }
      return [...sum, value + (sum[idx - 1] || 0)];
    }, []);
    serie.data = newData;
  });
}

module.exports = { sqlResultToTimeSeriesLineChart, trimLastNullValues };
