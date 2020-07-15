import React from "react";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:"center",
        margin: `${theme.spacing(0)} auto`
      },
      loginBtn: {
        marginBottom: theme.spacing(2),
        flexGrow: 1
      },
      card: {
        marginTop: theme.spacing(10)
      },
      CardActions:{
        'flex-wrap': 'wrap'
      }
}));

function ForgotPassword(props) {
 const classes = useStyles();
 const [email, setEmail] = React.useState('');
 const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
 const [helperText, setHelperText] = React.useState('');
 const [error, setError] = React.useState(false);
 function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

 React.useEffect(() => {
    if (email.trim()&& validateEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);
  

  const handleFP = (token) => {
    let data={email: email,'g-recaptcha-response': token}
    axios("http://localhost/forgot_pw", {
      method: "post",
      data: data,
      withCredentials: true
    }).then((resp)=>{
      setError(false);
      setHelperText(resp.data.message);
      console.log(resp)
      setIsButtonDisabled(true)
    }).catch((err)=>{
      setError(true);
      if(err.response){
        setHelperText(err.response.data.message)
        console.log(err.response)
      }else{
        setHelperText("Unknown error")
      }
    })
  };
  const _handleFP = () => {
    /*global grecaptcha*/ // defined in public/index.html
    grecaptcha.ready(function() {
      grecaptcha.execute('6LcqV9QUAAAAAEybBVr0FWnUnFQmOVxGoQ_Muhtb', {action: 'login'}).then(function(token) {
        handleFP(token)
      });
      })
}

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || _handleFP();
    }
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setEmail(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions  className={classes.CardActions}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.loginBtn}
              onClick={()=>_handleFP()}
              disabled={isButtonDisabled}>
              Continue
            </Button>

          </CardActions>
        </Card>
      </form>
  );
}

export default ForgotPassword;
