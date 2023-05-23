
import BigNumber from "bignumber.js"

export const numToUSD = (num: number): string => num.toLocaleString('en',{style: 'currency',currency: "USD"})

export const setPrecision = (num: number, precision: number): number => {
  return new BigNumber(num).decimalPlaces(precision).toNumber()
}