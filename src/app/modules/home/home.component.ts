import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl } from '@angular/forms'
import {
    IStockSearchQuery,
    StockService,
} from '../../shared/services/stock.service'
import {
    StockStatusEntry,
    StockApiResponse,
} from '../../shared/types/stock.type'
import { ChartComponent } from '../../shared/components/chart/chart.component'
import { ReactiveFormsModule } from '@angular/forms'

import data from '../../shared/services/mock001'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ChartComponent, ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    chartData: StockStatusEntry[] = []

    symbol = new FormControl('')

    constructor(private stockService: StockService) {}

    ngOnInit() {
        this.chartData = data.values
        // // lets not use all out tokens
        // this.stockService.testCagetDatall().subscribe({
        //     next: ({ meta, values }: StockApiResponse) => {
        //         console.log(meta)
        //         console.log(values)
        //         this.chartData = values
        //     },
        // })
    }

    queryData(): void {
        const queries: IStockSearchQuery = {
            symbol: this.symbol.value as string,
            interval: '15min',
        }

        this.stockService.getData(queries).subscribe({
            next: ({ meta, values }: StockApiResponse) => {
                console.log(meta)
                console.log(values)
                this.chartData = values
            },
        })
    }
}
