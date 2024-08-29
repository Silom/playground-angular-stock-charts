type IStockStatusEntry = {
    datetime: string
    open: string
    high: string
    low: string
    close: string
    volume: string
}
type IStockMetaData = {
    symbol: string
    interval: string
    currency: string
    exchange_timezone: string
    exchange: string
    mic_code: string
    type: string
}
type IStockApiResponse = {
    meta: IStockMetaData
    values: IStockStatusEntry[]
}
export { IStockStatusEntry, IStockMetaData, IStockApiResponse }
