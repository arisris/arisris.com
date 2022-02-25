import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaRegClone } from "react-icons/fa";
import { useClipboard } from "use-clipboard-copy";

type CopyableTextProps = {
  value: any;
  render?: (text: string, handler: CopyableTextHandler) => void;
  renderIcon?: (handler: CopyableTextHandler) => void;
  onError?: () => void;
  onSuccess?: () => void;
  iconSize?: number;
  className?: string;
};
type CopyableTextHandler = (e: any) => void;

export function CopyableText({
  value,
  className,
  ...props
}: CopyableTextProps) {
  const [success, setSuccess] = useState(false);
  const clipboard = useClipboard({
    onSuccess: () => {
      setSuccess(true);
      if (props.onSuccess) props.onSuccess();
    },
    onError: props.onError
  });
  useEffect(() => {
    if (success) {
      let tid = setTimeout(() => {
        setSuccess(false);
      }, 1000);
      return () => clearTimeout(tid);
    }
  }, [success]);
  const handleCopy = useCallback<CopyableTextHandler>(
    (e) => {
      e.preventDefault();
      clipboard.copy("".concat(value));
    },
    [clipboard.copy, value]
  );
  return (
    <div className={clsx("flex gap-2 self-center items-center", className)}>
      {props.render ? (
        props.render(value, handleCopy)
      ) : (
        <strong onClick={handleCopy}>{value}</strong>
      )}
      {props.renderIcon ? (
        props.renderIcon(handleCopy)
      ) : success ? (
        <FaCheck
          size={props.iconSize || 16}
          className="text-green-500"
        />
      ) : (
        <a href="#" onClick={handleCopy} title="Copy Text">
          <FaRegClone
            size={props.iconSize || 16}
            className="text-green-500 transition-transform hover:scale-110 active:scale-100"
          />
        </a>
      )}
    </div>
  );
}
