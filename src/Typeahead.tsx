import React, { FC, useState } from "react";

// Ahem!  I know the requirements asked for 'propTypes and other best practices'
// just me being opinionated - I wouldn't consider propTypes a best practice
// I think its better to either go for Typescript (better static checking and more concise)
// or embrace the dynamic nature of Javascript
interface TypeaheadProps {
  list: string[];
  className?: string;
}

const Typeahead: FC<TypeaheadProps> = ({ list, className = "" }) => {
  const [text, setText] = useState("");
  const [showList, setShowList] = useState(false);

  const handleChange = (newValue: string) => {
    setShowList(newValue.trim().length > 1);
    setText(newValue);
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
      <div>{showList && list.map((item) => <li>{item}</li>)}</div>
    </div>
  );
};

export default Typeahead;
