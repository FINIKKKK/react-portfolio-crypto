import classNames from "classnames";
import React from "react";

import ss from "./ButtonUp.module.scss";

type ButtonUpProps = {};

export const ButtonUp: React.FC<ButtonUpProps> = () => {
  const [visible, setVisible] = React.useState(false);
  const [upper, setUpper] = React.useState(false);

  const toggleVisible = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;

    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
      if (scrollHeight - (scrollY + clientHeight) < 50) {
        setUpper(true);
      } else {
        setUpper(false);
      }
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={classNames(ss.btn, {
        [ss.active]: visible,
        [ss.upper]: upper,
      })}
      onClick={scrollToTop}
    >
      <svg
        width="33"
        height="20"
        viewBox="0 0 33 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.973911 15.7379C0.564232 16.1677 0.564232 16.8648 0.973911 17.295L2.45803 18.8517C2.86771 19.2819 3.53244 19.2819 3.94215 18.8517L16.4078 5.77326L28.8726 18.8517C29.2823 19.2819 29.947 19.2819 30.3568 18.8517L31.8409 17.295C32.2506 16.8648 32.2506 16.1678 31.8409 15.7379L17.149 0.324842C16.7393 -0.105343 16.0749 -0.105343 15.6649 0.324842L0.973911 15.7379Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
