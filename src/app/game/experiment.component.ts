
import {Component} from "@angular/core";
import {Capsule} from "./capsule.component";
import {MissionControl} from "./mission-control.component";

@Component({
  selector: 'experiment',
  directives : [Capsule, MissionControl],
  styles : [`
    div { 
      border : 1px solid purple;
      padding:0 30px;
    }`
  ],
  template: `
    <div>
      <h3>Experiment</h3>
      <mission-control></mission-control>
      <capsule></capsule>
    </div>
  `
})
export class Experiment {}
