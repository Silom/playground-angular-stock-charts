import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-billboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './billboard.component.html',
    styleUrl: './billboard.component.css',
})
export class BillboardComponent implements OnInit {
    ngOnInit(): void {}
}
