function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-3 py-2 rounded-md ${bgColor} ${textColor} ${className}  hover:transition-all hover:ease-out hover:duration-500 `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
