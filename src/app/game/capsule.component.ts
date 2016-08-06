import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {GameState} from "../game/GameState";
import {Scene} from "../game/scene.component";
import {NgZone} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
  selector: 'capsule',
  directives : [Scene],
  styles : [`div {
    border : 1px solid green;
    margin : 30px;
    min-height : 300px;
    height: 70vh;
  }`],
  template: `
    <div #div>
      <scene [width]="width" [height]="height" [state]="state"></scene>
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
    let capsuleW = this.div.nativeElement.clientWidth;
    let capsuleH = this.div.nativeElement.clientHeight;
    this.canvasSize = Math.min(capsuleW, capsuleH);
    this.width = this.canvasSize;
    this.height = this.canvasSize;
  }

}




