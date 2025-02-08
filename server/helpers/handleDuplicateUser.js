export const handleDuplicateUser = (arr, obj) => {
    let count = { num: 0 };
    iterate(arr, obj, count)
}

const iterate = (arr, obj, count) => {
    arr.forEach((item) => {
        if (item.name == obj.name) {
            obj.name += count.num;
            count.num++;
            iterate(arr, obj, count);
        }
    })

}