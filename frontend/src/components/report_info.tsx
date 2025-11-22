"use client";

import React from 'react';
import './report_info.css';

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
    <div className="reportInfoContainer">
      <div className="infoItem">
        <span className="label">Data:</span>
        <span className="value">{date}</span>
      </div>
      <div className="infoItem">
        <span className="label">Idade:</span>
        <span className="value">{age}</span>
      </div>
      <div className="infoItem">
        <span className="label">Responsável:</span>
        <span className="value">{responsible}</span>
      </div>
      <div className="infoItem">
        <span className="label">Profissional responsável:</span>
        <span className="value">{professionalResponsible}</span>
      </div>
    </div>
  );
}