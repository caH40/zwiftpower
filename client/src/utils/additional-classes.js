// использование modules
export const addClasses = (additionalClasses = '', classModule) => {
  try {
    return additionalClasses
      .split(' ')
      .map((elm) => classModule[elm])
      .join(' ');
  } catch (error) {
    throw error;
  }
};
