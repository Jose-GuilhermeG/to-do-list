import type React from "react";

interface hasChildren extends React.ComponentProps<"div"> {
    children : React.ReactElement | React.ReactElement[],
}

export function BaseModal({children , className = "" , ...props} : hasChildren){
    return (
        <div {...props} className={className + " " + "fixed w-full h-full top-0 left-0 bg-black/70 indent-0 flex items-center z-100"}>
            {children}
        </div>
    )
}

export function Modal({children , className = "" , ...props} : hasChildren){
    return (
        <div {...props} className={className + " " + "bg-white p-5 rounded-2xl w-sm min-h-[10vh] m-auto"}>
            {children}
        </div>
    )
}


export function ModalHeader({children , className = "" , ...props} : hasChildren){
    return (
        <header {...props} className={className + " " + "w-full min-h-[10%] py-2"}>
            {children}
        </header>
    )
}

export function ModalMedia({children , className = "" , ...props} : hasChildren){
    return (
        <div {...props} className={className + " " + "w-fit m-auto my-5 p-2 bg-black text-white rounded-2xl "}>
            {children}
        </div>
    )
}

export function ModalTitle({children} : {children : React.ReactElement[] | string}){
    return (
        <h1 className="text-2xl font-medium text-center">
            {children}
        </h1>
    )
}

export function ModalContent({children , className = "" , ...props} : hasChildren){
    return (
         <div {...props} className={className + " " + "my-5"}>
            {children}
         </div>
    )
}