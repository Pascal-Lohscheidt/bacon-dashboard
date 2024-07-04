import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}>;

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
}) => {
  const buttonClasses = clsx(
    'px-4 py-2 rounded-md',
    {
      'hover:bg-teal-500 hover:border-teal-300': !disabled,
      'bg-teal-500 border-2 border-teal-200 text-white': !disabled,
      'bg-slate-300 text-slate-500 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
