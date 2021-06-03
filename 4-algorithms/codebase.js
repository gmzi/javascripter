/**Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

Constraints:

Time Complexity: O(log N) */

function countZeroes(arr) {
  let startIdx = 0;
  let endIdx = arr.length - 1;

  while (startIdx <= endIdx) {
    let middleIdx = Math.floor(startIdx + endIdx / 2);
    let middleVal = arr[middleIdx];
    if (middleVal !== 0) {
      startIdx = middleIdx;
    } else {
      const firstVal = arr.indexOf(0);
      const result = arr.splice(firstVal, arr.length);
      return result.length;
    }
  }
  return 0;
}

// -------------------------------------------------------------

/**Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array

Constraints:

Time Complexity: O(log N) */

function sortedFrequency(arr, num) {
  let firstIdx = findFirst(arr, num);
  if (firstIdx == -1) return firstIdx;
  let lastIdx = findLast(arr, num);
  return lastIdx - firstIdx + 1;
}

function findFirst(arr, num, low = 0, high = arr.length - 1) {
  if (high >= low) {
    let mid = Math.floor((low + high) / 2);
    if ((mid === 0 || num > arr[mid - 1]) && arr[mid] === num) {
      return mid;
    } else if (num > arr[mid]) {
      return findFirst(arr, num, mid + 1, high);
    } else {
      return findFirst(arr, num, low, mid - 1);
    }
  }
  return -1;
}

function findLast(arr, num, low = 0, high = arr.length - 1) {
  if (high >= low) {
    let mid = Math.floor((low + high) / 2);
    if ((mid === arr.length - 1 || num < arr[mid + 1]) && arr[mid] === num) {
      return mid;
    } else if (num < arr[mid]) {
      return findLast(arr, num, low, mid - 1);
    } else {
      return findLast(arr, num, mid + 1, high);
    }
  }
  return -1;
}

// -------------------------------------------------------------

/**findRotatedIndex

Write a function called findRotatedIndex which accepts a rotated array of sorted numbers and an integer. The function should return the index of num in the array. If the value is not found, return -1.

Constraints:

Time Complexity: O(log N) */

function findRotatedIndex(arr, val) {
  let middleIdx = findMiddleIdx(arr);
  let highestValIdx = findHighestValIdx(arr);
  const middleVal = arr[middleIdx];
  if (middleVal === val) {
    return middleIdx;
  } else if (middleVal > val && arr[0] > val) {
    return binarySearch(arr, highestValIdx + 1, arr.length - 1, val);
  } else {
    return binarySearch(arr, 0, highestValIdx, val);
  }
}

function findMiddleIdx(arr, startIdx = 0, endIdx = arr.length - 1) {
  return Math.floor((startIdx + endIdx) / 2);
}

function findHighestValIdx(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const middle = findMiddleIdx(arr, start, end);
    if (arr[middle] > arr[middle + 1]) return middle;
    else if (arr[start] <= arr[middle]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
}

function binarySearch(arr, start, end, val) {
  if (start >= 0 && end <= arr.length - 1) {
    while (start <= end) {
      let middleIdx = Math.floor((start + end) / 2);
      if (arr[middleIdx] === val) {
        return middleIdx;
      } else if (val < arr[middleIdx]) {
        end = middleIdx - 1;
      } else {
        start = middleIdx + 1;
      }
    }
  }
  return -1;
}

// findRotatedIndex([3,4,1,2],4)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8);
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3);
// findRotatedIndex([37,44,66,102,10,22],14)
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)

// -----------------------------------------------------------------

/** findRotationCount

Write a function called findRotationCount which accepts an array of distinct numbers sorted in increasing order. The array has been rotated counter-clockwise n number of times. Given such an array, find the value of n.

Constraints:

Time Complexity: O(log N)

*/

function findRotationCount(arr) {
  if (arr[0] < arr[arr.length - 1]) return 0;

  const highestValueIdx = findHighestValueIdx(arr);
  return binaryCount(arr, 0, highestValueIdx);
}

function binaryCount(arr, start, end) {
  let count = 0;
  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    console.log(middle);
    count++;
    end -= 1;
  }
  return count + 1;
}

function findHighestValueIdx(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (arr[middle] > arr[middle + 1]) return middle;
    else if (arr[start] <= arr[middle]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
}

/**
   * SOLUTION:
   function findRotationCount(arr, low = 0, high = arr.length - 1) {
    if (high < low) return 0;
    if (high === low) return low;
    let mid = Math.floor((low + high) / 2)
  
    // Check if element (mid+1) is minimum element.
    // Consider the cases like [3, 4, 5, 1, 2]
    if (mid < high && arr[mid + 1] < arr[mid])
      return mid + 1;
  
    // Check if mid itself is minimum element
    if (mid > low && arr[mid] < arr[mid - 1]) {
      return mid;
    }
  
    // Decide whether we need to go to left half or
    // right half
    if (arr[high] > arr[mid]) {
      return findRotationCount(arr, low, mid - 1);
    }
  
    return findRotationCount(arr, mid + 1, high);
  }
  
  // findRotationCount([15, 18, 2, 3, 6, 12]) 
  findRotationCount([7, 9, 11, 12, 5]) 
   */

findRotationCount([15, 18, 2, 3, 6, 12]);
// findRotationCount([7, 9, 11, 12, 5])
// findRotationCount([7, 9, 11, 12, 15])

// ----------------------------------------------------------------

/**findFloor

Write a function called findFloor which accepts a sorted array and a value x, 
and returns the floor of x in the array. The floor of x in an array is the largest element 
in the array which is smaller than or equal to x. If the floor does not exist, return -1. */

function findFloor(arr, value) {
  const middleIdx = Math.floor((arr.length - 1) / 2);
  const middleValue = arr[middleIdx];
  if (middleValue > value) {
    return binarySearch(arr, 0, middleIdx, value);
  } else if (middleValue < value) {
    return binarySearch(arr, middleIdx, arr.length - 1, value);
  } else {
    // check if arr[middleIdx] !== value, and return arr[middleValue] when it is
    return 'hola';
  }
}

function binarySearch(arr, start, end, value) {
  while (start <= end) {
    let middleIdx = Math.floor((start + end) / 2);
    if (arr[middleIdx] === value - 1) {
      return arr[middleIdx];
    } else {
      start++;
    }
  }
  return -1;
}

/**
   SOLUTION:
   function findFloor(arr, num, low = 0, high = arr.length - 1) {
    if (low > high) return -1;
    if (num >= arr[high]) return arr[high];
  
    let mid = Math.floor((low + high) / 2)
  
    if (arr[mid] === num) return arr[mid];
  
    if (mid > 0 && arr[mid - 1] <= num && num < arr[mid]) {
      return arr[mid - 1];
    }
  
    if (num < arr[mid]) {
      return findFloor(arr, num, low, mid - 1);
    }
  
    return findFloor(arr, num, mid + 1, high)
  }
   *  */

findFloor([1, 2, 8, 10, 10, 12, 19], 9);
// findFloor([1,2,8,10,10,12,19], 20)
// findFloor([1,2,8,10,10,12,19], 0)
