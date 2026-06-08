function CommonPageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-6">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="text-gray-500">
        {subtitle}
      </p>

    </div>
  );
}

export default CommonPageHeader;