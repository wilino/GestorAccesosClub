import Button from '@mui/material/Button';

const BotonElegante = (props) => {
  return (
    <Button variant="contained" color="secondary" {...props}>
      {props.children}
    </Button>
  );
};

export default BotonElegante;