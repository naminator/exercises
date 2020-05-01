var removeDuplicates = function (nums) {
    let noDupes = [];

    nums.forEach((num) => {
        if (!noDupes.includes(num)) {
            noDupes.push(num);
        }
    });

    return noDupes;
};

console.log(removeDuplicates([1, 1, 2, 3, 3, 4, 5]));
