import { useState } from "react";
import { TABS, TABS_KEYS } from "../shared/static";
import { DevicesSelect } from "./devicesSelect";
import { DevicesList } from "./devicesList";

export const Devices = () => {
  const [activeTab, setActiveTab] = useState(
    () => new URLSearchParams(location.search).get("tab") || "all"
  );

  const onSelectInput = (event) => {
    setActiveTab(event.target.value);
  };

  return (
    <section className="section main__devices">
      <div className="section__title">
        <h2 className="section__title-header">Избранные устройства</h2>

        <DevicesSelect onSelectInput={onSelectInput} />

        <ul role="tablist" className="section__tabs">
          {TABS_KEYS.map((key) => (
            <li
              key={key}
              role="tab"
              aria-selected={key === activeTab ? "true" : "false"}
              tabIndex={key === activeTab ? "0" : undefined}
              className={
                "section__tab" +
                (key === activeTab ? " section__tab_active" : "")
              }
              id={`tab_${key}`}
              aria-controls={`panel_${key}`}
              onClick={() => setActiveTab(key)}
            >
              {TABS[key].title}
            </li>
          ))}
        </ul>
      </div>

      <DevicesList activeTab={activeTab} />
    </section>
  );
};
