/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var search = function(nums, target) {

// };

var search = (arr, v) => {
  let i = 0,
    j = arr.length - 1;
  while (i <= j) {
    let mid = Math.round((i + j) / 2);
    if (arr[mid] > v) {
      j = mid - 1;
    } else if (arr[mid] === v) {
      return mid;
    } else {
      i = mid + 1;
    }
  }
  return -1;
};
