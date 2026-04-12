import { useState } from 'react';
import { ContactoTable } from '../components/ContactoTable';
import { ConversacionesPanel } from '../components/ConversacionesPanel';
import { SeguimientosPanel } from '../components/SeguimientosPanel';
import { ExportButton } from '../components/ExportButton';
import { useAuth } from '../hooks/useAuth';

export const ContactosPage = () => {
  const [activeTab, setActiveTab] = useState<'contactos' | 'conversaciones' | 'seguimientos' | 'exportar'>('contactos');
  const { isAdmin } = useAuth();

  // Definir tabs disponibles
  const tabs = [
    { id: 'contactos' as const, label: 'Contactos', icon: 'person', color: 'bg-blue' },
    { id: 'conversaciones' as const, label: 'Conversaciones', icon: 'mail', color: 'bg-amber' },
    { id: 'seguimientos' as const, label: 'Seguimientos', icon: 'trending_up', color: 'bg-green' },
    ...(isAdmin ? [{ id: 'exportar' as const, label: 'Exportar', icon: 'download', color: 'bg-purple' }] : [])
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[#182442]">
          Centro de Gestión de Contactos
        </h1>
        <p className="text-slate-600 text-base mt-1">
          Administra contactos, conversaciones y seguimientos en un solo lugar
        </p>
      </header>

      {/* Tabs como Badges Coloreados */}
      <div className="flex flex-wrap gap-3 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all transform flex items-center gap-2 ${
              activeTab === tab.id
                ? 'scale-105 shadow-lg text-white border-2'
                : 'border-2 hover:scale-105'
            } ${
              tab.id === 'contactos'
                ? activeTab === tab.id
                  ? 'bg-blue-500 border-blue-600'
                  : 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
                : tab.id === 'conversaciones'
                ? activeTab === tab.id
                  ? 'bg-amber-500 border-amber-600'
                  : 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'
                : tab.id === 'seguimientos'
                ? activeTab === tab.id
                  ? 'bg-green-500 border-green-600'
                  : 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                : activeTab === tab.id
                ? 'bg-purple-500 border-purple-600'
                : 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido por tab */}
      <div>
        {activeTab === 'contactos' && <ContactoTable />}
        {activeTab === 'conversaciones' && <ConversacionesPanel />}
        {activeTab === 'seguimientos' && <SeguimientosPanel />}
        {activeTab === 'exportar' && <ExportButton leads={[]} />}
      </div>
    </div>
  );
};
