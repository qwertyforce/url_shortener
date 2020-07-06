import React from "react";
import axios from 'axios';
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
  React.useEffect(() => {
    axios("http://localhost/get_user_links", {
      method: "get",
      withCredentials: true
    }).then((resp)=>{
      setLinks(resp.data.links)
      console.log(resp)
    }).catch((err)=>{
      if(err.response){
        console.log(err.response)
      }
    })
  }, []);

  
  const [links, setLinks] = React.useState(false);

  function afs(){
    return (
      <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Shortened url</TableCell>
              <TableCell align="center">Original url</TableCell>
              <TableCell align="center">Views</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.short_id}>
                <TableCell component="th" scope="row">
                  {`http://localhost/${link.short_id}`}
                </TableCell>
                <TableCell align="center">{link.original_link}</TableCell>
                <TableCell align="center">{link.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }  
  return (
    <div className={classes.container}>
      {(!links)?<h2>please,<a href="/login">log in</a></h2>:
      afs()}
     
    </div>
  );
}

export default App_Bar;