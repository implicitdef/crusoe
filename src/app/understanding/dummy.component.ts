import { Component } from '@angular/core';
import {Dumbo} from "./dumbo.component";


@Component({
  selector : 'dummy',
  directives : [Dumbo],
  template : `
   <div>
    <h1>Dummy</h1>
    <button (click)="clicked()">Click</button>
    <dumbo [param]="paramPassed"></dumbo>
   </div>
  `
})
export class Dummy {

  paramPassed: any = { foo:"bar"}
  clicked(event){
    this.paramPassed.foo = "frite";
    window.setTimeout(() => (
      this.paramPassed.foo = "belge"
    ), 1000);
  }


}

