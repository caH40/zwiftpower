export function getVoteText(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'голос';
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'голоса';
  } else {
    return 'голосов';
  }
}
