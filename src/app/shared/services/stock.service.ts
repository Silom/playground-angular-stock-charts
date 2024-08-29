import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import ApiCred from '../../../../.apikey'

interface IApiQuery {
    key: String
    value: String
}
export interface IStockSearchQuery {
    symbol: string
    interval: string
}

function queryConstructor(queries: IApiQuery[]): String {
    let ret = ''
    queries.forEach(({ key, value }, i) => {
        i === 0 ? (ret += '?') : (ret += '&')
        ret += `${key}=${value}`
    })
    return ret
}

const APIKEY_QUERY: IApiQuery = { key: 'apikey', value: ApiCred.key }
function makeApiQuery(key: String, value: String): IApiQuery {
    return {
        key,
        value,
    }
}

//IBM
const makeApiSymbol = (value: String): IApiQuery =>
    makeApiQuery('symbol', value)

//5min
const makeApiInterval = (value: String): IApiQuery =>
    makeApiQuery('interval', value)

//TIME_SERIES_INTRADAY
const makeApiFunction = (value: String): IApiQuery =>
    makeApiQuery('function', value)

//format=JSON
const makeApiFormat = (value: String): IApiQuery =>
    makeApiQuery('format', value)

const makeApiType = (value: String): IApiQuery => makeApiQuery('type', value)
//type=stock

@Injectable({
    providedIn: 'root',
})
export class StockService {
    constructor(private http: HttpClient) {}

    testCall(): Observable<any> {
        const params = [
            makeApiSymbol('IBM'),
            makeApiInterval('5min'),
            makeApiFormat('JSON'),
            makeApiType('stock'),
            APIKEY_QUERY,
            //makeApiFunction('TIME_SERIES_INTRADAY'),
        ]
        return this.http.get(`${ApiCred.api}${queryConstructor(params)}`).pipe(
            catchError((error) => {
                return throwError(() => error)
            })
        )
    }

    getData(query: IStockSearchQuery): Observable<any> {
        const params = [
            makeApiSymbol(query.symbol),
            makeApiInterval(query.interval),
            makeApiFormat('JSON'),
            makeApiType('stock'),
            APIKEY_QUERY,
        ]
        return this.http.get(`${ApiCred.api}${queryConstructor(params)}`).pipe(
            catchError((error) => {
                return throwError(() => error)
            })
        )
    }
}
