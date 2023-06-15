function useRatioBoxValue(duration, label) {
  switch (duration) {
    case 15:
      return label === 'watts' ? 1 / 1500 : 1 / 20;

    case 60:
      return label === 'watts' ? 1 / 700 : 1 / 10;

    case 300:
      return label === 'watts' ? 1 / 500 : 1 / 7;

    case 1200:
      return label === 'watts' ? 1 / 400 : 1 / 6;

    default:
      return 1;
  }
}
export default useRatioBoxValue;
