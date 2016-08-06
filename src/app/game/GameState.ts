import {Injectable} from "@angular/core";
import {PerlinNoiseLib} from "./perlin-noise-lib";


@Injectable()
export class GameState {

  // must be event !
  tilesInViewport = 15;

  viewportOrigin: Loc = {x: 0, y: 0};
  private lib = new PerlinNoiseLib();
  private materialsMemoized: Material[][] = [];
  private getMemoizedMaterial = (loc: Loc): Material => {
    let row = this.materialsMemoized[loc.x];
    if (row !== undefined) {
      return row[loc.y];
    } else return undefined;
  };
  private setMemoizedMaterial = (loc: Loc, material) => {
    let row = this.materialsMemoized[loc.x];
    if (row === undefined){
      row = this.materialsMemoized[loc.x] = [];
    }
    row[loc.y] = material;
  };

  constructor (){
    this.lib.seed(Math.random());
  }


  isShipThere = (loc: Loc) => {
    return this.areTheSame(loc, this.viewportOrigin);
  }

  whatsAtMemoized = (loc: Loc): Material => {
    let mat = this.getMemoizedMaterial(loc);
    if (mat !== undefined) {
      return mat;
    }
    mat = this.whatsAtDynamic(loc);
    this.setMemoizedMaterial(loc, mat);
    return mat;
  };

  private whatsAtDynamic = (loc: Loc): Material => {
    let noiseValue = (this.lib.perlin2(
      loc.x/30,
      loc.y/30
    ) + 1) / 2;
    if (noiseValue > 0.72)
      return Material.Grass;
    if (noiseValue > 0.7)
      return Material.Sand;
    if (noiseValue > 0.55)
      return Material.Shallows;
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
  Shallows,
  Water,
  Sand
}

