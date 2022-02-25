import { Dialog, Transition } from "@headlessui/react";
import { useSetState, useUpdateEffect } from "ahooks";
import type { SetState } from "ahooks/lib/useSetState";
import { createContext, Fragment, ReactNode, useContext } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalState {
  open: boolean;
  body: any;
  title: any;
  showCloseButton: boolean;
}
const initialState: ModalState = {
  open: false,
  body: null,
  title: null,
  showCloseButton: true
};

const ModalContext = createContext<[ModalState, SetState<ModalState>]>(null);

export function useModal() {
  const [state, setState] = useContext(ModalContext);

  return {
    isOpen: state.open,
    create: (body: any, title?: any) => {
      setState({ open: true, body, title });
    },
    destroy: () => setState({ open: false })
  };
}

function ModalComponent() {
  const [state, setState] = useContext(ModalContext);

  useUpdateEffect(() => {
    if (!state.open) {
      let t = setTimeout(() => {
        setState(initialState);
      }, 1000);
      return () => (t ? clearTimeout(t) : null);
    }
  }, [state.open]);

  return (
    <Transition appear show={state.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setState({ open: false })}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-screen-md ml-auto mr-auto p-4 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-md">
              {state.title && (
                <div className="border-b dark:border-gray-800 flex justify-between items-center pb-4 px-4">
                  <h5 className="font-bold">{state.title}</h5>
                  <button
                    type="button"
                    onClick={() => setState({ open: false })}
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              )}
              <div className="flex justify-center mt-2">{state.body}</div>

              {/* <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => setState({ open: false })}
                >
                  Got it, thanks!
                </button>
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export function UseModalConextProvider({ children }: { children: ReactNode }) {
  const state = useSetState<ModalState>(initialState);
  return (
    <ModalContext.Provider value={state}>
      {children}
      <ModalComponent />
    </ModalContext.Provider>
  );
}
