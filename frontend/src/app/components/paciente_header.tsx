"use client";

import React from 'react';
import styles from '../styles/patient_header.module.css';

interface PatientHeaderProps {
  patientName: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  children?: React.ReactNode;
}

export default function PatientHeader({ 
  patientName, 
  showBackButton = true, 
  onBackClick,
  children 
}: PatientHeaderProps) {
  return (
    <div className={styles.headerContainer}>
      {/* Deps algum infeliz tira esse botão aqui, ele não faz parte desse elemento */}
      {showBackButton && (
        <button className={styles.backButton} onClick={onBackClick}>
          <img src="/assets/images/mdi_arrow-up.svg" alt="Voltar" width="54" height="54" />
        </button>
      )}

      <div className={styles.headerSection}>
        <div className={styles.patientInfo}>
          <div className={styles.avatar}>
            <img src="/assets/images/mdi_user.svg" alt="Icon" />
          </div>
          <div className={styles.patientNameSection}>
            <h2>{patientName}</h2>
            <span className={styles.badge}>Paciente</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}