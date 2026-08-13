import { useState, useEffect } from "react";

export const TypewriterText = ({
  strings,
  typeSpeed = 100,
  backSpeed = 80,
  delay = 2500
}: {
  strings: string[],
  typeSpeed?: number,
  backSpeed?: number,
  delay?: number
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const i = loopNum % strings.length;
      const fullText = strings[i];

      if (!isDeleting) {
        // Typing forward
        setText(fullText.substring(0, text.length + 1));

        if (text === fullText) {
          // Finished typing, wait for delay before deleting
          timer = setTimeout(() => setIsDeleting(true), delay);
        } else {
          // Keep typing
          timer = setTimeout(handleTyping, typeSpeed);
        }
      } else {
        // Deleting backward
        setText(fullText.substring(0, text.length - 1));

        if (text === "") {
          // Finished deleting, move to next word and wait slightly
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          timer = setTimeout(handleTyping, 500);
        } else {
          // Keep deleting
          timer = setTimeout(handleTyping, backSpeed);
        }
      }
    };

    // Initial trigger when effect runs
    if (!isDeleting && text === strings[loopNum % strings.length]) {
      // If component re-renders while fully typed, ensure we wait
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && text === "") {
      // If component re-renders while fully deleted
      timer = setTimeout(handleTyping, 500);
    } else {
      timer = setTimeout(handleTyping, isDeleting ? backSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, strings, typeSpeed, backSpeed, delay]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {text}
      <span className="animate-pulse border-r-[3px] border-orange-500 ml-[2px]"></span>
    </span>
  );
};
