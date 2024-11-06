"use client";
import { CrossIcon } from "lucide-react";
import { useEffect } from "react";

import { createPortal } from "react-dom";

interface Props {
    children: React.ReactNode;
    title?: string;
    handelDrawerClose: () => void;
    forceHidden: boolean;
    showCrossIcon?: boolean;
}

const Modal: React.FC<Props> = ({ children, showCrossIcon = true, title, handelDrawerClose, forceHidden }) => {
    useEffect(() => {
        if (forceHidden) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [forceHidden]);

    return createPortal(
        <div className={`${forceHidden ? "" : "hidden"} relative`}>
            <div
                className="fixed bottom-0 left-0 right-0 top-0 z-20 w-full bg-white/90"
                onClick={() => handelDrawerClose()}
            />
            <div
                className={`h-min-[200px] w-full fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 right-0 z-20 max-w-[1377px] max-h-screen overflow-y-auto rounded-2xl bg-white shadow-side-modal-shadow py-6 px-8`}
            >
                {(!!title || !!showCrossIcon) && (
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-txt-primary">{title ? title : ""}</h1>
                        {showCrossIcon && (
                            <span
                                onClick={() => {
                                    handelDrawerClose();
                                }}
                                aria-hidden
                                id="close-drawer"
                            >
                                <span className="cursor-pointer">
                                    <CrossIcon />
                                </span>
                            </span>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
