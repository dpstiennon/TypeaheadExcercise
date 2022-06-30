import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, { FC, useState, useMemo, KeyboardEvent } from "react";

// Ahem!  I know the requirements asked for 'propTypes and other best practices'
// just me being opinionated - I wouldn't consider propTypes a great practice
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

  const handleEscape = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowList(false);
    }
  };

  //Might be premature optimization.
  //But I know parsing regex is a slightly heavy operation
  //and I'd prefer not to do it for every single item here
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
    <ClickAwayListener onClickAway={() => setShowList(false)}>
      <div className={className} onKeyDown={handleEscape}>
        <div className="typeahead">
          <input
            className="typeahead-text"
            type="text"
            value={text}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
          {showList && list.filter(listFilter).length > 0 && (
            <div className="options-pane">
              {list.filter(listFilter).map((item, idx) => (
                <div className="typeahead-option" key={item}>
                  <button
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
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Typeahead;
