class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 先获取oldValue
        this.value = this.get();
    }

    get() {
        // 只要一创建Watcher实例，就把实例赋给Dep.target
        Dep.target = this;
        // 这里一取得属性就会调用属性的get()方法，在Observer.js
        let value = this.getVal(this.vm, this.expr);
        // 更新完成后，取消
        Dep.target = null;
        return value;
    }
    getVal(vm, expr) {
        expr = expr.split('.');
        return expr.reduce((pre, next) => {
            return pre[next];
        }, vm.$data);
    }

    update() {
        let newValue = this.getVal(this.vm, this.expr);
        let oldValue = this.value;
        if (newValue !== oldValue) {
            this.cb(newValue);
        }
    }
}