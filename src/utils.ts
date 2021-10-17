export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
  //if Math.random is less than 5 number will be ahead or behind
