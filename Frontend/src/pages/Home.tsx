import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import type { LoginFormValues } from '../features/auth/schemas/loginSchema';
import { loginSchema } from '../features/auth/schemas/loginSchema';

export const Home = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors },isSubmitting } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const scrollToAuth = () => {
    authCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsMobileMenuOpen(false);
  };

  const handleSwitchView = (isLogin: boolean) => {
    setIsLoginView(isLogin);
    if (window.innerWidth < 1024) {
      setTimeout(scrollToAuth, 100);
    }
  };

  const onSubmit = (data: LoginFormValues) => {
    navigate({ to: '/dashboard' });
  };

  return (
    <div className="bg-[#f8f9fa] font-body text-[#191c1d] antialiased min-h-screen flex flex-col">
      
      {/* 1. NAVBAR - CORREGIDA Y RESPONSIVA */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-[1440px] mx-auto w-full">
          {/* Logo Texto Izquierda */}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-[#182442]">CRM Intelligent</span>
            <span className="text-[10px] uppercase tracking-widest text-[#006c49] font-bold">Smart Sync</span>
          </div>
          
          {/* Menú Desktop - Centrado/Derecha */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8 text-sm font-semibold text-[#45464e]">
              <a className="hover:text-[#006c49] transition-colors" href="#">Soluciones</a>
              <a className="hover:text-[#006c49] transition-colors" href="#">Precios</a>
              <a className="hover:text-[#006c49] transition-colors" href="#">Acerca de</a>
              <a className="hover:text-[#006c49] transition-colors" href="#">Soporte</a>
            </div>
            
            <div className="flex items-center gap-4 border-l pl-8 border-slate-200">
             <button 
              className="text-sm font-bold text-[#45464e] hover:text-[#006c49] transition-colors"
              onClick={() => { handleSwitchView(true); }}>
              Iniciar Sesión
            </button>
              <button 
                className="bg-[#182442] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:bg-[#25335a] transition-all"
                onClick={() => { handleSwitchView(false); }}
              >
                Registrarme
              </button>
            </div>
          </div>

          {/* Icono Menú Móvil */}
          <button className="lg:hidden p-2" onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); }}>
            <span className="material-symbols-outlined text-[#182442]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Menú Desplegable Móvil - Refinado y Reducido */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 p-4 flex flex-col gap-3 animate-in slide-in-from-top w-full shadow-xl">
            
            {/* Botón Iniciar Sesión: Ahora parece un botón real */}
            <button 
                className="w-full text-center py-2.5 px-4 rounded-lg font-bold text-sm text-
                bg-[#008f60] hover:bg-[#00a36e] shadow-green-900/20-[#006c49]/5 active:bg-[#006c49]/10 transition-all" 
                onClick={() => { handleSwitchView(true); }}>
                Iniciar Sesión
           </button>

            {/* Botón Registrarme: Tamaño reducido */}
            <button 
              className="w-full bg-[#182442] text-white py-2.5 px-4 rounded-lg font-bold text-sm text-center shadow-md active:scale-[0.98] transition-all" 
              onClick={() => { handleSwitchView(false); }}
            >
              Registrarme
            </button>

            {/* Links adicionales opcionales (Soluciones, Precios) en tamaño pequeño */}
            <div className="flex justify-around mt-2 pt-2 border-t border-slate-100">
              <a className="text-[11px] font-bold text-[#006c49] uppercase tracking-wider" href="#">Soluciones</a>
              <a className="text-[11px] font-bold text-[#45464e] uppercase tracking-wider" href="#">Precios</a>
              <a className="text-[11px] font-bold text-[#45464e] uppercase tracking-wider" href="#">Soporte</a>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION - SIN MÓDULOS NI SIDEBAR */}
      <main className="flex-grow pt-32 lg:pt-40 pb-20 aura-gradient">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Columna Texto */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <img alt="Logo" className="h-48 w-fit mx-auto lg:mx-0 drop-shadow-md" src="/img/logo.webp" />
            
            <h1 className="text-4xl lg:text-[3.8rem] leading-[1.05] font-medium tracking-tight text-[#182442]">
              Centraliza tus ventas de <span className="text-[#006c49]">WhatsApp</span> y Email en un solo lugar
            </h1>

            <p className="text-[#45464e] text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Impulsa la productividad de tu PYME con nuestra interfaz unificada. Gestiona cada interacción comercial sin el ruido visual.
            </p>

            {/* KPIs y Avatares */}
            <div className="flex items-center justify-center lg:justify-start gap-10 mt-4">
              <div className="flex flex-col">
                <span className="text-5xl font-medium text-[#182442]">91%</span>
                <span className="text-[10px] uppercase tracking-widest text-[#45464e] font-black">Eficiencia</span>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(index => (
                  <img key={index} alt="user" className="w-11 h-11 rounded-full border-2 border-white shadow-sm" src={`https://i.pravatar.cc/100?u=${index}`} />
                ))}
                <div className="w-11 h-11 rounded-full border-2 border-white bg-[#edeeef] flex items-center justify-center text-[10px] font-bold text-[#182442] shadow-sm">
                  +12k
                </div>
              </div>
            </div>
          </div>

          {/* Columna Formulario */}
          <div ref={authCardRef} className="w-full max-w-md mx-auto lg:mr-0">
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_25px_50px_-12px_rgba(24,36,66,0.15)] border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#006c49]"></div>
              
              <h2 className="text-2xl font-bold text-[#182442] mb-1">
                {isLoginView ? 'Inicia sesión' : 'Crea tu cuenta'}
              </h2>
              <p className="text-[#45464e] text-sm mb-8">Accede a tu panel y gestiona tus leads.</p>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#45464e] ml-1">Correo Corporativo</label>
                  <input 
                    {...register('email')}
                    className="w-full bg-[#f3f4f5] border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:border-[#006c49] outline-none transition-all"
                    placeholder="nombre@empresa.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#45464e] ml-1">Contraseña</label>
                  <input 
                    {...register('password')}
                    className="w-full bg-[#f3f4f5] border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:border-[#006c49] outline-none transition-all"
                    placeholder="••••••••"
                    type="password" 
                  />
                </div>

               <button 
  disabled={isSubmitting}
  className={`w-full py-5 rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-[0.98] mt-4 disabled:opacity-70 text-white ${
    isLoginView 
      ? 'bg-[#006c49] hover:bg-[#005a3d] shadow-green-900/10' // Verde si es Login
      : 'bg-[#182442] hover:bg-[#25335a] shadow-blue-900/10'  // Azul si es Registro
  }`}
>
  {isSubmitting ? 'Cargando...' : isLoginView ? 'Entrar al Panel' : 'Registrar Empresa'}
</button>
              </form>

              <div className="mt-8 text-center pt-6 border-t border-slate-50">
                <button className="text-xs text-[#45464e]" onClick={() => { setIsLoginView(!isLoginView); }}>
                  {isLoginView ? '¿Eres nuevo?' : '¿Ya tienes cuenta?'} 
                  <span className="text-[#006c49] font-bold ml-1 hover:underline underline-offset-4">
                    {isLoginView ? 'Registra tu empresa aquí' : 'Inicia sesión'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER - FIJO ABAJO */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-[#182442] tracking-tighter">CRM Intelligent</p>
            <p className="text-[10px] text-[#45464e] font-medium uppercase tracking-widest mt-1">© 2026 Global Smart Sync Solutions. Cartago, Valle.</p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#45464e]">
            <a className="hover:text-[#006c49]" href="#">Privacidad</a>
            <a className="hover:text-[#006c49]" href="#">Términos</a>
            <a className="hover:text-[#006c49]" href="#">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};