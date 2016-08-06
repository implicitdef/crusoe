import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {GameState} from "../game/GameState";
import {Scene} from "../game/scene.component";
import {NgZone} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
  selector: 'capsule',
  directives : [Scene],
  styles : [`div {
    min-height : 300px;
    height: 70vh;
    border: 0px dashed firebrick;
  }
  `],
  template: `
    <div #div>
      <scene [sizeInPixels]="canvasSize" [state]="state"></scene>
    </div>
  `
})
export class Capsule implements OnInit {
  constructor(private state: GameState){}

  @ViewChild('div') div: ElementRef;
  width: Number;
  height: Number;
  canvasSize: Number;

  ngOnInit() {
    this.refreshCanvasSize();
    window.addEventListener('resize', () => {
      this.refreshCanvasSize();
    });
  }

  refreshCanvasSize = () => {
    let canvasBorderSize = 2;
    let capsuleW = this.div.nativeElement.clientWidth;
    let capsuleH = this.div.nativeElement.clientHeight;
    this.canvasSize = Math.min(capsuleW, capsuleH);
  }

}




