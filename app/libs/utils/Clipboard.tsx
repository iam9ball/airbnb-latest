'use client'

import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa"; 

const Clipboard = (params: string) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000)
  }
  

  return (
    <div className="flex items-center gap-2">
    <CopyToClipboard text={params}>
     
        <FaClipboard onClick={handleCopy} />
      
    </CopyToClipboard>
    {isCopied && <span className="text-green-500">Copied!</span>}
    </div>
  );
};

export default Clipboard;