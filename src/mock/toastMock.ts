export class ToastMock {
    create() {
        return new ToastMock;
    }

    present(): Promise<any> {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}