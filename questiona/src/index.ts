const { exit } = require('process');
const readline = require('readline');
import Overlap  from '../src/overlap';
import Utils  from '../src/utils';

//import {Exit} from 'process';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=================== Question A ===================n");
console.log("This program accepts two lines (x1,x2) and (x3,x4) on the x-axis and returns whether they overlap\n\n");
const question1 = "=> Enter the first line (x1, x2) separated by comma: ";
const question2 = "=> Enter the second line (x3, x4) separated by comma: ";

rl.question(question1, (line1: string) => {
  
  rl.question(question2, (line2: string) => {
    if (!Utils.isValidLine(line1) || !Utils.isValidLine(line2)){
       console.error("====> Result: Invalid line(s)");
    }else{
      const line1Splitted = line1.split(',');
      const line2Splitted = line2.split(',');
      const [x1,x2] = line1Splitted.map(element=>Number(element));
      const [x3,x4] = line2Splitted.map(element=>Number(element));
      if (Overlap.overlap(x1, x2, x3, x4)) {
        console.log("====> Result:  OVERLAP");
      } else {
        console.log("====> Result:  NOT OVERLAP");
      }
    }

    rl.close();
  });
});

