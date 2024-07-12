import { useState, useEffect, useRef, memo } from "react";
import { TABS, TABS_KEYS } from "../shared/static";
import { Event } from "./event";

export const DevicesList = memo(({ activeTab }) => {
  const ref = useRef();
  const [hasRightScroll, setHasRightScroll] = useState(false);

  useEffect(() => {
    const widths = {
      all: 102400,
      kitchen: 478,
      hall: 400,
      lights: 813,
      cameras: 200,
    };
    if (ref.current) {
      const handleResize = () => {
        setHasRightScroll(widths[activeTab] > ref.current.offsetWidth);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [activeTab, hasRightScroll]);

  const onArrowCLick = () => {
    const scroller = ref.current.querySelector(
      ".section__panel:not(.section__panel_hidden)"
    );
    if (scroller) {
      scroller.scrollTo({
        left: scroller.scrollLeft + 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="section__panel-wrapper" ref={ref}>
      {TABS_KEYS.map((key) => (
        <div
          key={key}
          role="tabpanel"
          className={
            "section__panel" +
            (key === activeTab ? "" : " section__panel_hidden")
          }
          aria-hidden={key === activeTab ? "false" : "true"}
          id={`panel_${key}`}
          aria-labelledby={`tab_${key}`}
        >
          <ul className="section__panel-list">
            {TABS[key].items.map((item, index) => (
              <Event key={index} {...item} />
            ))}
          </ul>
        </div>
      ))}
      {hasRightScroll && (
        <div className="section__arrow" onClick={onArrowCLick}></div>
      )}
    </div>
  );
});

DevicesList.displayName = "DevicesList";
