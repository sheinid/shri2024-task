import { useState, useEffect, useRef, memo } from "react";
import { TABS, TABS_KEYS } from "../shared/static";
import { Event } from "./event";
import { useMemo } from "react";

export const DevicesList = memo(({ activeTab }) => {
  const ref = useRef();
  const scroller = useRef();
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
    if (scroller.current) {
      scroller.current.scrollTo({
        left: scroller.current.scrollLeft + 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="section__panel-wrapper" ref={ref}>
      <div
        role="tabpanel"
        className={"section__panel"}
        aria-hidden={"false"}
        id={`panel_${TABS_KEYS[0]}`}
        aria-labelledby={`tab_${TABS_KEYS[0]}`}
        ref={scroller}
      >
        <ul className="section__panel-list">
          {useMemo(
            () =>
              TABS[activeTab].items.map((item, index) => (
                <Event key={index} {...item} />
              )),
            [activeTab]
          )}
        </ul>
      </div>

      {hasRightScroll && (
        <div className="section__arrow" onClick={onArrowCLick}></div>
      )}
    </div>
  );
});

DevicesList.displayName = "DevicesList";
