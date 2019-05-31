export default ({ Vue }) => {
  if (typeof window !== "undefined") {
    const { default: APlayer } = require("@moefe/vue-aplayer");
    Vue.use(APlayer);
  }
};
