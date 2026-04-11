import { useState } from 'react';
import { ContactoTable } from '../components/ContactoTable';
import { ConversacionesPanel } from '../components/ConversacionesPanel';
import { SeguimientosPanel } from '../components/SeguimientosPanel';
import { ExportPanel } from '../components/ExportPanel';

export const ContactosPage = () => {
  const [activeTab, setActiveTab] = useState<'contactos' | 'conversaciones' | 'seguimientos' | 'exportar'>('contactos');

  return (
    <div className="space-y-6 p-4 md:p-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Centro de Gestión de Contactos
        </h1>
        <p className="text-on-surface-variant text-base mt-1">
          Administra contactos, conversaciones, seguimientos y genera reportes
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-outline pb-4">
        <button
          onClick={() => setActiveTab('contactos')}
          className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'contactos'
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Contactos
        </button>
        <button
          onClick={() => setActiveTab('conversaciones')}
          className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'conversaciones'
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Conversaciones
        </button>
        <button
          onClick={() => setActiveTab('seguimientos')}
          className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'seguimientos'
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Seguimientos
        </button>
        <button
          onClick={() => setActiveTab('exportar')}
          className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'exportar'
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Exportar
        </button>
      </div>

      {/* Contenido por tab */}
      <div>
        {activeTab === 'contactos' && <ContactoTable />}
        {activeTab === 'conversaciones' && <ConversacionesPanel />}
        {activeTab === 'seguimientos' && <SeguimientosPanel />}
        {activeTab === 'exportar' && <ExportPanel />}
      </div>
    </div>
  );
};
