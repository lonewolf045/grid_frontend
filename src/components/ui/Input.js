import React, { useState, forwardRef } from 'react';
import './Input.css';

/**
 * Enhanced Input component with validation states
 * Supports various input types, validation, and accessibility features
 */
const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  disabled = false,
  required = false,
  size = 'medium',
  fullWidth = false,
  helperText,
  startIcon,
  endIcon,
  className = '',
  id,
  name,
  autoComplete,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value));

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const handleFocus = (e) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    setHasValue(Boolean(e.target.value));
    if (onChange) onChange(e);
  };

  const containerClasses = [
    'input-container',
    `input-container--${size}`,
    focused && 'input-container--focused',
    error && 'input-container--error',
    success && 'input-container--success',
    disabled && 'input-container--disabled',
    fullWidth && 'input-container--full-width',
    (hasValue || focused) && 'input-container--has-value',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'input',
    startIcon && 'input--with-start-icon',
    endIcon && 'input--with-end-icon'
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="input-label"
        >
          {label}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {startIcon && (
          <div className="input-icon input-icon--start" aria-hidden="true">
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [
              error && `${inputId}-error`,
              success && `${inputId}-success`,
              helperText && `${inputId}-helper`
            ].filter(Boolean).join(' ') || undefined
          }
          {...props}
        />
        
        {endIcon && (
          <div className="input-icon input-icon--end" aria-hidden="true">
            {endIcon}
          </div>
        )}
      </div>
      
      {helperText && !error && !success && (
        <div id={`${inputId}-helper`} className="input-helper-text">
          {helperText}
        </div>
      )}
      
      {error && (
        <div id={`${inputId}-error`} className="input-error-text" role="alert">
          {error}
        </div>
      )}
      
      {success && (
        <div id={`${inputId}-success`} className="input-success-text">
          {success}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;