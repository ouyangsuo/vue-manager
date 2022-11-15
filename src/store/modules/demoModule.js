const moduleNews = {
  /* 加命名空间 */
  namespaced: true,

  state() {
    return {
      content: null,
    };
  },

  getters: {},

  mutations: {
    setObj(state, content) {
      state.content = content;
    },
  },

  actions: {
    async fetchContent({ commit, sate }, arg) {
      // let content = await getContentFromApi(arg)
      commit("setNewsContent", { name: "content" });
    },
  },
};

export default moduleNews;
