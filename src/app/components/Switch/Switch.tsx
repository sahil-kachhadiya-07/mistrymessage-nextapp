import React, { useState } from "react";
interface ToggleProps {
    label?: string;
    checkedColor?: string;
    unCheckedColor?: string;
    onChange?: (status: boolean) => void;
    checked?: boolean;
}
const Switch: React.FC<ToggleProps> = (props) => {
    const { label, onChange, checked = false} = props;
    const [checkedValue, setChecked] = useState(checked);
    return (
        <>
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checkedValue}
                    className="sr-only peer"
                    onChange={(e) => {
                        setChecked((prev) => !prev);
                        e.stopPropagation();
                        if (onChange) {
                            onChange(!checkedValue);
                        }
                    }}
                    
                />
                <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none  rounded-full peer dark:bg-white-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:!bg-blue-1 p-1" />
                {label && <span className="ms-3 text-sm font-medium">{label}</span>}
            </label>
        </>
    );
};

export default Switch;