import React from 'react';
import './styles.css';

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
    return (
        <input className = "input" type="text" value={value} onChange={onChange} placeholder={placeholder}/>
    );
};

export default Input;