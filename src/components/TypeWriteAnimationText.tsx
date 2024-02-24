import { useTypewriter } from "react-simple-typewriter";

interface TypeWriteAnimationTextProps {
  handleTypeDone?: () => void;
}

const TypeWriteAnimationText = ({
  handleTypeDone,
}: TypeWriteAnimationTextProps) => {
  const [repliedMessage] = useTypewriter({
    words: ["I can’t sleep at night..."],
    loop: 1,
    typeSpeed: 150,
    // onLoopDone: () => handleTypeDone!(), // stop re-loop of text animation
  });

  return <>{repliedMessage}</>;
};

export default TypeWriteAnimationText;
