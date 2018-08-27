import {ships} from './ships';
import {EventEmitter} from '@angular/core';
import {IShip} from '../shared/interface/app.interfaceIShip';
import {IDisplay} from '../shared/interface/app.interfaceIDisplay';

export class Logic {
  displayHit: string;
  displayMiss: string;
  displayMessage: string;
  numShips: number;
  shipLength: number;
  shipsSunk: number;
  display: IDisplay;
  changeDisplay: EventEmitter<IDisplay>;
  ships: IShip[];

  constructor() {
    this.displayHit = '';
    this.displayMiss = '';
    this.displayMessage = '';
    this.ships = ships;
    this.numShips = 3;   // number of ships in the game
    this.shipLength = 3; // the length of each ship (in cages)
    this.shipsSunk = 0;  // number of sunken ships (initialize to 0)
    this.changeDisplay = new EventEmitter<IDisplay>();
    this.display = {
      displayMiss: this.displayMiss,
      displayHit: this.displayHit,
      displayMessage: this.displayMessage
    };
  }


  fire(guess) {// we check for hit guess - user entered coordinates
    for (let i = 0; i < this.numShips; i++) {
      const ship = this.ships[i];
      const index: number = ship.locations.indexOf(guess);
      if (index >= 0) {	 // missing then -1
        ship.hits[index] = 'hit';
        this.display.displayHit = guess;
        this.display.displayMessage = 'HIT';
        if (this.isSunk(ship)) {
          this.display.displayMessage = 'You sank my battleship!';
          this.shipsSunk++; // if the ship is sunk, then we increase the counter of the sunk ships by one
        }
        this.changeDisplay.emit(this.display);
        return true;
      }
    }
    this.display.displayMiss = guess;
    this.display.displayMessage = 'You missed';
    this.changeDisplay.emit(this.display);
    return false;
  }

  isSunk(ship) { // check whether the ship is sunk and return true or false
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      }
    }
    return true;
  }
}
