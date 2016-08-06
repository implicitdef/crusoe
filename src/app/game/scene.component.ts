

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
          for (let dotX = 0; dotX < dotsPerTile; dotX++){
            for (let dotY = 0; dotY < dotsPerTile; dotY++){

              let color;
              let pattern = this.getPatternForMaterial(material);
              if (usePatterns && pattern){
                color = pattern[dotY][dotX];
              } else {
                if (material == Material.Grass) {
                  color = dotX == dotY ? '#151' : '#797';
                } else if (material == Material.Shallows) {
                  color = (dotX + dotY) % 2 == 0 ? '#cde' : '#abd';
                } else {
                  color = (dotX + dotY) % 2 == 0 ? '#88d' : '#99c';
                }
              }
              this.ctx.fillStyle = color;
              let drawingStartX = Math.floor(tileX * (pixelsByDot * dotsPerTile) + dotX * pixelsByDot);
              let drawingStartY = Math.floor(tileY * (pixelsByDot * dotsPerTile) + dotY * pixelsByDot);
              this.ctx.fillRect(drawingStartX, drawingStartY, Math.ceil(pixelsByDot), Math.ceil(pixelsByDot));
            }
          }
        }
      }
    }
  };


  private getPatternForMaterial = (m: Material): string[][] => {
    if (m == Material.Water){
      let _ = '#458';
      let O = '#79c';
      return [
        [_,_,_,O,_,O,_],
        [_,_,_,O,_,O,_],
        [_,_,O,O,_,_,O],
        [O,_,O,_,_,_,O],
        [O,O,O,_,_,_,_],
        [_,O,_,_,O,_,_],
        [_,_,_,_,O,O,_]
      ]
    }
    if (m == Material.Shallows){
      let _ = '#88b';
      let O = '#9bd';
      //let O = 'red';
      return [
        [_,_,_,_,O,O,_],
        [_,_,O,O,O,O,O],
        [O,O,O,O,O,O,O],
        [O,O,O,O,_,_,O],
        [O,O,_,_,_,_,_],
        [_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_]
      ]
    }
    if (m == Material.Grass){
      let _ = '#454';
      let O = '#343';
      return [
        [_,O,_,O,_,O,_],
        [O,_,O,_,O,_,O],
        [_,O,_,O,_,O,_],
        [O,_,O,_,O,_,O],
        [_,O,_,O,_,O,_],
        [O,_,O,_,O,_,O],
        [_,O,_,O,_,O,_]
      ]
    }
    return undefined;
  }

}
