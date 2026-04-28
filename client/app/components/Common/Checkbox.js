import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Checkbox = ({
  id,
  label,
  name,
  checked,
  onCheckboxChange,
  ...props
}) => {
  return (
    <FormGroup check>
      <Label check>
        <Input
          type='checkbox'
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onCheckboxChange(name, e.target.checked)}
          {...props}
        />
        {label}
      </Label>
    </FormGroup>
  );
};

export default Checkbox;
