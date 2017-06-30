import React, { Component } from 'react';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.now = new Date();
    this.state = {
      seconds: this.now.getSeconds(),
      minutes: this.now.getMinutes(),
      hours: this.now.getHours()
    };
  }

  tick() {
    this.now = new Date();
    this.setState({
      seconds: this.now.getSeconds(),
      minutes: this.now.getMinutes(),
      hours: this.now.getHours()
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Clock: {Common.showCLock(this.state.hours, this.state.minutes, this.state.seconds)} </div>
    );
  }
}

export class Timer extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      seconds: 59,
      minutes: 3,
      hours: null
    };
  }

  tick() {
    this.setState((prevState)=> ({
      seconds: prevState.seconds-1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Timer: {Common.showTimer(this.state)} </div>
    );
  }
}

class Common {
  
  static showCLock(hours, minutes, seconds){
    return  this.formatTime(hours) + ":" +  this.formatTime(minutes) + ":" + this.formatTime(seconds);
  }

  static getTimeObject(hours, minutes, seconds){
    var timeString = this.showCLock(hours, minutes, seconds);
    return new Date(timeString);
  }

  static showTimer(timeObj){    

    var hour = timeObj.hours !== null || timeObj.hours !== undefined? timeObj.hours: 0;
    var minutes = timeObj.minutes !== null || timeObj.minutes !== undefined? timeObj.minutes: 0;
    var seconds = timeObj.seconds !== null || timeObj.seconds !== undefined? timeObj.seconds: 0;
    var distance = hour*1000 * 60 * 60 + minutes*1000 * 60 + seconds*1000;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return this.showCLock(hours, minutes, seconds);
  }

  static formatTime(value){
    if(value === null || value === undefined) return "00";
    if(value < 10) return "0" + value;
    return value;
  }
}