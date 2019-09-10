export const getOptionsByType = (options) => {
  return options.reduce((res, option) => {
    if (res[option.type]) {
      res[option.type].push(option);
    } else {
      res[option.type] = [option];
    }
    return res;
  }, {});
};
