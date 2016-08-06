

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
  styles : [` canvas { 
     border : 1px solid red
  }`],
  template : `<canvas height="{{sizeInPixels}}" width="{{sizeInPixels}}" #canvas></canvas>`
})
export class Scene implements AfterViewInit, DoCheck {
  @Input() sizeInPixels: Number;
  @Input() state: GameState;
  @ViewChild("canvas") canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  currentFrame: Number;

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
    if (this.currentFrame) {
      //cancelAnimationFrame(this.currentFrame);
    }
    this.ngZone.runOutsideAngular(() => {
      this.currentFrame = requestAnimationFrame(this.redraw);
    });
  };

  redraw = () => {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.sizeInPixels, this.sizeInPixels);

      let pixelsByTile = (this.sizeInPixels / this.state.tilesInViewport);
      let pixelsByDot = (pixelsByTile / this.state.dotsPerTile);

      for (let tileX = 0; tileX < this.state.tilesInViewport; tileX++){
        for (let tileY = 0; tileY < this.state.tilesInViewport; tileY++){
          for (let dotX = 0; dotX < this.state.dotsPerTile; dotX++){
            for (let dotY = 0; dotY < this.state.dotsPerTile; dotY++){

              let color = ((tileX + tileY) % 2 == 0) ? (
                ((dotX + dotY) % 2 == 0) ? '#eee' : '#ddd'
              ): (
                ((dotX + dotY) % 2 == 0) ? '#ccf' : '#bbe'
              );
              this.ctx.fillStyle = color;


              let drawingStartX = tileX * (pixelsByDot * this.state.dotsPerTile) + dotX * pixelsByDot;
              let drawingStartY = tileY * (pixelsByDot * this.state.dotsPerTile) + dotY * pixelsByDot;
              this.ctx.fillRect(drawingStartX, drawingStartY, pixelsByDot, pixelsByDot);



            }
          }
        }
      }



      this.ctx.fillStyle = "gray";
      this.ctx.fillText(`Hello World. There are ${this.state.numberOfIslands} island(s)`, 10, 10);
      this.ctx.fillText(`Hello World. There are ${this.state.tilesInViewport} tiles in viewport`, 10, 50);
    }
  };

}
