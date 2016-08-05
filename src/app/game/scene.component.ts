

import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {ElementRef} from "@angular/core";
import {AfterViewInit} from "@angular/core";
import {Input} from "@angular/core";
import {DoCheck} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {NgZone} from "@angular/core";
import {GameState} from "./GameState";

@Component({
  selector : 'scene',
  template : `<canvas width="400" height="100" #canvas></canvas>`
})
export class Scene implements AfterViewInit, DoCheck {
  @Input() state: GameState;
  @ViewChild("canvas") canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  constructor(private ngZone: NgZone) {
    console.log(`ngZone : ${ngZone}`);
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.askForRedraw();
  }

  ngDoCheck(){
    this.askForRedraw();
  }

  askForRedraw = () => {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.redraw);
    });
  };

  redraw = () => {
    console.log(`redrawing`);

    if (this.ctx) {
      this.ctx.clearRect(0, 0, 400, 400);
      this.ctx.fillStyle = "lightgray";
      this.ctx.fillRect(0, 0, 100, 100);
      this.ctx.fillStyle = "gray";
      this.ctx.fillText(`Hello World. There are ${this.state.numberOfIslands} island(s)`, 10, 10);
    }
  };

}
