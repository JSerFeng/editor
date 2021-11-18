import { TextField } from "@material-ui/core";
import { FC, useState } from "react";

const NumberText: FC<{
  value: number | string,
  onChange(val: number): void,
  placeholder?: string,
}> = ({ value, onChange, placeholder }) => {
  const [val, setVal] = useState(value)
  return (
    <TextField
      value={ val }
      placeholder={ placeholder || "" }
      onChange={
        e => {
          let num = Number(e.target.value)
					if (Number.isNaN(num)) {
						num = e.target.value === "-" ? -1 : 0
					}
          setVal(num)
          onChange(num)
        }
      }
    />
  )
}

export default NumberText
