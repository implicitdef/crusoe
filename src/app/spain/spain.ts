import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {Capsule} from "../game/capsule.component";

@Component({
  selector: 'spain',
  directives : [Capsule],
  template: `
    <div class="spain">
      <capsule></capsule>
    </div>
  `
})
export class Spain {}


