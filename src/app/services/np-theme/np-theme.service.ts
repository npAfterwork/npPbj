import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NPThemeService {

  // #palette_for_white_text = [
  //   "#FFA500", "#FF7F50", "#FF4500", "#FF6347",
  //   "#FF00FF", "#BA55D3", "#9370DB", "#800080",
  //   "#663399", "#4B0082", "#9932CC", "#9400D3",
  //   "#7B68EE", "#9370DB", "#7B68EE", "#66CDAA",
  //   "#20B2AA", "#73C6B6", "#3498DB", "#4183D7",
  //   "#48D1CC", "#ABB2B9", "#808B96", "#566573",
  //   "#2E8B57", "#6B8E23", "#556B2F", "#228B22",
  //   "#3CB371", "#808000", "#FFD700", "#FF8C00"
  // ]

  #palette_for_white_text = [
    "#FF6347", "#556B2F", "#3CB371", "#9370DB",
    "#800080", "#d38b42", "#BA55D3", "#808B96",
    "#566573", "#FFD700", "#73C6B6", "#FF4500",
    "#663399", "#FF00FF", "#808000", "#FF7F50",
    "#3498DB", "#228B22", "#56B3C1", "#4183D7",
    "#279639", "#7B68EE", "#20B2AA", "#FF8C00",
    "#9932CC", "#66CDAA", "#4B0082", "#FFA500"
  ]
  #current = -1;

  constructor() {
  }

  getNextColor() {
    this.#current = (this.#current + 1) % this.#palette_for_white_text.length;
    return this.#palette_for_white_text[this.#current];
  }
}
