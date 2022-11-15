export default {
  name: "pin",

  /* 
    v-pin="20" 元素固定定位 距离顶部20px
    v-pin:left="20" 元素固定定位 距离左边20px
    */
  handler: (el, binding) => {
    el.style.position = "fixed";
    let arg = binding.arg || "top";
    el.style[arg] = binding.value + "px";
  },
};
