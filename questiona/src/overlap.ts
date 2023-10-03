export default class Overlap {

    /**
     * Accepts two lines (x1,x2) and (x3,x4) on the x-axis and returns whether they overlap
     * @param x1 x1 for the fist line
     * @param x2 x2 for the fist line
     * @param x3 x1 for the second line
     * @param x4 x2 for the second line
     * @returns true if the lines ares overlapped
     */
    static overlap(x1: Number, x2 : Number, x3: Number, x4: Number) : boolean{
        return !(x2 < x3 || x4 < x1);
    }
 
}