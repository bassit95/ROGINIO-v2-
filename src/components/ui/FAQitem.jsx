import { Minus, Plus } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  const [height, setHeight] = useState('0px');

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-lg sm:text-xl cursor-pointer"
        onClick={onClick}
      >
        {question}
        <span className="ml-2">{isOpen ? <Minus /> : <Plus />}</span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 text-paragraph"
      >
        <p className="py-2">{answer}</p>
      </div>
    </div>
  )
}

export default FAQItem