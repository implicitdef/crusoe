import {Component} from "@angular/core";
import {GameState} from "./GameState";
import {Renderer} from "@angular/core";
import {OnDestroy} from "@angular/core";
import {OnInit} from "@angular/core";
import {AfterViewInit} from "@angular/core";
import {Input} from "@angular/core";



@Component({
  selector : 'mission-control',
  styles : [`
    div {
      outline: 0px dashed darkslategray;
      margin: 10px auto;
      text-align: center;
      //max-width : 400px;
    }
    li {
      font-size: 1.3em;
      list-style-type: none;
      line-height:1.5em;
    }
  `],
  template : `
    <div>
      <ul>
        <li><label>
          <input
              type="range"
              [ngModel]="gameState.tilesInViewport"
              (input)="updateTilesInViewport($event)"
              min="3" max="55" step="2"/> 
            Tiles in viewport
        </label></li>
         <li><label>
            <input
              type="range"
              [ngModel]="gameState.playerLoc.x"
              (input)="updateViewportOriginX($event)"
              min="-20" max="20"/> 
            Player location X
        </label></li>
        <li><label>
            <input
              type="range"
              [ngModel]="gameState.playerLoc.y"
              (input)="updateViewportOriginY($event)"
              min="-20" max="20"/>
            Player location Y
        </label></li>
        <li *ngFor="let text of gameState.texts">
          {{text}}
        </li>
      </ul>
    </div>
`
})
export class MissionControl implements OnDestroy, OnInit {
  destroyKeyboardListener: Function;
  @Input() gameState: GameState;



  constructor(private renderer: Renderer){}

  ngOnInit() {
    this.destroyKeyboardListener = this.renderer.listenGlobal('document', 'keydown', (event: KeyboardEvent) => {
      if (event.keyCode == 37 || event.key == 'a'){
        //left
        this.gameState.playerLoc.x --;
        event.preventDefault();
      } else if (event.keyCode == 38 || event.key == 'w') {
        //up
        this.gameState.playerLoc.y --;
        event.preventDefault();
      } else if (event.keyCode == 39 || event.key == 'd') {
        //right
        this.gameState.playerLoc.x ++;
        event.preventDefault();
      } else if (event.keyCode == 40 || event.key == 's') {
        //down
        this.gameState.playerLoc.y ++;
        event.preventDefault();
      }
    });
  }

  ngOnDestroy() {
    if (this.destroyKeyboardListener)
      this.destroyKeyboardListener();
  }


  updateTilesInViewport = (event: any) => {
    this.gameState.tilesInViewport = parseInt(event.target.value);
  };
  updateViewportOriginX = (event: any) => {
    this.gameState.playerLoc.x = parseInt(event.target.value);
  };
  updateViewportOriginY = (event: any) => {
    this.gameState.playerLoc.y = parseInt(event.target.value);
  };

}
