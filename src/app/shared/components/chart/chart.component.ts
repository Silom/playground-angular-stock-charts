import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IStockStatusEntry } from '../../types/stock.type'
import * as d3 from 'd3'

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
    private svg: any
    private margin = 50
    private width = 750 - this.margin * 2
    private height = 400 - this.margin * 2

    @Input() data!: IStockStatusEntry[]

    ngOnInit(): void {
        // this.createSvg()
        // this.drawBars()
        // this.drawLines()
        this.renderChart()
    }

    private renderChart(): void {
        // clean the slate
        d3.selectAll('svg > *').remove()

        // Declare the chart dimensions and margins.
        const width = 928
        const height = 500
        const marginTop = 20
        const marginRight = 30
        const marginBottom = 30
        const marginLeft = 40

        // Declare the x (horizontal position) scale.
        const x = d3.scaleUtc(
            // @ts-ignore
            d3.extent(this.data, (d) => new Date(d.datetime)),
            [marginLeft, width - marginRight]
        )

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear(
            [
                d3.min(this.data, (d) => Number(d.close)) as number,
                d3.max(this.data, (d) => Number(d.close)) as number,
            ],
            [height - marginBottom, marginTop]
        )

        // Declare the line generator.
        const line = d3
            .line()
            // TODO need to find a way to properly overload this d3 is a bit finicky
            .x((d: any) => x(new Date(d.datetime)))
            .y((d: any) => y(Number(d.close)))

        // Create the SVG container.
        this.svg = d3
            .select('figure#bar')
            .append('svg')
            // .attr('width', width)
            // .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')

        // Add the x-axis.
        this.svg
            .append('g')
            .attr('transform', `translate(0,${height - marginBottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
            )

        // Add the y-axis, remove the domain line, add grid lines and a label.
        this.svg
            .append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call((g: any) => g.select('.domain').remove())
            .call((g: any) =>
                g
                    .selectAll('.tick line')
                    .clone()
                    .attr('x2', width - marginLeft - marginRight)
                    .attr('stroke-opacity', 0.1)
            )
            .call((g: any) =>
                g
                    .append('text')
                    .attr('x', -marginLeft)
                    .attr('y', 10)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'start')
                    .text('↑ Daily close ($)')
            )

        // Append a path for the line.
        this.svg
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            // @ts-ignore
            .attr('d', line(this.data))
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#bar')
            .append('svg')
            // .attr('width', this.width + this.margin * 2)
            // .attr('height', this.height + this.margin * 2)
            .attr(
                'viewBox',
                `0 0 ${this.width + this.margin * 2} ${
                    this.height + this.margin * 2
                }`
            )
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append('g')
            .attr('transform', `translate(${this.margin},${this.margin})`)
    }

    private drawLines(): void {
        console.log('start lines')
        // Declare the x (horizontal position) scale.
        const x = d3
            .scaleUtc()
            .domain(this.data.map((d) => new Date(d.datetime)))
            .range([0, this.width])
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end')

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear().domain([0, 400]).range([this.height, 0])

        this.svg.append('g').call(d3.axisLeft(y))
    }

    private drawBars(): void {
        // Create the X-axis band scale
        const x = d3
            .scaleUtc()
            .domain(this.data.map((d) => new Date(d.datetime)))
            .range([0, this.width])

        //const range = d3.extent(this.data, (m) => new Date(m.datetime))
        //console.log(range)
        //const x = d3.scaleTime().domain().range([0, this.width])

        // Draw the X-axis on the DOM
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end')

        // Create the Y-axis band scale
        const y = d3.scaleLinear().domain([0, 400]).range([this.height, 0])

        // Draw the Y-axis on the DOM
        this.svg.append('g').call(d3.axisLeft(y))

        // Create and fill the bars
        this.svg
            .selectAll('bars')
            .data(this.data)
            .enter()
            .append('rect')
            .attr('x', (d: any) => x(d.datetime))
            .attr('y', (d: any) => y(d.open))
            //.attr('width', x.bandwidth())
            .attr('height', (d: any) => this.height - y(d.Stars))
            .attr('fill', '#d04a35')
    }
}
