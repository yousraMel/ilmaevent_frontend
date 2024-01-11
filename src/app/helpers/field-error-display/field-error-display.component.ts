import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-field-error-display',
    templateUrl: './field-error-display.component.html',
    styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnInit {

    @Input() errorMsg: string = '';
    @Input() displayError: boolean = false;
    error: String = '';

    ngOnInit(): void {
        console.log(this.errorMsg);
        this.error = this.errorMsg;
    }
}

