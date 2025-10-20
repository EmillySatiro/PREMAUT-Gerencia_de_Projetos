"use client";

import React, { useEffect, useRef } from 'react';
import styles from '../styles/form_relatorio.module.css';

interface FormSectionProps {
  labelText: string;
  assuntoValue: string;
  onAssuntoChange: (value: string) => void;
  bodyValue: string;
  onBodyChange: (value: string) => void;
  assuntoPlaceholder?: string;
  bodyPlaceholder?: string;
}

export default function FormSection({ 
  labelText,
  assuntoValue, 
  onAssuntoChange,
  bodyValue,
  onBodyChange,
  assuntoPlaceholder = "",
  bodyPlaceholder = ""
}: FormSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '200px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [bodyValue]);

  return (
    <div className={styles.formSection}>
      <div className={styles.formContainer}>
        <div className={styles.labelSection}>
          <span className={styles.labelText}>{labelText}</span>
          <input
            type="text"
            className={styles.assuntoInput}
            value={assuntoValue}
            onChange={(e) => onAssuntoChange(e.target.value)}
            placeholder={assuntoPlaceholder}
          />
        </div>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={bodyValue}
          onChange={(e) => onBodyChange(e.target.value)}
          placeholder={bodyPlaceholder}
        />
      </div>
    </div>
  );
}