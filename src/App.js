import React, { Component } from 'react';
import logo from './logo.svg';
import './App.min.css';

const cols = 7;
const floors = 9;
const bricks = 8;
const bricksRow = 3;


function GlassDoor() {
  return (
    <div className="window-glass window-glass-door"></div>
  );
}

function GlassFull() {
  return (
    <div className="window-glass window-glass-full"></div>
  );
}

function BalconyTexture() {
  let balconyTexture = [];

  for (let i = 0; i < 40; i++) {
    balconyTexture.push(<li></li>)
  }
  return(
    <ul className="balcony-texture">
      {balconyTexture}
    </ul>
  );
}

function Balcony() {
  return (
    <div className="balcony">
      <div className="balcony-texture-container">
        <BalconyTexture />
      </div>
    </div>
  );
}

function GlazingFrame(props) {
  let glazingFrame = [];
  var glazingPartsNum = props.wide == 'wide' ? 5 : 4;
  for (let i = 0; i < glazingPartsNum; i++) {
    var emptyFrame = Math.random()>0.7 ? 'empty' : '';
    glazingFrame.push(<li className={emptyFrame}></li>)
  }
  return(
    <ul className="glazing-frame">
      {glazingFrame}
    </ul>
  );
}

function Glazing(props) {
  return (
    <div className="glazing">
        <GlazingFrame wide={props.wide} />
    </div>
  );
}

function Window(props) {
  var windowBlockClass = "window-block " + "purple " + props.wide + " " + props.halfWindowType;
  var glassDoor = props.balcony ? <GlassDoor /> : '';
  var balcony = props.balcony ? <Balcony /> : '';
  var glassFull = props.balcony && props.wide == 'narrow' ? '' : <GlassFull />;
  var glazing = props.balcony && Math.random()>0.3 ? <Glazing wide={props.wide} /> : '';
  return (

    <li className={windowBlockClass}>
      <div className="window-mozaic">
        <div className="window-frame">
          <div className="window-glass window-glass-half"></div>
          {glassFull}
          {glassDoor}
        </div>
      </div>
      {balcony}
      {glazing}
    </li>
  );
}




class FullBlock extends Component {
  createHeader = () => {
    let headerBlock = []

    for (let i = 0; i < cols; i++) {
      var wideRoof = i==1 || i == (cols-2) ? 'wide' : 'narrow';
      var wideRoofClass = "roof-part " + wideRoof;
      headerBlock.push(<li className={wideRoofClass}><div className="roof-part-line"></div></li>)
    }
    return headerBlock
  }
  createBlock = () => {
    let block = []

    for (let i = 0; i < floors; i++) {
      let children = []
      for (let j = 0; j < cols; j++) {
        var balconyWindow = j<2 || j > (cols-3) ? true : false;
        var wideWindow = j==1 || j == (cols-2) ? 'wide' : 'narrow';
        var halfWindowType = Math.random()>0.7 ? 'window-leaf' : 'window-top';

        children.push(<Window balcony={balconyWindow} wide={wideWindow} halfWindowType={halfWindowType} />)
      }
      //Create the parent and add the children
      block.push(<li><ul className="floor">{children}</ul></li>)
    }
    return block
  }
  createFooter = () => {
    let brickBlock = []

    for (let i = 0; i < bricksRow; i++) {
      let brickRow = []
      for (let j = 0; j < cols*bricks+4; j++) {

        brickRow.push(<li className="brick"></li>)
      }
      //Create the parent and add the children
      brickBlock.push(<li><ul className="brick-row">{brickRow}</ul></li>)
    }
    return brickBlock
  }

  render() {
    return(
      <div className="block-full">
        <ul className="block-header">
          {this.createHeader()}
        </ul>
        <ul className="block-body">
          {this.createBlock()}
        </ul>
        <ul className="block-footer">
          {this.createFooter()}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  createBuilding = () => {
    let building = []
    for (let i = 0; i < 10; i++) {
      building.push(<FullBlock />)
    }
    return building
  }
  render() {
    return(
      <div className="building">{this.createBuilding()}</div>
    )
  }
}

export default App;
