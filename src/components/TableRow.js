import TableCell from "./TableCell";

function TableRow(props) {
  let cells = [];
  
  for (let i = 0; i < props.numCols; i++) {
    if (i < props.bgColorCol) {   //used by fillAll function to only apply background color to current cells
      cells.push(<TableCell handleApplyColor={props.handleApplyColor} bgColor={props.bgColor}/>)
    }
    else {
      cells.push(<TableCell handleApplyColor={props.handleApplyColor}/>)
    }
  }
  
  return <tr>{cells}</tr>
}

export default TableRow;