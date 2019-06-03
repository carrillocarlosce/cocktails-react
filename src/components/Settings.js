import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { bindActionCreators } from "redux";
import { updateSettings } from "../actions";
import { connect } from "react-redux";
import { colors } from "../theme";
import capitalize from "lodash/capitalize";
import keys from "lodash/keys";

const styles = theme => ({
  content: {
    marginBottom: "1em",
    padding: "1em 2em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  }
});

const Settings = ({ classes, settings, updateSettings }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Typography variant="h2" gutterBottom>
          Settings
        </Typography>
        <Typography component="p" paragraph>
          Currently these will not persist between page refreshes but it's just
          because I've not done that part yet (they will eventually).
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend">Color</FormLabel>
          <RadioGroup
            aria-label="Color"
            name="color"
            value={settings.color}
            onChange={event => {
              updateSettings({ color: event.target.value });
            }}
          >
            {keys(colors).map(color => {
              return (
                <FormControlLabel
                  value={color}
                  key={color}
                  control={<Radio />}
                  label={capitalize(color)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Theme</FormLabel>
          <RadioGroup
            aria-label="Theme"
            name="theme"
            value={settings.theme}
            onChange={event => {
              updateSettings({ theme: event.target.value });
            }}
          >
            {["light", "dark"].map(theme => {
              return (
                <FormControlLabel
                  value={theme}
                  key={theme}
                  control={<Radio />}
                  label={capitalize(theme)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  updateSettings: bindActionCreators(updateSettings, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));