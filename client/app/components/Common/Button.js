import React from 'react';
import { Button as BootstrapButton } from 'reactstrap';

const Button = ({ type = 'button', text, ...props }) => {
  return (
    <BootstrapButton type={type} color='primary' {...props}>
      {text}
    </BootstrapButton>
  );
};

export default Button;
