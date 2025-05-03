import { useEffect, useState } from "react";

export default function TypingHeader () {
  const texts = ["Django & NextJS Fullstack ","MochAi"];
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length); // loop
        }
      }
    }, isDeleting ? 50 : 100); 

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting]);

return (
    <h1 className="text-5xl text-[#5e42ae] font-bold w-full text-center mt-10 whitespace-nowrap">
        {displayText}
    </h1>
);
};

