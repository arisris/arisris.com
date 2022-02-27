import { useExternal, useSetState } from "ahooks";
import { CopyableText } from "components/CopyableText";
import LayoutTools from "components/LayoutTools";
import { useRef } from "react";

declare global {
  interface Window {
    CryptoJS: Record<string, any>;
  }
}

const ONE_WAY_HASH = ["MD5", "SHA1", "SHA256", "SHA512", "SHA3", "RIPEMD160"];

export default function Page() {
  const lib = useRef(null);
  useExternal(
    `https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js`,
    {
      type: "js",
      js: {
        async: true,
        onload() {
          lib.current = window.CryptoJS;
        }
      }
    }
  );
  const [state, setState] = useSetState({
    plainText: "",
    errors: ""
  });
  const clearErrors = () => setState({ errors: "" });
  const isReady = !!lib.current && !!state.plainText;
  const handleHash = (fn: (v: any) => any) => {
    try {
      return isReady ? fn(lib.current) : "";
    } catch (e) {
      return "Error...!";
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setState({ plainText: value });
    clearErrors();
  };

  return (
    <LayoutTools
      title="Create Crypto Hashing Online"
      description="Convert Text to Base64 OR above"
    >
      <div className="grid grid-cols-12 gap-4">
        <strong className="col-span-4">Plain Text</strong>
        {!!lib.current ? (
          <span className="text-green-500 col-span-4">Ready To Use</span>
        ) : (
          <span className="text-red-500 col-span-4">Loading Crypto Lib</span>
        )}
        <div className="col-span-12 relative">
          <CopyableText
            className="absolute bottom-4 right-4"
            iconSize={20}
            render={() => null}
            value={state.plainText}
          />
          <textarea
            rows={5}
            className="col-span-12 form-textarea dark:bg-gray-800 rounded-md w-full"
            value={state.plainText}
            onChange={handleChange}
          />
        </div>
        {isReady && (
          <>
            <h3 className="col-span-12">One Way Hashing</h3>
            {ONE_WAY_HASH.map((h, index) => (
              <HashResult
                key={"basic_hash_" + index}
                title={h}
                value={handleHash((i) => i[h](state.plainText))}
              />
            ))}
          </>
        )}
      </div>
    </LayoutTools>
  );
}

function HashResult({ title, value }: { value: string; title: string }) {
  return (
    <>
      <strong className="col-span-4">{title}</strong>
      {/* MD5 */}
      <div className="col-span-12 relative">
        {!!value && (
          <CopyableText
            className="absolute bottom-4 right-4"
            iconSize={18}
            render={() => null}
            value={value}
          />
        )}
        <textarea
          rows={2}
          readOnly
          className="col-span-12 form-textarea dark:bg-gray-800 rounded-md w-full"
          value={value}
        />
      </div>
    </>
  );
}
