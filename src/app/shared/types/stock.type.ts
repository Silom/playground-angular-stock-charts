type StockStatusEntry = {
  datetime: string
  open: string
  high: string
  low: string
  close: string
  volume: string
}
type StockMetaData = {
  symbol: string
  interval: string
  currency: string
  exchange_timezone: string
  exchange: string
  mic_code: string
  type: string
}
type StockApiResponse = {
  meta: StockMetaData
  values: StockStatusEntry[]
}
export { StockStatusEntry, StockMetaData, StockApiResponse }
