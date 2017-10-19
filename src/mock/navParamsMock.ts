export class NavParamsMock {
    static returnParam = null;
    static get(key): any {
        return '';
    }
    static setParams(value) {
      NavParamsMock.returnParam = value;
    }
}