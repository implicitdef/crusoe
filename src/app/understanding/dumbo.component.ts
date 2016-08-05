import { Component } from '@angular/core';
import {Input} from "@angular/core";
import {AfterViewInit} from "@angular/core";
import {DoCheck} from "@angular/core";

@Component({
  'selector' : 'dumbo',
  'template' : `<h3>Dumbo {{param | json}}</h3>`
})
export class Dumbo implements DoCheck {
  @Input('param') param: Number;

  ngDoCheck(){
    console.log("got new values");
  }
}
