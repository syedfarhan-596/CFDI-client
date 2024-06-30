// BackgroundSVG.jsx
import React from "react";
import styles from "./landing.module.css";

export const BackgroundSVG = () => (
  <svg
    className={styles.backgroundSVG}
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,224L60,208C120,192,240,160,360,144C480,128,600,128,720,144C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
    ></path>
  </svg>
);

export const ExpertMentorsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="50"
    height="50"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 1.1.36 2.11.96 2.94l1.61-1.61c-.2-.55-.32-1.15-.32-1.78 0-2.76 2.24-5 5-5 1.49 0 2.84.65 3.76 1.69l1.67-1.67C15.04 4.12 13.61 4 12 4z" />
  </svg>
);

export const CertificationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="50"
    height="50"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-7h4v4h-4v-4z" />
  </svg>
);

export const HandsOnExperienceIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="50"
    height="50"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M11 11h2v2h-2v-2zm0-4h2v2h-2V7zm0 8h2v2h-2v-2zm-4-8h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm8-8h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
  </svg>
);
