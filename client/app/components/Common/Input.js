import React from 'react';
import { FormGroup, Label, Input as BootstrapInput } from 'reactstrap';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onInputChange,
  error,
  ...props
}) => {
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <BootstrapInput
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onInputChange(name, e.target.value)}
        invalid={!!error}
        {...props}
      />
      {error && <div className='invalid-feedback d-block'>{error}</div>}
    </FormGroup>
  );
};

export default Input;
