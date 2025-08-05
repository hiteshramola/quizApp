import React from 'react';
import '../styles/CustomRadio.scss';

interface CustomRadioProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  className
}) => {
  return (
    <div className={`customRadio ${className || ''}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="customRadio_input"
      />
      <label htmlFor={id} className="customRadio_label">
        <span className="customRadio_button"></span>
        {label && <span className="customRadio_text">{label}</span>}
      </label>
    </div>
  );
};

export default CustomRadio;