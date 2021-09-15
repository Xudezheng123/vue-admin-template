
 /**两个数组的交集 */
 export function intersect(arr1,arr2){
    let res = [];
    arr1.sort(function(a,b){
        return a-b;
    });
    arr2.sort(function(a,b){
        return a-b;
    });
    for(let i=0, j=0;i < arr1.length && j < arr2.length;){
        if(arr1[i] === arr2[j]){
            res.push(arr1[i])
            i++;
            j++;
        }else{
            arr1[i] < arr2[j] ? i++: j++;
        }
    }
    return res;
 }