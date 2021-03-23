
import { Component } from "react";
import TableRow from "./TableRow";
import './Table.css';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      numRows: 0,
      numCols: 0,
      selectedColor: "red",
      bgColor: "",
      bgColorRow: 0,
      bgColorCol: 0,
    };
  }

  addRow = () => {
    let addedRows = this.state.numRows + 1;
    let cols = this.state.numCols;

    if(cols === 0){
      this.setState(state => {
          return {
            numRows: addedRows,
            numCols: state.numCols + 1,
          }
      });
    }
    //prevents new rows from having background color
    else if (this.state.bgColorRow > this.state.numRows) {
      this.setState({
        bgColorRow: this.state.numRows,
        numRows: this.state.numRows + 1,
      })
    }
    else{
      this.setState(state => {
          return {numRows: state.numRows + 1}
      });
    }
  }

  addColumn = () => {
    let addedCols = this.state.numCols + 1;
    let rows = this.state.numRows;

    if(rows === 0){
      this.setState(state => {
          return {
            numRows: state.numRows + 1,
            numCols: addedCols,
          }
      });
    }
    //prevents new columns from having background color
    else if (this.state.bgColorCol > this.state.numCols) {
      this.setState({
        bgColorCol: this.state.numCols,
        numCols: this.state.numCols + 1,
      })
    }
    else{
      this.setState(state => {
          return {numCols: state.numCols + 1}
      });
    }
  }

  removeRow = () => {
    // if the current number of rows is zero, do nothing
    if (this.state.numRows === 0) {
      return;
    }

    // decrease the number of rows by 1
    this.setState({
      numRows: this.state.numRows - 1,
    })
  }

  removeColumn = () => {
    // if the current number of columns is zero, do nothing
    if (this.state.numCols === 0) {
      return;
    }

    // decrease the number of columns by 1
    this.setState({
      numCols: this.state.numCols - 1,
    })
  }

  fillAll = () => {
    let tableCell = document.getElementsByTagName("td");
    console.log(tableCell.length);
    for (let i = 0; i < tableCell.length; i++) {
        tableCell[i].style.backgroundColor = this.state.selectedColor;
    }
  }

  fillUncolored = () => {
    let uncoloredCells = [];
    let tableCell = document.getElementsByTagName("td");
    for (let i =0; i < tableCell.length; i++)
    { //checks if background color for each cell is undefined. 
      //if true set background color
      if (tableCell[i].style.backgroundColor == "white") 
      {
        tableCell[i].style.backgroundColor = this.state.selectedColor;
      }
    }
    //fills every uncolored cell with the selected color
    for (let i = 0; i < uncoloredCells.length; i++)
    {
      uncoloredCells[i].style.backgroundColor = this.state.selectedColor; 
    }
  }

  handleColorChange = (event) => {
    this.setState({selectedColor: event.target.value});
  }

  handleApplyColor = (event) => {
    event.target.style.backgroundColor = this.state.selectedColor;
  }
  
  clear = () => {
    let tableCell = document.getElementsByTagName("td");
    // clear every cell
    for (let i = 0; i < tableCell.length; i++) 
    {
      tableCell[i].style.backgroundColor = "white";
    }
  }

  render() {
    let rows = [];

    for (let i = 0; i < this.state.numRows; i++) {
      if (i < this.state.bgColorRow) {  //used by fillAll function to only apply background color to current cells
        rows.push(<TableRow bgColor={this.state.bgColor} bgColorCol={this.state.bgColorCol} numCols={this.state.numCols} handleApplyColor={this.handleApplyColor} />);
      }
      else {
        rows.push(<TableRow numCols={this.state.numCols} handleApplyColor={this.handleApplyColor} />);
      }
    }

    return (
      <div>
        <button onClick={this.addRow}>Add Row</button>
        <button onClick={this.addColumn}>Add Column</button>
        <button onClick={this.removeRow}>Remove Row</button>
        <button onClick={this.removeColumn}>Remove Column</button>
        <button onClick={this.fillUncolored}>Fill Uncolored Cells</button>
        <button onClick={this.fillAll}>Fill All</button>
        <button onClick={this.clear}>Clear</button>
        <select onChange={this.handleColorChange}>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="yellow">yellow</option>
        </select>
        <table>
          {rows}
        </table>
      </div>
    )
  }
}

export default Table;