
const CharitySelector = ({ enabled, onSelect, selected }) => {
  if (!enabled) {
    return null;  // Do not render if not enabled
  }

  return (
    <div className="charity-selector">
      <label htmlFor="charity-dropdown" className="charity-label">
        Select a charity
      </label>
      <select
        id="charity-dropdown"
        className="charity-dropdown"
        value={selected}
        onChange={e => onSelect(e.target.value)}
        required={enabled}  // Make selection required if the charity option is enabled
      >
        <option value="">--Choose--</option>
        <option value="charity1">St. Jude Children's Research Hospital</option>
        <option value="charity2">Salvation Army</option>
        <option value="charity3">Developers That Need Jobs Foundation</option>
      </select>
    </div>
  );
};

export default CharitySelector;
