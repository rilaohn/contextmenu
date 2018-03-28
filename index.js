;(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define(factory);
    else if(typeof exports === 'object')
        exports["rkm"] = factory();
    else
        root["rkm"] = factory();
})(this, function () {
    var def = {
        items: []
    }
    var _node = null

    /**
     * 通过html字符串创建dom节点
     * @param str html字符串
     * @returns {HTMLCollection}
     */
    var createNodes = function (str) {
        var temp = document.createElement('div')
        temp.innerHTML = str
        return temp.children
    }

    /**
     * 初始化node
     * @param node dom节点
     * @param option 配置信息
     */
    var _init = function (node, option) {
        if (typeof node === 'object') {
            try {
                throw new Error('init node error')
            } catch (e) {
                console.error(e)
            }
            return false
        }
        if (option != null) {
            def = Object.assign({}, def, option)
        }
        _node = node
        _node.addEventListener('contextmenu', _init_rm)
    }

    /**
     * 初始化项右键菜单条目
     * @param e
     * @private
     */
    var _init_rm = function (event) {
        event.preventDefault();
        _init_item();
    }

    var _init_item = function () {
        var items = []
        var maxWidth = 0;
        for (var i in def.items) {
            var item = def.items[i]
            var className = 'rkm_item'
            if (item.className != null) {
                className = item.className
            }
            var node = createNodes('<div class="' + className + '">' + item.label + '</div>')[0]
            items.push(node)
            if (node.clientWidth > maxWidth) {
                maxWidth = node.clientWidth
            }
        }
    }

    return {
        init: _init
    }
});