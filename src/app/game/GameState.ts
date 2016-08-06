import {Injectable} from "@angular/core";


@Injectable()
export class GameState {

  // must be event !
  tilesInViewport = 15;
  dotsPerTile = 4;
  viewportOrigin: Loc = {x: 0, y: 0};

  private tilesWithGrass = [{x:0, y:0}, {x:3, y:1}];

  whatsAt = (loc: Loc): Material => {
    for (let tileWithGrass of this.tilesWithGrass){
      if (this.areTheSame(loc, tileWithGrass)){
        return Material.Grass;
      }
    }
    return Material.Water;
  };

  private areTheSame = (a: Loc, b: Loc): boolean =>
    (a.x == b.x && a.y == b.y);

}

export interface Loc {
  x: number;
  y: number;
}

export const enum Material {
  Grass,
  Water
}

