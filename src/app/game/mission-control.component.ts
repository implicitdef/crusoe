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
      <li>
        <label>
          Number of islands
          <input type="range" [(ngModel)]="gameState.numberOfIslands" min="0" max="100"> 
        </label>
      </li>
      <li>
        <label>
          Tiles in viewport
          <input type="range" [(ngModel)]="gameState.tilesInViewport" min="5" max="50"> 
        </label>
      </li>
      <li>
        <label>
          Dots pet tile
          <input type="range" [(ngModel)]="gameState.dotsPerTile" min="3" max="7"> 
        </label>
      </li>
    </ul>
`
})
export class MissionControl {
  constructor(private gameState: GameState){}
  //numberOfIslands = 50;
}
