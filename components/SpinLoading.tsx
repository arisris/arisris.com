import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { FaRedo } from 'react-icons/fa';

export default function SpinLoading({
  text,
  className
}: PropsWithChildren<{ text: string; className?: string }>) {
  return (
    <div className={clsx('flex justify-center items-center gap-2', className)}>
      <FaRedo className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}
