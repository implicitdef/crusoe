

import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {ElementRef} from "@angular/core";
import {AfterViewInit} from "@angular/core";
import {Input} from "@angular/core";
import {DoCheck} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {NgZone} from "@angular/core";
import {GameState, Loc, Material} from "./GameState";

@Component({
  selector : 'scene',
  styles : [` canvas { 
     display : block;
     margin: 0 auto;
     outline : 2px solid black;
  }`],
  template : `<canvas height="{{sizeInPixels}}" width="{{sizeInPixels}}" #canvas></canvas>`
})
export class Scene implements AfterViewInit, DoCheck {
  @Input() sizeInPixels: number;
  @Input() state: GameState;
  @ViewChild("canvas") canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  currentFrame: Number;

  constructor(private ngZone: NgZone) {}

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
          let tileInGameLocation: Loc = {
            x : tileX + this.state.viewportOrigin.x - ((this.state.tilesInViewport - 1)/2),
            y: tileY + this.state.viewportOrigin.y - ((this.state.tilesInViewport - 1)/2)
          };
          let material = this.state.whatsAtMemoized(tileInGameLocation);
          for (let dotX = 0; dotX < this.state.dotsPerTile; dotX++){
            for (let dotY = 0; dotY < this.state.dotsPerTile; dotY++){
              let color;
                if (material == Material.Grass) {
                  color = ((dotX + dotY) % 2 == 0) ? '#151' : '#797'
                } else if (material == Material.Shallows){
                  color = ((dotX + dotY) % 2 == 0) ? '#cde' : '#abd'
                } else {
                  color = ((dotX + dotY) % 2 == 0) ? '#88d' : '#99c'
                }
              this.ctx.fillStyle = color;
              let drawingStartX = Math.floor(tileX * (pixelsByDot * this.state.dotsPerTile) + dotX * pixelsByDot);
              let drawingStartY = Math.floor(tileY * (pixelsByDot * this.state.dotsPerTile) + dotY * pixelsByDot);
              this.ctx.fillRect(drawingStartX, drawingStartY, Math.ceil(pixelsByDot), Math.ceil(pixelsByDot));
            }
          }
        }
      }
    }
  };

}
