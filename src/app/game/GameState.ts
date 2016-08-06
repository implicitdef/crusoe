import {Injectable} from "@angular/core";


@Injectable()
export class GameState {

  numberOfIslands = 55;

  //controls the viewportzoom
  tilesInViewport = 15;


  dotsPerTile = 4;



}
