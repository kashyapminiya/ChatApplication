import { Button } from '@mui/material';

export default function PrimaryButton({ children, onClick, fullWidth = false, ...props }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </Button>
  );
}
