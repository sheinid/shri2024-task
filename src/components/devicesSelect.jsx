import { memo } from "react";
import { TABS, TABS_KEYS } from "../shared/static";

export const DevicesSelect = memo(({ onSelectInput }) => {
  const options = [...TABS_KEYS].map((key) => (
    <option key={key} value={key}>
      {TABS[key].title}
    </option>
  ));

  return (
    <select
      className="section__select"
      defaultValue="all"
      onInput={onSelectInput}
    >
      {options}
    </select>
  );
});

DevicesSelect.displayName = "DevicesSelect";
