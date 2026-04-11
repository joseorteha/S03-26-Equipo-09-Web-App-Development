import { useState } from 'react';
import { ContactoTable } from '../components/ContactoTable';

export const SegmentacionPage = () => {
  const [selectedSegmento, setSelectedSegmento] = useState<'todos' | 'LEAD_ACTIVO' | 'EN_SEGUIMIENTO' | 'CALIFICADO' | 'CLIENTE'>('LEAD_ACTIVO');

  const segmentos = [
    {
      id: 'LEAD_ACTIVO',
      nombre: 'Leads Activos',
      descripcion: 'Contactos nuevos que han mostrado interés',
      color: 'primary',
      icon: 'star'
    },
    {
      id: 'EN_SEGUIMIENTO',
      nombre: 'En Seguimiento',
      descripcion: 'Leads que están siendo cultivados',
      color: 'warning',
      icon: 'trending_up'
    },
    {
      id: 'CALIFICADO',
      nombre: 'Calificados',
      descripcion: 'Leads listos para convertirse en clientes',
      color: 'secondary',
      icon: 'done'
    },
    {
      id: 'CLIENTE',
      nombre: 'Clientes',
      descripcion: 'Contactos que ya son clientes',
      color: 'success',
      icon: 'verified'
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Segmentación de Contactos
        </h1>
        <p className="text-on-surface-variant text-base mt-1">
          Visualiza contactos organizados por estado en el funnel de ventas
        </p>
      </header>

      {/* Segmentos disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segmentos.map((seg) => (
          <button
            key={seg.id}
            onClick={() => setSelectedSegmento(seg.id as any)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedSegmento === seg.id
                ? `border-${seg.color} bg-${seg.color}/10`
                : 'border-outline/30 hover:border-outline/60'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-2xl text-primary">
                {seg.icon}
              </span>
              <div className="text-left">
                <h3 className="font-bold text-primary text-sm">{seg.nombre}</h3>
                <p className="text-xs text-on-surface-variant">{seg.descripcion}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tabla de contactos filtrada */}
      <ContactoTable filtroEstado={selectedSegmento} />
    </div>
  );
};
