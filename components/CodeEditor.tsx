import {
  Fragment,
  useEffect,
  useRef,
  useState
} from "react";
import Highlight, {
  defaultProps,
  Language,
  Prism
} from "prism-react-renderer";
import { useEditable, Options, Position } from "use-editable";
import themeLight from "prism-react-renderer/themes/github";
import themeDark from "prism-react-renderer/themes/dracula";
import { useTheme } from "next-themes";
import clsx from "clsx";
import filename2prism from "filename2prism";

const detectLangByFilename = (filename: string): Language => {
  const keys = Object.keys(Prism.languages);
  const langs = filename2prism(filename);
  if (langs.length && keys.findIndex((i) => langs.indexOf(i) !== -1)) {
    return langs[0] as Language;
  }
  // default to markup
  return "markup";
};

interface Props extends Options {
  code?: string;
  filename?: string;
  onChange?: (code: string, pos: Position) => void;
  className?: string;
}

export function CodeEditor({
  onChange,
  code,
  indentation = 2,
  disabled = false,
  filename = "",
  className,
  ...props
}: Props) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState(themeLight);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLPreElement>();
  useEditable(
    ref,
    (code, pos) => {
      code = code.slice(0, -1);
      onChange && onChange(code, pos);
    },
    {
      disabled,
      indentation
    }
  );
  useEffect(() => setMounted(true), []);
  useEffect(
    () => {
      setTheme(resolvedTheme === "dark" ? themeDark : themeLight)
    },
    [resolvedTheme]
  );
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={detectLangByFilename(filename)}
    >
      {({ className: clazz, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            clazz,
            "ring-1 focus:ring-2 focus:outline-none transition-all duration-300",
            className
          )}
          style={style}
          ref={ref}
        >
          {tokens.map((line, i) => (
            <Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              {mounted ? "\n" : ""}
            </Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
