function CommonModal({
  isOpen,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>

        {children}

      </div>

    </div>
  );
}

export default CommonModal;