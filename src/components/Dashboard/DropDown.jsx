import React, { useState } from 'react'

export default function DropDown(props) {

    const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(!open)}>
        {props.icon}

        {open && props.children}
    </div>
  );
}
