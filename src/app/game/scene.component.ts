

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

  constructor(private ngZone: NgZone) {}

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

    let dotsPerTile = 4;
    // patterns are made for 7 dots only
    let usePatterns = dotsPerTile == 7;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.sizeInPixels, this.sizeInPixels);

      let pixelsByTile = (this.sizeInPixels / this.state.tilesInViewport);
      let pixelsByDot = (pixelsByTile / dotsPerTile);

      for (let tileX = 0; tileX < this.state.tilesInViewport; tileX++){
        for (let tileY = 0; tileY < this.state.tilesInViewport; tileY++){
          let tileInGameLocation: Loc = {
            x : tileX + this.state.viewportOrigin.x - ((this.state.tilesInViewport - 1)/2),
            y: tileY + this.state.viewportOrigin.y - ((this.state.tilesInViewport - 1)/2)
          };
          let material = this.state.whatsAtMemoized(tileInGameLocation);
          let shipIsThere = this.state.isShipThere(tileInGameLocation);

          for (let dotX = 0; dotX < dotsPerTile; dotX++){
            for (let dotY = 0; dotY < dotsPerTile; dotY++){

              let color;
              if (shipIsThere && (dotX == 1 || dotX == 2) && (dotY == 1 || dotY == 2)){
                color = '#420';
              } else if (material == Material.Grass) {
                color = (dotX + dotY) % 2 == 0 ? '#151' : '#797';
              } else if (material == Material.Sand) {
                color = (dotX + dotY) % 2 == 0 ? '#fec' : '#dca';
              } else if (material == Material.Shallows) {
                color = (dotX + dotY) % 2 == 0 ? '#ade' : '#9bd';
              } else {
                color = (dotX + dotY) % 2 == 0 ? '#78d' : '#89c';
              }
              this.ctx.fillStyle = color;
              let drawingStartX = Math.floor(tileX * (pixelsByDot * dotsPerTile) + dotX * pixelsByDot);
              let drawingStartY = Math.floor(tileY * (pixelsByDot * dotsPerTile) + dotY * pixelsByDot);
              this.ctx.fillRect(drawingStartX, drawingStartY, Math.ceil(pixelsByDot), Math.ceil(pixelsByDot));

            }
          }
          if (shipIsThere) {
            let drawingStartX = Math.floor(tileX * (pixelsByDot * dotsPerTile));
            let drawingStartY = Math.floor(tileY * (pixelsByDot * dotsPerTile));
            let size = Math.ceil(pixelsByDot * dotsPerTile);
            let half = size/2;
            let radius = size/3;
            this.ctx.beginPath();
            this.ctx.arc(drawingStartX + half, drawingStartY + half, radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#420';
            this.ctx.fill();
          }
        }
      }
    }
  };


}
