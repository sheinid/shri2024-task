import { memo } from "react";
import { TABS, TABS_KEYS } from "../shared/static";

export const DevicesSelect = memo(({ onSelectInput }) => {
  return (
    <select
      className="section__select"
      defaultValue="all"
      onInput={onSelectInput}
    >
      {TABS_KEYS.map((key) => (
        <option key={key} value={key}>
          {TABS[key].title}
        </option>
      ))}
    </select>
  );
});

DevicesSelect.displayName = "DevicesSelect";
