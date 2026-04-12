import { useState, useEffect } from 'react';
import { UnifiedInbox } from '../components/UnifiedInbox';
import { useAuth } from '../hooks/useAuth';

export default function MiInbox() {
  const { userId, userName } = useAuth();
  const [loading, setLoading] = useState(!userId);

  useEffect(() => {
    // Simular carga
    setTimeout(() => setLoading(false), 300);
  }, []);

  if (loading || !userId || !userName) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin h-8 w-8 border-4 border-[#006c49] border-t-transparent rounded-full mb-3"></div>
            <p className="text-slate-600">Cargando Inbox...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Inbox Unificado del Vendedor Logeado */}
        <UnifiedInbox vendedorId={userId} vendedorNombre={userName} />
      </div>
    </div>
  );
}
