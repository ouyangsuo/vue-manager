const obj = {
  name: "change",

  createHandler: (el, binding, fn) => {
    return function (...args) {
      fn.apply(null, args);
    };
  },

  alias: {
    hover: "mouseenter",
  },

  pairs: {
    mouseenter: "mouseleave",
    mouseover: "mouseout",
  },

  /* 元素挂载时 */
  mounted(el, binding) {
    binding.arg = binding.arg || "mouseenter";
    binding.arg = obj.alias[binding.arg] || binding.arg;
    binding.flag = true;

    /* 存储原始样式 */
    binding.originalStyles = {};
    const cs = window.getComputedStyle(el);
    for (let key in binding.value) {
      binding.originalStyles[key] = cs[key];
    }

    /* 绑定事件监听器 */
    binding.eventHandler = obj.createHandler(el, binding, (e) => {
      let styles = binding.value;
      if (binding.modifiers.clear) {
        console.log(binding.arg, binding.flag);
        styles = binding.flag ? binding.value : binding.originalStyles;
      }

      for (let key in styles) {
        // console.log("key", binding.value);
        el.style[key] = styles[key];
      }

      binding.flag = !binding.flag;
    });
    el.addEventListener(binding.arg, binding.eventHandler);

    /* 对于鼠标覆盖 绑定一下配对的鼠标溢出监听器 */
    if (obj.pairs[binding.arg]) {
      binding.clearHandler = obj.createHandler(el, binding, (e) => {
        for (let key in binding.originalStyles) {
          el.style[key] = binding.originalStyles[key];
        }
      });
      el.addEventListener(obj.pairs[binding.arg], binding.clearHandler);
    }
  },

  /* 元素卸载时 */
  unmounted(el, binding) {
    console.log("unmounted,binding=", binding);

    /* 移除DOM事件监听器 避免内存泄露 */
    el.removeEventListener(binding.arg, binding.eventHandler);
    binding.eventHandler = null;
    console.log(binding.arg, "事件已移除");

    /* 如果有鼠标移出监听器 一并清除 */
    if (binding.clearHandler) {
      el.removeEventListener(obj.pairs[binding.arg], binding.clearHandler);
      binding.clearHandler = null;
      console.log(obj.pairs[binding.arg], "事件已移除");
    }
  },

};

export default obj;