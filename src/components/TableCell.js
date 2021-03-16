function TableCell(props) {
    return <td className="square" onClick={props.handleApplyColor} style={{ backgroundColor: props.bgColor }}></td>
  }
  
  export default TableCell;