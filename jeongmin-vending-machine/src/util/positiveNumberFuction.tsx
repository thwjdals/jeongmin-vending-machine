export default function positiveNumberFuction(number: number, targetFunction: (number: number) => void) {
  if(number < 0) {
    throw new Error('Number is negative');
  }
  targetFunction(number);
}
