
import {Component} from "@angular/core";
import {Capsule} from "./capsule.component";
@Component({
  selector: 'experiment',
  directives : [Capsule],
  styles : [`
    div { 
      border : 1px solid purple;
      padding:0 30px;
    }`
  ],
  template: `
    <div>
      <h3>Experiment</h3>
      <capsule></capsule>
    </div>
  `
})
export class Experiment {}
