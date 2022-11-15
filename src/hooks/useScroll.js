import { onMounted, onUnmounted, ref, onActivated, onDeactivated } from "vue";

export default function (target = window, dataRef = null) {

  /* 动画定时器 */
  let timer = null;
  
  /* 一键回顶部 动画时间默认1000毫秒 */
  const toTop = (millis = 1000) => {
    yScrollTo(0, millis);
  };

  /* y轴滚动到任意位置 动画时间默认1000毫秒 */
  const yScrollTo = (y, millis = 500) => {
    if (!timer) {
      const offset = target.scrollTop - y;
      const frameOffset = Math.abs(offset / (millis / 40));

      timer = setInterval(() => {
        if (offset > 0 && target.scrollTop - y > frameOffset) {
          target.scrollTop -= frameOffset;
        } else if (offset < 0 && y - target.scrollTop > frameOffset) {
          target.scrollTop += frameOffset;
        } else {
          target.scrollTop = y;
          clearInterval(timer);
          timer = null;
        }
      }, 40);
    }
  };

  /* 响应式数据实时滚动距离 */
  const scrollTop = ref(0);

  /* 滚动事件监听器 */
  const scrollHandler = (e) => {
    // console.log("scroll");

    // 实时同步scrollTop
    scrollTop.value = target.scrollTop;
  };

  /* 组件挂载时添加scrollHandler */
  onMounted(() => {
    target.addEventListener("scroll", scrollHandler);
  });

  /* 组件卸载时移除scrollHandler */
  onUnmounted(() => {
    target.removeEventListener("scroll", scrollHandler);
  });

  onActivated(() => {
    if (dataRef) {
      yScrollTo(dataRef.value);
      console.log("滚动位置已恢复为", dataRef.value);
    }
  });

  onDeactivated(() => {
    if (dataRef) {
      console.log("离开时的滚动位置", scrollTop.value);
      dataRef.value = scrollTop.value;
    }
  });

  /* 实时滚动距离返回给调用者 */
  return scrollTop;
}
