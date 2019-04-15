import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#2196f3',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

function Container(props) {
  const {
    classes,
    name,
    children,
    history,
  } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <InsertChartOutlined className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap className={classes.icon}>
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
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              { name }
            </Typography>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {children}
          </Grid>
        </div>
      </main>
    </React.Fragment>
  );
}

Container.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(withStyles(styles)(Container));
