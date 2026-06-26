import DropdownButton from "./DropDownButton";

const TopUI = ({
  topUI,
  departments,
  selectedDept,
  setSelectedDept,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!topUI || !topUI.type) return null;

  /* ---------------- DROPDOWN ---------------- */
  if (topUI.type === "dropdown") {
    const options = departments.reduce((acc, dept) => {
      acc[dept.name] = { name: dept.name };
      return acc;
    }, {});

    return (
      <div className="topui-dropdown-wrapper">
        <div className="topui-dropdown-inner">
          <DropdownButton
            options={options}
            selectedKey={selectedDept}
            onChange={setSelectedDept}
            placeholder="Select Department"
          />
        </div>
      </div>
    );
  }

  /* ---------------- CATEGORY ---------------- */
  if (topUI.type === "category") {
    return (
      <section className="topui-category">
        {topUI.title && (
          <h2 className="topui-category-title">{topUI.title}</h2>
        )}

        {topUI.subtitle && (
          <p className="topui-category-subtitle">{topUI.subtitle}</p>
        )}

        <div className="topui-category-list">
          {topUI.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`topui-category-btn ${
                selectedCategory === cat ? "topui-category-btn-active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    );
  }

  /* ---------------- HEADING ---------------- */
  if (topUI.type === "heading") {
    return (
      <div className="topui-heading">
        <h2 className="topui-heading-title">{topUI.title}</h2>

        {topUI.subtitle && (
          <p className="topui-heading-subtitle">{topUI.subtitle}</p>
        )}
      </div>
    );
  }

  return null;
};

export default TopUI;
