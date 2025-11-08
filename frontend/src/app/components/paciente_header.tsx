"use client";

import React from 'react';
import styles from '../styles/patient_header.module.css';
import Icons from './assets/icons';

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
          <img src={Icons.mdi_arrow_back} alt="Voltar" width="54" height="54" />
        </button>
      )}

      <div className={styles.headerSection}>
        <div className={styles.patientInfo}>
          <div className={styles.avatar}>
            <img src={Icons.mdi_user} alt="Icon" />
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