"use client";

import React, { useState } from 'react';
import TopBar from "@/app/components/TopBar";
import './styles.css';
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Tipos e dados de exemplo (poderá ser trocado por dados reais do backend)
interface ChartDataPoint {
  date: string;
  displayDate: string;
  incidentes: number;
  autocorrecao: number;
}

const MOCK_DATA: ChartDataPoint[] = [
  { date: '2025-01-01', displayDate: '01/01', incidentes: 2, autocorrecao: 1 },
  { date: '2025-01-02', displayDate: '02/01', incidentes: 1, autocorrecao: 3 },
  { date: '2025-01-03', displayDate: '03/01', incidentes: 4, autocorrecao: 2 },
  // ...adicione/remova pontos conforme necessário...
];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState('Filtrar');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = ['INCIDENTES', 'OCORRÊNCIAS', 'OBSERVAÇÕES', 'EVOLUÇÃO'];

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />
      <div className="relatorio-content">
        <button className="back-button">
          <img src={Icons.mdi_arrow_back} alt="Voltar" width="54" height="54" />
        </button>

        <div className="header-section">
          <div className="type-selector">
            <div className="dropdown">
              <button
                className="type-button active"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedType}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                >
                  <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={`dropdown-item ${selectedType === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedType(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Apenas o gráfico, 70% da largura e maior altura */}
          <div className="graph-container">
            <div className="w-[70%] mx-auto flex justify-center bg-white rounded-lg p-4 h-[520px]">
              {MOCK_DATA.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={MOCK_DATA}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
                    <XAxis
                      dataKey="displayDate"
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    />
                    <Legend verticalAlign="top" height={30} />
                    <Line
                      type="monotone"
                      dataKey="incidentes"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Incidentes"
                    />
                    <Line
                      type="monotone"
                      dataKey="autocorrecao"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Autocorreção"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Sem dados suficientes para gerar o gráfico.</p>
                </div>
              )}
            </div>
          </div>
          {/* ...existing code... (se houver algo abaixo de header-section) */}
        </div>
      </div>
    </div>
  );
}
