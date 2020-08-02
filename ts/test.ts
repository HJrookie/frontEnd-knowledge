interface NumberArray {
    [index: number]: number;
}
let fff: NumberArray = [1, 1, 2, 3, 5]; 
for(let i in fff){
    console.log(fff[i])
}