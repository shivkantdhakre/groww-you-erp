function CommonButton({
  text,
  onClick,
  color = "bg-blue-600",
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white px-5 py-2 rounded-lg`}
    >
      {text}
    </button>
  );
}

export default CommonButton;