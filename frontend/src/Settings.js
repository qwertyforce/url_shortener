import React from "react";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Button from "@material-ui/core/Button";
import config from "./config/config"
function Settings(props) {
  return (
    <div>
      <div>
        <h1>Settings</h1>
        <Button variant="contained" onClick={props.handleChangeTheme} startIcon={<InvertColorsIcon />}>
          Change theme
      </Button>

      </div>
      <div style={{marginTop:25}}>
        <Button variant="contained" href={`${config.domain}/logout`} color="secondary">
          Logout
        </Button>
      </div>
    </div>
  )

}
export default Settings;
