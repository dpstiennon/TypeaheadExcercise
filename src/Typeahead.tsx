import React, { FC, useState, useMemo } from "react";

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
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <div className="">
        {showList &&
          list.filter(listFilter).map((item) => (
            <div
              onClick={() => {
                handleListitemClick(item);
              }}
            >
              <strong>{getHighlightedSubstring(item)}</strong>
              <span>{getEndSubstring(item)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Typeahead;
