
import {Component} from "@angular/core";
import {Capsule} from "./capsule.component";
import {MissionControl} from "./mission-control.component";

@Component({
  selector: 'experiment',
  directives : [Capsule, MissionControl],
  styles : [`
    div { 
      outline : 0px dashed purple;
      padding:10px 30px;
    }
    h2 { text-align: center}    
    `
  ],
  template: `
    <div>
      <h2>Experiment</h2>
      <mission-control></mission-control>
      <capsule></capsule>
    </div>
  `
})
export class Experiment {}
