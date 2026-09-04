export default function MemberTypeCard({
  type,
  title,
  description,
  icon,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`member-card ${selected ? "selected" : ""}`}
      aria-pressed={selected}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${icon.bg} ${icon.text}`}
      >
        {icon.svg}
      </div>

      <h4 className="text-[17px] font-bold text-gray-900">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
    </button>
  );
}