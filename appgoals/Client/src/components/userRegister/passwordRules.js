import React, { useEffect, useState } from "react";
import "./passwordRules.css";

const PasswordRules = (props) => {
  const [rules, setRules] = useState({
    isValidLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
  });

  // useEffect(() => console.log(rules.isValidLength), [rules]);
  // useEffect(() => console.log(rules.hasNumber), [rules]);
  // useEffect(() => console.log(rules.hasSpecialChar), [rules]);
  // useEffect(() => console.log(rules.hasUppercase), [rules]);

  useEffect(() => {
    setRules((prevRules) => {
      return {
        // ...prevRules,
        isValidLength: props.password.match(/^.{8,}$/) ? true : false,
        hasNumber: props.password.match(/\d/) ? true : false,
        hasSpecialChar: props.password.match(/[!@#$._&*]/) ? true : false,
        hasUppercase: props.password.match(/[A-Z]/) ? true : false,
      };
    });
  }, [props.password, setRules]);

  return (
    <div className="password-rules-list">
      <ul>{rules.isValidLength ? null : <li>At least 8 characters</li>}</ul>
      <ul>{rules.hasNumber ? null : <li>At least one number (0-9)</li>}</ul>
      <ul>
        {rules.hasSpecialChar ? null : (
          <li>At least one special chart (!@#$._&*)</li>
        )}
      </ul>
      <ul>
        {rules.hasUppercase ? null : <li>At least one uppercase letter</li>}
      </ul>
    </div>
  );
};

export default PasswordRules;
