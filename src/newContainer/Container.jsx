import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar, Button, CssBaseline, Grid, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from './MenuIcon';
import './Container.sass';

const Container = (props) => {
  const {
    name, children, history,
  } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className="appBar">
        <Toolbar>
          <MenuIcon className="icon" />
          <Typography variant="h6" color="inherit" noWrap className="icon">
            Dynamic Table
          </Typography>
          <Button color="inherit" size="large" onClick={() => history.push('/trades')}>
            Trades
          </Button>
          <Button color="inherit" size="large" onClick={() => history.push('/withdraws')}>
            Withdraws
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <div className="heroUnit">
          <div className="heroContent">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {`${name.charAt(0).toUpperCase() + name.slice(1)} Table` }
            </Typography>
          </div>
        </div>
        <div className="layout">
          <Grid container>
            {children}
          </Grid>
        </div>
      </main>
    </React.Fragment>
  );
};

Container.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Container);
