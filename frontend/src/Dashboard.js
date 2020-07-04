import React from "react";
import {useSelector} from 'react-redux';
import {selectEmail} from './redux_slices/userDataSlice';
import {makeStyles} from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop:50
  }
}));

function App_Bar (props) {
  const classes = useStyles();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  function afs(){
    return (
      <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Shortened url</TableCell>
              <TableCell align="right">Original url</TableCell>
              <TableCell align="right">Views</TableCell>
              {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }  
  const Email = useSelector(selectEmail);
  return (
    <div className={classes.container}>
      {(Email!==null)?<h2>please,<a href="/login">log in</a></h2>:
      afs()}
     
    </div>
  );
}

export default App_Bar;