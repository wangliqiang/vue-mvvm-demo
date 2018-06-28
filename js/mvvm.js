class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;

        // 是否存在需要编译的模板，存在则开始编译
        if (this.$el) {
            new Observer(this.$data);
            new Compile(this.$el, this);
        }
    }
}