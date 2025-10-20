"use client";

import React, { useState } from 'react';
import styles from '../styles/type_dropdown.module.css';

interface TypeDropdownProps {
  options: string[];
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function TypeDropdown({ options, selectedType, onSelectType }: TypeDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button 
        className={`${styles.typeButton} ${styles.active}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedType}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          style={{ 
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s' 
          }}
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option}
              className={`${styles.dropdownItem} ${selectedType === option ? styles.selected : ''}`}
              onClick={() => {
                onSelectType(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}