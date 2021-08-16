import React from 'react';

const Checkbox = (props, labelName) => {

  return (
    <div>
      <label>
        {labelName}
        <input
          type="checkbox"
        />
      </label>
    </div>
  )
}

export default Checkbox;