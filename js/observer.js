class Observer {
    constructor(data) {
        this.observer(data);
    }

    /**
     * 将所有的data数据改成set和get的形式
     * @param {*} data 
     */
    observer(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            // 劫持，若data[key]是个对象，则需要递归劫持
            // 响应式，为属性添加 get set 在下文定义
            this.defineReactive(data, key, data[key]);
            this.observer(data[key]);
        })
    }

    /**
     * 定义响应式，在赋新值的时候加点中间过程
     * @param {*} obj 
     * @param {*} key 
     * @param {*} value 
     */
    defineReactive(obj, key, value) {
        let that = this;
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            // 取值时调用的方法
            get() {
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            // 给data属性中设置值时，更改获取的属性的值
            set(newValue) {
                if (newValue !== value) {
                    // 这里的this不是实例
                    // 如果新值是对象则继续劫持
                    // that.observer(newValue);
                    value = newValue;
                    // 通知
                    dep.notify();
                }
            }
        })
    }
}