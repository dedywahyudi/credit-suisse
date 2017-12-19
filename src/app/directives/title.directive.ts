import { Directive, Input, OnInit, ElementRef } from '@angular/core';

const tooltip = document.createElement('span');
tooltip.classList.add('app-title-tooltip');

@Directive({
  selector: '[appTitle]'
})
export class TitleDirective implements OnInit {
  private interval;

  @Input() appTitle = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const el = this.el.nativeElement;
    el.addEventListener('mouseover', this.showTooltip, false);
  }

  // Show the tooltip while hoverint the target element
  showTooltip = (ev: MouseEvent) => {
    tooltip.innerText = this.appTitle;
    this.positionTooltip(ev);

    document.body.appendChild(tooltip);
    document.addEventListener('mouseout', this.hideTooltip, false);
    document.addEventListener('mousemove', this.positionTooltip, false);
  }

  // Reposition the tooltip on mousemove over the target element
  positionTooltip = (ev: MouseEvent) => {
    tooltip.classList.remove('visible');

    clearInterval(this.interval);
    this.interval = setTimeout(() => tooltip.classList.add('visible'), 300);

    Object.assign(tooltip.style, {
      left: `${ev.clientX}px`,
      top: `${ev.clientY}px`,
    });
  }

  // Hide the tooltip when moving mouse out of target element
  hideTooltip = () => {
    clearInterval(this.interval);
    tooltip.classList.remove('visible');
    document.body.removeChild(tooltip);
    document.removeEventListener('mouseout', this.positionTooltip);
    document.removeEventListener('mouseout', this.hideTooltip);
  }
}
