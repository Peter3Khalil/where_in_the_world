function reverse(num){
    let reversedNum = "";
    num = num.toString();
    for(let i=num.length-1;i>=0;i--)
      reversedNum += num.at(i);
    return reversedNum;
}
function formatNumber(num){
    let formattedNumber = "";
    num = reverse(num);
    while(num.length>3){
      formattedNumber += num.slice(0,3) + ",";
      num = num.slice(3);
    }
    formattedNumber += num.slice(0,3);
    num = num.slice(3);
    formattedNumber = reverse(formattedNumber)
    return formattedNumber;
  }
  export default formatNumber