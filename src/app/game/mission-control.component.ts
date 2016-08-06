import {Component} from "@angular/core";
import {GameState} from "./GameState";



@Component({
  selector : 'mission-control',
  styles : [`
    li {
      list-style-type: circle;
    }
  `],
  template : `
    <ul>
      <li><label> Tiles in viewport
          <input
            type="range"
            [ngModel]="gameState.tilesInViewport"
            (input)="updateTilesInViewport($event)"
            min="3" max="55" step="2"> 
      </label></li>
       <li><label> Viewport X
          <input
            type="range"
            [ngModel]="gameState.viewportOrigin.x"
            (input)="updateViewportOriginX($event)"
            min="-20" max="20"> 
      </label></li>
      <li><label> Viewport Y
          <input
            type="range"
            [ngModel]="gameState.viewportOrigin.y"
            (input)="updateViewportOriginY($event)"
            min="-20" max="20"> 
      </label></li>
    </ul>
`
})
export class MissionControl {
  constructor(private gameState: GameState){}

  updateTilesInViewport = (event: any) => {
    this.gameState.tilesInViewport = parseInt(event.target.value);
  };
  updateViewportOriginX = (event: any) => {
    this.gameState.viewportOrigin.x = parseInt(event.target.value);
  };
  updateViewportOriginY = (event: any) => {
    this.gameState.viewportOrigin.y = parseInt(event.target.value);
  };

}
