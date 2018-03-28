(function (root, factory) {
    console.log('root: ', root)
    console.log('factory: ', factory())
    console.log('factory.pa: ', factory().foo(5))
})(this, function () {
    return (function (val) {
        function __foo(i) {
            return val * i
        }
        return {
            foo: __foo
        }
    }) (5)
})

function aa() {
    var a = this;
    console.log("a: ", a)
}



aa()