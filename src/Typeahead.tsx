import React, { FC, useState, useMemo, ReactKeyboardEvent } from "react";

// Ahem!  I know the requirements asked for 'propTypes and other best practices'
// just me being opinionated - I wouldn't consider propTypes a best practice
// I think its better to either go for Typescript (better static checking and more concise)
// or embrace the dynamic nature of Javascript
// I'm opting for the Typescript answer
interface TypeaheadProps {
  list: string[];
  className?: string;
}

const Typeahead: FC<TypeaheadProps> = ({ list, className = "" }) => {
  const [text, setText] = useState("");
  const [showList, setShowList] = useState(false);

  const handleChange = (newValue: string) => {
    setShowList(newValue.trim().length > 0);
    setText(newValue);
  };

  const handleListitemClick = (item: string) => {
    setShowList(false);
    setText(item);
  };

  const handleInputKeypress = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Tab") {
    }
  };

  const filterRegExp = useMemo(() => {
    return new RegExp(`^${text.trim()}`, "i");
  }, [text]);

  const listFilter = (item: string) => {
    return item.match(filterRegExp);
  };

  const getHighlightedSubstring = (item: string) => {
    return item.substring(0, text.trim().length);
  };

  const getEndSubstring = (item: string) => {
    return item.substring(text.trim().length);
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={text}
        tabIndex={0}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <div className="highlight">
        {showList &&
          list.filter(listFilter).map((item, idx) => (
            <div className="typeahead-option">
              <button
                key={item}
                className="typeahead-button"
                onClick={() => {
                  handleListitemClick(item);
                }}
              >
                <span className="option-highlight">
                  {getHighlightedSubstring(item)}
                </span>
                <span>{getEndSubstring(item)}</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Typeahead;
