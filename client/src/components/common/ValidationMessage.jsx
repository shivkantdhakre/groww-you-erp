function ValidationMessage({ type, message }) {
  if (!message) return null;

  const styles = {
    error: "bg-red-100 text-red-700 border border-red-300",
    success: "bg-green-100 text-green-700 border border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  };

  return (
    <div className={`p-3 rounded-lg mt-3 ${styles[type]}`}>
      {message}
    </div>
  );
}

export default ValidationMessage;