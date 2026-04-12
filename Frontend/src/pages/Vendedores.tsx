import { useState } from 'react';

interface Vendedor {
  id: number;
  nombre: string;
  email: string;
  leadsAsignados: number;
  leadsConvertidos: number;
  tasaConversion: number;
  estado: 'activo' | 'inactivo';
}

export const Vendedores = () => {
  const [vendedores] = useState<Vendedor[]>([
    {
      id: 1,
      nombre: 'Carlos Vendedor',
      email: 'carlos@crm.com',
      leadsAsignados: 24,
      leadsConvertidos: 6,
      tasaConversion: 25,
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'Juan Pérez',
      email: 'juan@crm.com',
      leadsAsignados: 18,
      leadsConvertidos: 5,
      tasaConversion: 27.8,
      estado: 'activo'
    },
    {
      id: 3,
      nombre: 'María García',
      email: 'maria@crm.com',
      leadsAsignados: 32,
      leadsConvertidos: 10,
      tasaConversion: 31.25,
      estado: 'activo'
    }
  ]);

  return (
    <div className="space-y-6 p-4 md:p-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#182442]">
            Gestión de Vendedores
          </h1>
          <p className="text-slate-600 text-base mt-1">
            Monitorea el desempeño de tu equipo de ventas
          </p>
        </div>
      </header>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium">Total Vendedores</p>
              <p className="text-2xl font-bold text-blue-600">{vendedores.length}</p>
            </div>
            <span className="material-symbols-outlined text-blue-300 text-4xl">people</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium">Leads Totales</p>
              <p className="text-2xl font-bold text-green-600">
                {vendedores.reduce((acc, v) => acc + v.leadsAsignados, 0)}
              </p>
            </div>
            <span className="material-symbols-outlined text-green-300 text-4xl">person_add</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium">Conversiones</p>
              <p className="text-2xl font-bold text-purple-600">
                {vendedores.reduce((acc, v) => acc + v.leadsConvertidos, 0)}
              </p>
            </div>
            <span className="material-symbols-outlined text-purple-300 text-4xl">trending_up</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium">Tasa Promedio</p>
              <p className="text-2xl font-bold text-orange-600">
                {(vendedores.reduce((acc, v) => acc + v.tasaConversion, 0) / vendedores.length).toFixed(1)}%
              </p>
            </div>
            <span className="material-symbols-outlined text-orange-300 text-4xl">percent</span>
          </div>
        </div>
      </div>

      {/* Tabla de Vendedores */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-[#182442] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">list_alt</span>
          Equipo de Vendedores
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Vendedor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Leads Asignados</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Convertidos</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Tasa Conversión</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody>
              {vendedores.map((vendedor) => (
                <tr key={vendedor.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-800">{vendedor.nombre}</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">{vendedor.email}</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-800">{vendedor.leadsAsignados}</td>
                  <td className="px-4 py-3 text-center font-semibold text-green-600">{vendedor.leadsConvertidos}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-[#006c49] h-2 rounded-full" 
                          style={{ width: `${vendedor.tasaConversion}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-[#006c49] text-sm w-12 text-right">
                        {vendedor.tasaConversion.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      vendedor.estado === 'activo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${vendedor.estado === 'activo' ? 'bg-green-600' : 'bg-slate-400'}`}></span>
                      {vendedor.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendedores;
