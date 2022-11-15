import { reactive, toRefs, onMounted, onUnmounted } from "vue";

function useMousePosition() {
  /* 定义响应式数据x,y代表鼠标位置 */
  const state = reactive({
    x: 0,
    y: 0,
  });

  /* 定义mousemove事件侦听器 */
  const mousemoveHandler = (e) => {
    // console.log(e.pageX, e.pageY);

    // 将鼠标的实时位置同步给响应式数据x,y
    state.x = e.pageX;
    state.y = e.pageY;
  };

  /* 组件挂载时建立mousemove事件侦听器 */
  onMounted(() => {
    window.addEventListener("mousemove", mousemoveHandler);
    console.log("onMounted:mousemove事件已监听");
  });

  /* 组件卸载时移除mousemove事件侦听器 避免内存泄露 */
  onUnmounted(() => {
    window.removeEventListener("mousemove", mousemoveHandler),
      console.log("mousemove事件监听已移除");
  });

  // {x,y}
  return toRefs(state);
}

export default useMousePosition
