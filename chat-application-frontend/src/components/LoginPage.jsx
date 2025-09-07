import { useState } from 'react';
import { Stack, FormControlLabel, TextField, Button, Checkbox, Grid, Box, Typography, Divider, Link } from '@mui/material';
import loginIllustration from '../assets/login-illustration.gif';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  const createAccount = () => {
    console.log("Redirect to Sign Up page");
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: 900,
          width: '100%',
          backgroundColor: '#f3f3f3e6',
          borderRadius: 3,
          justifyContent: 'center',
          boxShadow: 3,
          overflow: 'hidden',
        }}
      >
        <Grid container>
          <Grid item xs={12} md={9} sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
              Welcome Back!
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Login to your account to continue
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberme"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 2,
                    paddingY: 1.5,
                    fontWeight: 'bold',
                    textTransform: 'none',
                  }}
                  fullWidth
                >
                  Login
                </Button>
              </Stack>
            </form>

            <Divider sx={{ my: 3 }} textAlign="center" variant="body2">
              OR
            </Divider>


            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link
                onClick={createAccount}
                sx={{ cursor: 'pointer', fontWeight: 'bold', color: 'primary.main' }}
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'end',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={loginIllustration}
              alt="Login Illustration"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
