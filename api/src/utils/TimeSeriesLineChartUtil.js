// Expects { year: \d{4,}, month: \d{1,2}, name: \w+, count: \d+ }
function sqlResultToTimeSeriesLineChart(array, replaceNull) {
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
      const newYear = Array(12);
      array
        .filter((e) => e.year === year && e.name === person)
        .forEach((m) => (newYear[m.month - 1] = m.count));
      entry.data.push(...newYear);
    });

    series.push(entry);
  });

  const longestLength = getLongestLength(series);
  series.forEach((serie) => trimLastNullValues(serie.data, longestLength));

  if (replaceNull) {
    series.forEach((serie) => {
      replaceNullValues(serie.data);
    });
  }

  return {
    series,
    categories,
  };
}

function getLongestLength(arr) {
  let lastIndex = -1;
  arr.forEach((data) => {
    data.data.forEach((elt) => {
      if (elt) {
        const index = data.data.indexOf(elt);
        if (index > lastIndex) {
          lastIndex = index;
        }
      }
    });
  });
  return lastIndex;
}

function replaceNullValues(arr) {
  const idx = arr.indexOf(undefined);

  if (idx === -1) {
    return arr;
  }
  if (idx === 0) {
    arr[idx] = 0;
  } else {
    arr[idx] = arr[idx - 1];
  }
  return replaceNullValues(arr);
}

function trimLastNullValues(arr, longestLength) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr.length <= longestLength + 1) {
      break; 
    }
    if (!arr[i]) {
      arr.splice(i, 1);
    } else {
      break;
    }
  }
}

module.exports = { sqlResultToTimeSeriesLineChart, trimLastNullValues };
