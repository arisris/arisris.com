import { useSetState } from "ahooks";
import { CopyableText } from "components/CopyableText";
import LayoutTools from "components/LayoutTools";

export default function Page() {
  const [state, setState] = useSetState({
    endoded: "",
    decoded: "",
    encodingError: "",
    decodingError: ""
  });
  const clearErrors = () => setState({ encodingError: "", decodingError: "" });

  const handleDecodedChange = (e: any) => {
    const value = e.target.value;
    setState({ decoded: value });
    clearErrors();
    try {
      const result = window.btoa(value);
      setState({ endoded: result });
    } catch (err) {
      console.error(err.message);
      setState({ encodingError: "Encoding Failed!" });
    }
  };

  const handleEncodedChange = (e: any) => {
    const value = e.target.value;
    setState({ endoded: value });
    clearErrors();
    try {
      const result = window.atob(value);
      setState({ decoded: result });
    } catch (err) {
      console.error(err.message);
      setState({ decodingError: "Decoding Failed!" });
    }
  };

  return (
    <LayoutTools
      title="Online Base64 Encode/Decode"
      description="Convert Text to Base64 OR above"
    >
      <div className="grid grid-cols-12 gap-4 w-full">
        <strong className="col-span-4">Decoded Text</strong>
        {!!state.encodingError && (
          <span className="text-red-500 col-span-4">{state.encodingError}</span>
        )}
        <div className="col-span-12 relative">
          <CopyableText
            className="absolute bottom-4 right-4"
            iconSize={20}
            render={() => null}
            value={state.decoded}
          />
          <textarea
            rows={5}
            className="col-span-12 form-textarea dark:bg-gray-800 rounded-md w-full"
            value={state.decoded}
            onChange={handleDecodedChange}
          />
        </div>
        <strong className="col-span-4">Encoded Text</strong>
        {!!state.decodingError && (
          <span className="text-red-500 col-span-4">{state.decodingError}</span>
        )}
        <div className="col-span-12 relative">
          <CopyableText
            className="absolute bottom-4 right-4"
            iconSize={20}
            render={() => null}
            value={state.endoded}
          />
          <textarea
            rows={5}
            className="col-span-12 form-textarea dark:bg-gray-800 rounded-md w-full"
            value={state.endoded}
            onChange={handleEncodedChange}
          />
        </div>
      </div>
    </LayoutTools>
  );
}
