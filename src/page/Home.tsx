/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnaylsisCard from "../component/section/AnalysisCard";
import ProgressBar from "../component/ProgressBar";
import { useSelector } from "../store";
function Home() {
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const [imgStatus, setImgStatus] = useState(false);
  const [token, setToken] = useState<number>(tokenState);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(1000);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const bodyRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<string>("+1");
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = `${score}`;
    // newDiv.style.backgroundImage = "url('image/dollar.png')";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "30px";
    newDiv.style.paddingLeft = "30px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.width = "40px";
    newDiv.style.height = "140px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = score == "+1" ? "#58E1E2" : "red";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainedEnergy((pre) =>
        pre == 999 ? 1000 : pre < 1000 ? pre + 1 : 1000
      );
    }, 21600);
    return () => clearInterval(interval);
  }, []);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (remainedEnergy > 0) {
      if (remainedEnergy < 500) {
        setScore("+2");
        setToken(token + 2);
      } else {
        setScore("+1");
        setToken(token + 1);
      }
      setRemainedEnergy(remainedEnergy - 1);
      handleClick(event);
    }
  };

  const handleMouseDown = () => {
    setImgStatus(true);
  };
  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  console.log("imgStatus", imgStatus);

  return (
    <div className="pb-24 px-4">
      <ToastContainer />
      <AnaylsisCard />
      <div
        id="mainWindow"
        className="relative mt-2 flex flex-col items-center justify-center w-full"
      >
        <div className="flex flex-col justify-center items-center mb-7 gap-2 w-full">
          <div className="flex flex-row justify-center items-center mt-4">
            <img
              src="/image/dollar.png"
              alt=""
              className="w-14 h-14 mt-1 max-sm:w-10 max-sm:h-10"
            />
            <h1 className="text-5xl text-white ml-3 font-bold max-sm:text-3xl">
              {formatNumberWithCommas(token)}
            </h1>
          </div>
          <div className="w-full">
            <ProgressBar value={remainedEnergy / 10} />
          </div>
        </div>
        <div className="w-full sm:p-4 md:-6 lg:p-8">
          <div
            className={`relative bg-[url('/image/mikeToken.png')] rounded-full bg-cover w-full aspect-square z-10 ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? " border-[5px]" : "border-0"}`}
            ref={bodyRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onClick={handleTap}
          />
        </div>
        <div className="flex flex-row justify-between w-full px-10 max-sm:px-4 mt-4">
          <div className="flex justify-between w-full">
            <h3 className="text-2xl mb-2 text-white flex flex-row">
              <span className="flex text-3xl items-center ">
                <img
                  src="/image/icon/lightning.svg"
                  alt="lightning"
                  className="w-6 h-6 inline mt-1"
                />
              </span>
              <span className="text-2xl text-white max-sm:text-lg">
                {remainedEnergy}/1000
              </span>
            </h3>
            <div className="flex justify-center items-center">
              <Link to="/boost" className="flex">
                <img
                  src="/image/rocket.png"
                  alt="rocket"
                  className="w-8 h-8 inline max-sm:w-6 max-sm:h-6"
                />
                <h3 className="text-2xl max-sm:text-lg text-white">Boost</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
