import React from "react";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import config from "./config/config"
function isValidURL(url){
  var RegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i

  if(RegExp.test(url)){
      return true;
  }else{
      return false;
  }
} 

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 400,
    margin: `${theme.spacing(0)} auto`
  },
  loginBtn: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  card: {
    width:"fit-content",
    marginTop:20
  },
  card_container:{
    display: 'flex',
    justifyContent: "center",
  },

  card_content: {
    paddingBottom:"16px!important"
  }
}));

function App_Bar (props) {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [shortened_url, setShortenedurl] = React.useState('');
  const [helperText, setHelperText] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const short_link = () => {
    let data={link:url}
    axios(`${config.domain}/shorten`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then((resp)=>{
      setError(false);
      console.log(resp.data.link_id)
      setShortenedurl(`${config.domain}/${resp.data.link_id}`)
      setUrl("")
    }).catch((err)=>{
      console.log(err)
      setError(true);
      if(err.response){
        setHelperText("Something went wrong")
        console.log(err.response)
      }else{
        setHelperText("Unknown error")
      }
    })
    
  };
  React.useEffect(() => {
    if (url.trim()&&isValidURL(url)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [url]);
  
 
  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || short_link();
    }
  };
  return (
    <div>
      <div>
      <TextField
                error={error}
                fullWidth
                autoComplete="off"
                id="email"
                type="text"
                label="URL"
                placeholder="https://google.com"
                margin="normal"
                variant="outlined"
                value={url}
                helperText={helperText}
                onChange={(e)=>setUrl(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={()=>short_link()}
              disabled={isButtonDisabled}>
              Shorten
            </Button>

      </div>
      <div className={classes.card_container}>
      {(shortened_url!=='')?(<Card className={classes.card} >
          <CardContent className={classes.card_content}>
            {shortened_url}
            </CardContent>
        </Card>):null}
      
    </div>
     
      
    </div>
  );
}

export default App_Bar;