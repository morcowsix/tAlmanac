export interface ChartDataset {
  type: string,
  symbol: string,
  data: number[],
  times: string[],
  colors: ChartColors
}

export interface ChartColors {
  pointBorderColor: string
  pointBackgroundColor: string
  borderColor: string
  backgroundColor: string
}
