export default class Utils {

    static isValidLine(lineString: string): boolean{
        const lineSplitted : string[] = lineString.split(',');
        return (lineSplitted != null && lineSplitted.length === 2  && lineSplitted[0].length>0 &&  lineSplitted[1].length > 0 && lineSplitted.some(element => ! isNaN(Number(element)))); 
    }

}