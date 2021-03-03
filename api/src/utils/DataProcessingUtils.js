function addMissingYears(arr, addName = true) {
  if (arr.length === 0) {
    return arr;
  }
  
  arr = arr.map(x => ({ ...x, 'added': false }));
  const firstName = arr[0].name;

  const allYearsRange = getRangeArr(parseInt(arr[0].year), parseInt(arr[arr.length - 1].year));
  const availYears = [...new Set(arr.map((e) => parseInt(e.year)))];
  const missingYears = allYearsRange.filter(x => !availYears.includes(x)).reduce((acc, cur) => {
    acc.push({ year: cur, added: false });
    return acc;
  }, []);
  
 
  const newArr = []; 
  for (let i = 0; i < arr.length; i++) {
    const elt = arr[i];
    if (!elt.added) {
      const { added, ...newElt } = elt;
      newArr.push(newElt);
      elt.added = true;
    } 
    for (const missingYear of missingYears) {
      if (!missingYear.added && parseInt(arr[i].year) !== missingYear.year && parseInt(arr[i + 1].year) > missingYear.year ) {
        if (addName) {
          newArr.push({ year: `${missingYear.year}`, month: '1', name: firstName, count: 0 });
        } else {
          newArr.push({ year: `${missingYear.year}`, month: '1', count: 0 });
        }
        missingYear.added = true;
      } 
    }
  };
  return newArr;
}

const getRangeArr = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

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

module.exports = { trimLastNullValues, getLongestLength, calculateCumulative, addMissingYears };
