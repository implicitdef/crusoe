import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {GameState} from "../game/GameState";
import {Scene} from "../game/scene.component";

@Component({
  selector: 'spain',
  directives : [Scene],
  template: `
    <div class="spain">
      <p>In spain</p>
      <scene [state]="state"></scene>
    </div>
  `
})
export class Spain implements AfterViewInit {
  constructor(private state: GameState){}

  paramValue = 33;

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.state.numberOfIslands = 55;
    }, 3000);
  }

}




