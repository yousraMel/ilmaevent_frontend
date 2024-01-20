import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDragScroll]'
})
export class DragScrollDirective {
    private isDragging = false;
    private startX!: number;
    private scrollLeft!: number;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
        console.log('Mouse DOWN')
        this.isDragging = true;
        this.startX = event.pageX - this.el.nativeElement.offsetLeft;
        this.scrollLeft = this.el.nativeElement.scrollLeft;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        console.log('Mouse MOVE')
        if (!this.isDragging) return;

        const x = event.pageX - this.el.nativeElement.offsetLeft;
        const walk = (x - this.startX) * 2; // Adjust the multiplier for smoother scrolling

        this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
    }

    @HostListener('mouseup')
    onMouseUp(): void {
        console.log('Mouse UP')
        this.isDragging = false;
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        console.log('Mouse LEAVE')
        this.isDragging = false;
    }
}