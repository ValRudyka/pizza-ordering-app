function Username({ name }) {
  if (!name) {
    return null;
  }

  return (
    <div>
      <p className="hidden text-sm font-semibold md:block">{name}</p>
    </div>
  );
}

export default Username;
