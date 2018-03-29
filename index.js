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
        items: [
            {
                label: 'label',
                className: 'class name',
                click: 'call back',
                childrens: []
            }
        ]
    }
    var _node = null
    var _w_c = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }

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
        _init_body()
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
        window.addEventListener('resize', function () {
            _init_body()
        })
    }

    /**
     * 初始化项右键菜单条目
     * @param e
     * @private
     */
    var _init_rm = function (ev) {
        ev.preventDefault();
        _init_click();
        _init_item(def.items);
    }

    var _init_item = function (items) {
        var maxWidth = 0;
        for (var i in def.items) {
            var item = def.items[i]
            var className = 'rkm_item'
            if (item.className != null) {
                className = item.className
            }
            var node = createNodes('<div class="' + className + '">' + item.label + '</div>')[0]
            if (typeof item.click === 'function') {
                node.addEventListener('click', item.click)
            }
            items.push(node)
            if (node.clientWidth > maxWidth) {
                maxWidth = node.clientWidth
            }
        }
    }

    var _init_body = function () {
        _w_c.w = document.body.clientWidth
        _w_c.h = document.body.clientHeight
    }

    var _init_click = function (ev) {
        _w_c.x = ev.clientX
        _w_c.y = ev.clientY
    }

    return {
        init: _init
    }
});