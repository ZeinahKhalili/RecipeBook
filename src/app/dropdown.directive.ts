import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  // tslint:disable-next-line:typedef
    @HostBinding('class.open') get opened(){
      return this.isOpen;
    }
    private isOpen = false;
  // tslint:disable-next-line:typedef
    @HostListener('click') open(){
      this.isOpen = true;
    }
  // tslint:disable-next-line:typedef
    @HostListener('mouseleave') close(){
      this.isOpen = false;
    }

}
