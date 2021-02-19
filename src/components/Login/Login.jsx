import React, { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  makeStyles,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import { firebaseApp } from '../../firebase/firebaseConfig';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withRouter, Redirect, Link as RouterLink } from 'react-router-dom';
import PasswordReset from './PasswordReset';
import Background from '../../assets/montessori_bg.jpeg';
import MobileBackground from '../../assets/mobile_bg.jpeg';
const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').required('Password is required')
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
    width: '100vw',
    height: '100vh',

    backgroundImage: `url(${Background}); no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${MobileBackground}); no-repeat`
    }
  },
  flexImg: {
    width: '100%',
    maxWidth: 900,
    height: 'auto',
    zIndex: 1
  },
  paper: {
    padding: 20
  },
  card: {
    minWidth: '70%',
    zIndex: 200
  },
  formInput: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 30,
    paddingLeft: 30
  },

  formLink: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  cardHeader: {
    textAlign: 'center',
    color: theme.palette.secondary.main
  }
}));
const Login = ({ history }) => {
  const classes = useStyles();
  const currentUser = localStorage.getItem('user') || null;
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);

  const handleLogin = useCallback(
    async (values) => {
      const { email, password } = values;

      try {
        await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleCloseDialog = () => {
    setPasswordResetOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleLogin,
    validationSchema: validationSchema
  });

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={'md'}>
        <img src="/mcg.jpg" alt="MCG Banner" className={classes.flexImg}></img>

        <Container maxWidth={'sm'}>
          <Card className={classes.card}>
            <CardHeader
              title={
                <>
                  <LockOutlinedIcon fontSize="large" /> <Typography variant="h4">Login</Typography>
                </>
              }
              className={classes.cardHeader}
            ></CardHeader>

            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12} className={classes.formInput}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      variant="outlined"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.formInput}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      variant="outlined"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Grid>

                  <Grid container className={classes.formLink}>
                    <Grid item xs={6} container justify="flex-start">
                      <RouterLink to={'/'}>
                        <Typography variant="caption">← My Week</Typography>
                      </RouterLink>
                    </Grid>

                    <Grid item xs={6} container justify="flex-end">
                      <Link href="#" onClick={() => setPasswordResetOpen(true)}>
                        <Typography variant="caption">Reset Password</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.formInput}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Container>

      <PasswordReset dialogOpen={passwordResetOpen} handleCloseDialog={handleCloseDialog} />
    </div>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object.isRequired
};
