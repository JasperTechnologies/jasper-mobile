export const isMenuItemReadyToAdd = (options, optionValuesForm) => {
  return options.reduce((isReady, option) => {
    if (option.required) {
      // check required option is selected
      return option.optionValues.reduce((requiredSelected, optionValue) => {
        const selected = optionValuesForm.find(o => o.optionId === option.id && o.id === optionValue.id);
        return selected || requiredSelected;
      }, false) && isReady;
    }
    return isReady;
  }, true);
};
