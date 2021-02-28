// Expects { year: \d{4,}, month: \d{1,2}, name: \w+, count: \d+ }
function sqlResultToTimeSeriesLineChart(array, replaceNull) {
  const years = [...new Set(array.map((e) => e.year))];
  const persons = [...new Set(array.map((e) => e.name))];
  const categories = [];
  let series = [];

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

  // TODO
  //   series.forEach((serie) => trimLastNullValues(serie.data));

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

function replaceNullValues(series) {
  const idx = series.indexOf(undefined);

  if (idx === -1) {
    return series;
  }
  if (idx === 0) {
    series[idx] = 0;
  } else {
    series[idx] = series[idx - 1];
  }
  return replaceNullValues(series);
}

function trimLastNullValues(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!arr[i]) {
      arr.splice(i, 1);
    } else {
      break;
    }
  }
}

module.exports = { sqlResultToTimeSeriesLineChart, trimLastNullValues };
