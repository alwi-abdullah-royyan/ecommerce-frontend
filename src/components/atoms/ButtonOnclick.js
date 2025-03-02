const ButtonOnclick = ({ label, onClick, type = "button", disabled = false, className }) => (
  <button onClick={onClick} type={type} disabled={disabled} className={`btn ${className}`}>
    {label}
  </button>
);

export default ButtonOnclick;
