import {Component} from "@angular/core";
import {GameState} from "./GameState";
import {Renderer} from "@angular/core";
import {OnDestroy} from "@angular/core";
import {OnInit} from "@angular/core";
import {AfterViewInit} from "@angular/core";



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
export class MissionControl implements OnDestroy, OnInit {
  destroyKeyboardListener: Function;

  constructor(private gameState: GameState, private renderer: Renderer){}

  ngOnInit() {
    this.destroyKeyboardListener = this.renderer.listenGlobal('document', 'keydown', (event: KeyboardEvent) => {
      if (event.keyCode == 37 || event.key == 'a'){
        //left
        this.gameState.viewportOrigin.x --;
        event.preventDefault();
      } else if (event.keyCode == 38 || event.key == 'w') {
        //up
        this.gameState.viewportOrigin.y --;
        event.preventDefault();
      } else if (event.keyCode == 39 || event.key == 'd') {
        //right
        this.gameState.viewportOrigin.x ++;
        event.preventDefault();
      } else if (event.keyCode == 40 || event.key == 's') {
        //down
        this.gameState.viewportOrigin.y ++;
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
    this.gameState.viewportOrigin.x = parseInt(event.target.value);
  };
  updateViewportOriginY = (event: any) => {
    this.gameState.viewportOrigin.y = parseInt(event.target.value);
  };

}
