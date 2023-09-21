export const enabledRule = (event, rule) => {
  return event.rulesSet.includes(rule);
};
export const enabledRuleInTag = (event, rule) => {
  return event.tags.includes(rule);
};
