/* eslint-disable max-len */
export interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = (props: LogoProps): JSX.Element => {
  const {width, height} = props;

  return (
    <svg
      width={width || 742}
      height={height || 124}
      viewBox='0 0 742 124'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.732227 11.46V7.56H24.6522L62.0922 87.12L57.8022 97H40.9022L0.732227 11.46ZM74.1822 59.43H73.6622L64.9522 80.49L53.7722 56.57L74.1822 7.56H98.8822V97H74.1822V59.43ZM0.732227 24.33L24.6522 75.29V97H0.732227V24.33ZM148.642 55.92C148.642 53.6667 148.555 52.0633 148.382 51.11C148.208 50.1567 147.688 49.4633 146.822 49.03C146.042 48.5967 144.568 48.2933 142.402 48.12C141.102 48.0333 138.285 47.99 133.952 47.99C129.792 47.99 125.935 48.1633 122.382 48.51L115.492 48.9V32C123.638 30.44 132.435 29.66 141.882 29.66C149.162 29.66 154.838 30.18 158.912 31.22C163.072 32.26 166.192 33.9067 168.272 36.16C170.092 38.24 171.262 40.8833 171.782 44.09C172.388 47.2967 172.692 51.76 172.692 57.48V97H148.642V55.92ZM129.402 97.91C123.422 97.91 119.002 96.2633 116.142 92.97C113.282 89.59 111.852 84.52 111.852 77.76C111.852 73.6 112.155 70.2633 112.762 67.75C113.368 65.15 114.408 63.1133 115.882 61.64C117.355 60.08 119.392 58.9967 121.992 58.39C124.592 57.6967 128.015 57.35 132.262 57.35L143.182 57.61V69.18H141.882C139.888 69.18 138.588 69.2233 137.982 69.31C136.248 69.3967 135.338 70.22 135.252 71.78C135.165 72.3 135.122 73.3833 135.122 75.03C135.122 76.33 135.165 77.3267 135.252 78.02C135.425 78.7133 135.685 79.2767 136.032 79.71C136.465 80.3167 137.115 80.6633 137.982 80.75C139.195 80.9233 140.495 81.01 141.882 81.01H143.182V94.27C141.275 95.7433 139.238 96.6967 137.072 97.13C134.992 97.65 132.435 97.91 129.402 97.91ZM224.772 65.67C224.772 61.0767 224.729 58.0433 224.642 56.57C224.469 54.1433 224.252 52.54 223.992 51.76C223.645 50.8933 223.039 50.3733 222.172 50.2C221.305 49.94 219.919 49.81 218.012 49.81H216.712V33.56C220.092 31.0467 224.512 29.79 229.972 29.79C237.772 29.79 243.015 32.1733 245.702 36.94C246.915 39.02 247.739 41.5767 248.172 44.61C248.605 47.5567 248.822 51.1967 248.822 55.53V97H224.772V65.67ZM187.202 30.7H211.252V97H187.202V30.7ZM281.178 96.61C277.711 96.61 274.764 96.0467 272.338 94.92C269.911 93.7067 267.918 91.8 266.358 89.2C263.238 84.1733 261.678 75.42 261.678 62.94C261.678 50.3733 263.238 41.6633 266.358 36.81C267.918 34.3833 269.911 32.6067 272.338 31.48C274.764 30.3533 277.711 29.79 281.178 29.79C284.124 29.79 286.638 30.05 288.718 30.57C290.798 31.09 292.704 32.0433 294.438 33.43V49.81H293.008C291.101 49.81 289.714 49.94 288.848 50.2C288.068 50.3733 287.461 50.8067 287.028 51.5C286.594 52.4533 286.334 53.7967 286.248 55.53C286.161 56.7433 286.118 59.3 286.118 63.2C286.118 67.1 286.161 69.6567 286.248 70.87C286.334 72.69 286.594 74.0333 287.028 74.9C287.461 75.68 288.154 76.1567 289.108 76.33C290.321 76.5033 291.621 76.59 293.008 76.59H294.438V93.1C292.704 94.4867 290.841 95.44 288.848 95.96C286.854 96.3933 284.298 96.61 281.178 96.61ZM289.888 123.78C285.554 123.78 280.354 123.52 274.288 123L266.488 122.22V105.45H283.908C287.028 105.45 290.061 105.363 293.008 105.19C295.174 105.017 296.734 104.583 297.688 103.89C298.728 103.283 299.378 102.2 299.638 100.64C299.811 98.56 299.898 96.35 299.898 94.01V30.7H323.948V89.72C323.948 96.48 323.644 101.767 323.038 105.58C322.431 109.48 321.131 112.73 319.138 115.33C316.884 118.19 313.418 120.313 308.738 121.7C304.144 123.087 297.861 123.78 289.888 123.78ZM372.714 55.92C372.714 53.6667 372.627 52.0633 372.454 51.11C372.281 50.1567 371.761 49.4633 370.894 49.03C370.114 48.5967 368.641 48.2933 366.474 48.12C365.174 48.0333 362.357 47.99 358.024 47.99C353.864 47.99 350.007 48.1633 346.454 48.51L339.564 48.9V32C347.711 30.44 356.507 29.66 365.954 29.66C373.234 29.66 378.911 30.18 382.984 31.22C387.144 32.26 390.264 33.9067 392.344 36.16C394.164 38.24 395.334 40.8833 395.854 44.09C396.461 47.2967 396.764 51.76 396.764 57.48V97H372.714V55.92ZM353.474 97.91C347.494 97.91 343.074 96.2633 340.214 92.97C337.354 89.59 335.924 84.52 335.924 77.76C335.924 73.6 336.227 70.2633 336.834 67.75C337.441 65.15 338.481 63.1133 339.954 61.64C341.427 60.08 343.464 58.9967 346.064 58.39C348.664 57.6967 352.087 57.35 356.334 57.35L367.254 57.61V69.18H365.954C363.961 69.18 362.661 69.2233 362.054 69.31C360.321 69.3967 359.411 70.22 359.324 71.78C359.237 72.3 359.194 73.3833 359.194 75.03C359.194 76.33 359.237 77.3267 359.324 78.02C359.497 78.7133 359.757 79.2767 360.104 79.71C360.537 80.3167 361.187 80.6633 362.054 80.75C363.267 80.9233 364.567 81.01 365.954 81.01H367.254V94.27C365.347 95.7433 363.311 96.6967 361.144 97.13C359.064 97.65 356.507 97.91 353.474 97.91ZM463.634 93.23C462.507 89.7633 461.51 86.3833 460.644 83.09L456.484 68.79C455.097 64.11 454.014 60.6 453.234 58.26C452.54 55.66 451.977 53.71 451.544 52.41L438.284 7.56H464.804L489.114 97H464.804L463.634 93.23ZM484.044 57.35L497.174 7.56H523.174L509.914 52.41L505.104 68.79C503.544 73.8167 502.114 78.5833 500.814 83.09C499.947 86.3833 498.95 89.7633 497.824 93.23L496.654 97H494.834L484.044 57.35ZM531.245 0.409996H555.295V19.13H531.245V0.409996ZM531.245 30.7H555.295V97H531.245V30.7ZM597.523 57.35H606.623C606.623 52.4967 606.146 49.3767 605.193 47.99C604.673 47.21 603.979 46.7333 603.113 46.56C602.246 46.3 600.989 46.17 599.343 46.17H597.523V29.66H599.343C606.796 29.66 612.516 30.2667 616.503 31.48C620.576 32.6933 623.566 34.6867 625.473 37.46C627.206 39.8867 628.246 43.0067 628.593 46.82C629.026 50.6333 629.243 56.3533 629.243 63.98V69.18H597.523V57.35ZM601.943 98.04C593.969 98.04 587.686 97.39 583.093 96.09C578.586 94.7033 575.206 92.5367 572.953 89.59C570.959 86.99 569.659 83.7833 569.053 79.97C568.446 76.07 568.143 70.74 568.143 63.98C568.143 57.74 568.359 52.8 568.793 49.16C569.226 45.4333 570.136 42.27 571.523 39.67C573.083 36.81 575.466 34.6 578.673 33.04C581.966 31.3933 586.429 30.3533 592.063 29.92V69.18C592.063 72.1267 592.193 74.25 592.453 75.55C592.713 76.7633 593.319 77.6733 594.273 78.28C595.313 78.9733 596.916 79.3633 599.083 79.45C601.856 79.6233 604.803 79.71 607.923 79.71C613.469 79.71 617.499 79.58 620.013 79.32L626.643 78.8V95.57C623.176 96.61 618.409 97.3033 612.343 97.65C609.396 97.91 605.929 98.04 601.943 98.04ZM635.596 30.7H659.126L674.856 97H653.406L635.596 30.7ZM671.606 59.95L679.666 30.7H699.036L718.276 97H697.086L689.416 67.49H688.116L681.876 97H680.446L671.606 59.95ZM713.336 60.21L718.666 30.7H741.936L725.426 97H723.996L713.336 60.21Z'
        fill='url(#paint0_linear)'
      />
      <defs>
        <linearGradient id='paint0_linear' x1='-26' y1='49' x2='762' y2='49' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2F80ED' />
          <stop offset='1' stopColor='#BB6BD9' />
        </linearGradient>
      </defs>
    </svg>
  );
};
