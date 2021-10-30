import clsx from "clsx"

export default function SpinLoading({text, className}) {
  return (
    <div className={clsx("flex justify-center items-center gap-2", className)}>
      <FaRedo className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}