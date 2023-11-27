import react from "react";
import { FormGroup, Label, Input } from "reactstrap";

export function CustomFormInput({
  isRequired,
  labelName,
  type,
  name,
  error,
  onChange,
  value,
  isNumber,
  isVisible,
  readOnly,
  className="",
}) {
  return (
    isVisible && (
      <FormGroup className={className}>
        <Label className="col-form-label pt-0">
          {isRequired && <span>*</span>}
          {labelName}
        </Label>
        <Input
          name={name}
          className="form-control"
          type={type}
          readOnly={readOnly && true}
          onChange={(e) => {
            if (isNumber) {
              return e.target.value.match(/^\d*(\.\d+)?$/) && onChange(e);
            }
            return onChange(e);
          }}
          value={value}
        />
        {error && (
          <span
            style={{
              color: "red",
            }}
          >
            {error}
          </span>
        )}
      </FormGroup>
    )
  );
}
export function CustomSelectFormInput({
  isRequired,
  labelName,
  name,
  error,
  onChange,
  value,
  children,
}) {
  return (
    <FormGroup>
      <Label className="col-form-label">
        {isRequired && <span>*</span>}
        {labelName}
      </Label>
      <select
        name={name}
        onChange={onChange}
        value={value}
        className="form-select"
      >
        <option value="">--Select--</option>
        {children}
      </select>
      {error && (
        <span
          style={{
            color: "red",
          }}
        >
          {error}
        </span>
      )}
    </FormGroup>
  );
}
