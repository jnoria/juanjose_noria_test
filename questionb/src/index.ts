const { exit } = require('process');
const readline = require('readline');
import VersionCompare  from './version-compare';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=================== Question B ===================n");
console.log("This program accepts 2 version string as input and returns whether one is greater than, equal, or less than the other.\n\n");
const question1 = "=> Enter version A: ";
const question2 = "=> Enter version B ";

rl.question(question1, (versionA: string) => {
  
  rl.question(question2, (versionB: string) => {
    const compareResult = VersionCompare.compare(versionA, versionB);
    if (compareResult == VersionCompare.VERSION__A_ERROR_INPUT) {
      console.log("====> Result:  Version A format error");
    }else{
      if (compareResult == VersionCompare.VERSION__B_ERROR_INPUT) {
        console.log("====> Result:  Version B format error");
      }else{
        if (compareResult == VersionCompare.VERSION_A_GREATHER) {
          console.log("====> Result:  Version A is grather than Version B");
        } else{ 
          if (compareResult == VersionCompare.VERSION_A_LESS) {
          console.log("====> Result:  Version A is less than Version B");
          }else {
            console.log("====> Result:  Version  A and Version B are the same");
          }
        }
      }
    }
    rl.close();
  });
});

