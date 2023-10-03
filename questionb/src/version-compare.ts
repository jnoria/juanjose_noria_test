export default class VersionCompare {

    public static readonly VERSION_A_GREATHER: number = 1;
    public static readonly VERSION_A_LESS: number = 2;
    public static readonly VERSION_EQUAL: number = 0;
    public static readonly VERSION__A_ERROR_INPUT: number = -1;
    public static readonly VERSION__B_ERROR_INPUT: number = -2;

    static compare(versionA: string, versionB : string) : number{
        
        if (!this.isValidVersion(versionA)) return this.VERSION__A_ERROR_INPUT;
        if (!this.isValidVersion(versionB)) return this.VERSION__B_ERROR_INPUT;
        
        const versionASplitted = versionA.split('.').map(element=>Number(element));
        const versionBSplitted = versionB.split('.').map(element=>Number(element));
    
        const max = Math.max(versionASplitted.length, versionBSplitted.length);
    
        for (let i = 0; i < max; i++) {
            const versionNumberA = versionASplitted[i] != null ? versionASplitted[i]: 0;
            const versionNumberB = versionBSplitted[i] != null ? versionBSplitted[i]: 0;
    
            if (versionNumberA < versionNumberB) {
                return this.VERSION_A_LESS;
            } else if (versionNumberA > versionNumberB) {
                return this.VERSION_A_GREATHER;;
            }
        }
    
        return this.VERSION_EQUAL;
    }

    private static isValidVersion(versionString: string): boolean{
        const versionPattern = /^\d+(\.\d+)*$/;
        return versionPattern.test(versionString);
    }

}   