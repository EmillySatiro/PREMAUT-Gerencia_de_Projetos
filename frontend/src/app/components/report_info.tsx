"use client";

import React from 'react';
import styles from '../styles/report_info.module.css';

interface ReportInfoProps {
  date: string;
  age: string;
  responsible: string;
  professionalResponsible: string;
}

export default function ReportInfo({ 
  date, 
  age, 
  responsible, 
  professionalResponsible 
}: ReportInfoProps) {
  return (
    <div className={styles.reportInfoContainer}>
      <div className={styles.infoItem}>
        <span className={styles.label}>Data:</span>
        <span className={styles.value}>{date}</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.label}>Idade:</span>
        <span className={styles.value}>{age}</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.label}>Responsável:</span>
        <span className={styles.value}>{responsible}</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.label}>Profissional responsável:</span>
        <span className={styles.value}>{professionalResponsible}</span>
      </div>
    </div>
  );
}