import React from "react";
import "./CheckBox.styles.scss";

interface IProps {
    onChange: () => void;
}

const CheckBox: React.FC<IProps>= ({ onChange }) => (
    <input type="checkbox" onChange={onChange}/>
)

export default CheckBox;
