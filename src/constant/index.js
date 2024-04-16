export const initialData = {
  speed: 800,
  rows: 30,
  cols: 50,
  gridFull: Array(30)
    .fill()
    .map(() => Array(50).fill(false)),
};

export const dropdownOptions = [
  { size: 1, value: "20* 10" },
  { size: 2, value: "50 * 30" },
  { size: 3, value: "70 * 50" },
];

export const cellOptions = [
  { size: 0, value: "15* 15" },
  { size: 1, value: "20* 20" },
  { size: 2, value: "30 * 30" },
  { size: 3, value: "40 * 40" },
];
