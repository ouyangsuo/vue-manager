import { reactive, toRefs, onMounted, onUnmounted } from "vue";
function getTimeDiffer(startDate, endDate) {
  // var startDate = new Date("2008-08-08T08:00:00");
  // var endDate = new Date();

  // 计算时间戳之差
  var timeDiffer = endDate - startDate;
  // console.log(timeDiffer);

  // 计算过去了多少天
  var daysDiffer = parseInt(timeDiffer / (24 * 3600 * 1000));
  // console.log(daysDiffer);

  // 计算不足一天的时分秒 odd奇数，零头
  var oddMillis = timeDiffer % (24 * 3600 * 1000);
  var hoursDiffer = parseInt(oddMillis / (3600 * 1000));
  // console.log(hoursDiffer);

  // 不足一小时的零头毫秒
  oddMillis = oddMillis % (3600 * 1000);
  var minutesDiffer = parseInt(oddMillis / (60 * 1000));
  // console.log(minutesDiffer);

  // 计算秒
  var secondsDiffer = Math.round((oddMillis % (60 * 1000)) / 1000);
  // console.log(secondsDiffer);

  // 组装显式
  // var differStr = `${daysDiffer}天零${hoursDiffer}小时${minutesDiffer}分${secondsDiffer}秒`;
  // console.log("距离奥运开幕过去了", differStr);

  // 将时差字符串丢还调用者
  return {
    daysDiffer,
    hoursDiffer,
    minutesDiffer,
    secondsDiffer,
  };
}


const useCountDown = (targetDate) => {
  /* 九天十地菩萨摇头怕怕宇宙超级无敌逻辑复用之王自定义hook */
  // const {x,y} = useMousePosition()

  /* 声明响应式数据 */
  const state = reactive({
    // targetDate: new Date(2023, 0, 1),
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /* 组件挂载时 建立定时器 更新剩余的时间数据 */
  let timer = null;
  onMounted(() => {
    timer = setInterval(() => {
      const { daysDiffer, hoursDiffer, minutesDiffer, secondsDiffer } =
        getTimeDiffer(new Date(), targetDate);

      state.days = daysDiffer;
      state.hours = hoursDiffer;
      state.minutes = minutesDiffer;
      state.seconds = secondsDiffer;
    }, 1000);
  });

  /* 组件卸载时移除定时器 */
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      console.log("timer已移除");
    }
  });

  // {days,hours,minutes,seconds}
  return toRefs(state);
};

export default useCountDown