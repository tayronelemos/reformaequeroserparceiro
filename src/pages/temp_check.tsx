import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  ExternalLink, 
  MapPin, 
  Clock, 
  ChevronRight, 
  X,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronDown,
  TrendingUp,
  UserPlus,
  BarChart3,
  Globe,
  MoreVertical,
  CheckCircle2,
  Copy,
  ArrowUpDown,
  Trash2,
  MessageSquare,
  User,
  Shield,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import logoClaro from '../assets/images/logo-claro.png';

// Imagem premium de arquitetura moderna para o login
const loginHeroImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

interface Lead {
  id: string;
  nome: string;
  sobrenome: string;
  whatsapp: string;
  email: string;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro: string;
  cidade: string;
  estado?: string;
  categorias: string[];
  experiencia: string;
  descricao: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [selectedExperience, setSelectedExperience] = useState('Todos');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Persistence Logic: Load from LocalStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged') === 'true';
  });
  
  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('admin_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Tayrone Lemos',
      email: 'tayrone@reformae.com',
      bio: '',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tayrone'
    };
  });

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  // --- Dark Mode Persistence ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('admin_theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('admin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('admin_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync Profile to LocalStorage
  useEffect(() => {
    localStorage.setItem('admin_profile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  // Sync Auth to LocalStorage
  useEffect(() => {
    localStorage.setItem('admin_logged', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Configurações salvas com sucesso! ✅');
    }, 1000);
  };

  // Load leads from Supabase
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro detalhado Supabase:', error);
        throw error;
      }
      setLeads(data || []);
    } catch (err) {
      console.error('Erro na conexão:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }
  }, [isLoggedIn]);

  // Derived Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const todayCount = leads.filter(l => {
      const d = new Date(l.created_at);
      const today = new Date();
      return d.toDateString() === today.toDateString();
    }).length;

    const catCounts: Record<string, number> = {};
    leads.forEach(l => l.categorias.forEach(cat => catCounts[cat] = (catCounts[cat] || 0) + 1));
    const topCat = Object.entries(catCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const cityCounts: Record<string, number> = {};
    leads.forEach(l => cityCounts[l.cidade] = (cityCounts[l.cidade] || 0) + 1);
    const topCity = Object.entries(cityCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return { total, todayCount, topCat, topCity };
  }, [leads]);

  // Cities for filter
  const uniqueCities = useMemo(() => {
    return Array.from(new Set(leads.map(l => l.cidade))).filter(Boolean);
  }, [leads]);

  // Filtered & Sorted Leads
  const filteredLeads = useMemo(() => {
    let result = [...leads];
    
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      result = result.filter(l => 
        (l.nome + ' ' + l.sobrenome).toLowerCase().includes(s) ||
        l.email.toLowerCase().includes(s) ||
        l.whatsapp.includes(s) ||
        l.categorias.some(cat => cat.toLowerCase().includes(s))
      );
    }

    if (selectedCategory !== 'Todas') {
      result = result.filter(l => l.categorias.includes(selectedCategory.toLowerCase()));
    }

    if (selectedCity !== 'Todas') {
      result = result.filter(l => l.cidade === selectedCity);
    }

    if (selectedExperience !== 'Todos') {
      result = result.filter(l => l.experiencia === selectedExperience);
    }

    result.sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    return result;
  }, [leads, searchTerm, selectedCategory, selectedCity, selectedExperience, sortBy]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email === 'admin@reformae.com' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas. Tente admin@reformae.com / admin123');
    }
  };

  const exportCSV = () => {
    const listToExport = selectedLeads.length > 0 
      ? leads.filter(l => selectedLeads.includes(l.id))
      : filteredLeads;

    if (listToExport.length === 0) return;
    
    const headers = ['Nome', 'WhatsApp', 'Email', 'Cidade', 'Estado', 'Categorias', 'Experiência'];
    const rows = listToExport.map(l => [
      `${l.nome} ${l.sobrenome}`, l.whatsapp, l.email, l.cidade, l.estado, l.categorias.join('|'), l.experiencia
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_reformaê_${Date.now()}.csv`;
    link.click();
  };

  const toggleLeadSelection = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 z-10">
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-2 mb-12">
              <img src={logoClaro} alt="Reformaê Logo" className="h-10 w-auto" />
              <span className="text-xl font-black text-slate-900 tracking-tighter ml-2">ADMIN</span>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Bem-vindo de volta!</h1>
              <p className="text-slate-500 font-medium">Entre na sua conta administrativa.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 ml-1">E-mail</label>
                <input 
                  type="email" 
                  placeholder="admin@reformae.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                />
              </div>
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-between ml-1 mb-2">
                  <label className="text-sm font-bold text-slate-900">Senha</label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">Esqueceu a senha?</a>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-primary" />
                <label htmlFor="remember" className="text-xs font-bold text-slate-500">Lembrar de mim</label>
              </div>
              
              {loginError && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-600 text-sm font-bold">
                  <AlertCircle size={18} />
                  {loginError}
                </div>
              )}

              <button 
                type="submit"
                className="w-full h-14 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
              >
                Entrar no Painel
              </button>

              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Acesso Restrito</span>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Graphic / Hero */}
        <div className="hidden md:block w-1/2 relative bg-slate-900">
          <img 
            src={loginHeroImg} 
            alt="Reformaê Admin" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-20 left-20 right-20">
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter max-w-md">Gerencie sua rede de especialistas.</h2>
            <p className="text-slate-300 text-lg font-medium max-w-xs leading-relaxed">
              O controle total da sua base de profissionais parceiros em um único lugar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFE] dark:bg-slate-950 flex font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-white/5 hidden lg:flex flex-col fixed inset-y-0 z-50 transition-colors">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <img src={logoClaro} alt="Reformaê Logo" className="h-9 w-auto" />
          </div>

          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${activeView === 'dashboard' ? 'bg-primary/5 text-primary border border-primary/10 font-black dark:bg-primary/10' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <LayoutDashboard size={20} className={activeView === 'dashboard' ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveView('profissionais')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${activeView === 'profissionais' ? 'bg-primary/5 text-primary border border-primary/10 font-black dark:bg-primary/10' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <Users size={20} className={activeView === 'profissionais' ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
              Profissionais
            </button>
            <button 
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${activeView === 'settings' ? 'bg-primary/5 text-primary border border-primary/10 font-black dark:bg-primary/10' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <Settings size={20} className={activeView === 'settings' ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
              Configurações
            </button>
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
          <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-100 dark:border-white/5">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Suporte Técnico</p>
             <button className="w-full h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2">
               <MessageSquare size={14} />
               Falar com suporte
             </button>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-black text-sm transition-all"
          >
            <LogOut size={20} />
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-24 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, e-mail ou WhatsApp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Switch */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative w-16 h-8 flex items-center bg-slate-100 dark:bg-white/10 rounded-full p-1 transition-all cursor-pointer border border-slate-200 dark:border-white/5 shadow-inner"
              title="Trocar Tema"
            >
              <motion.div 
                className="w-6 h-6 bg-white dark:bg-primary rounded-full shadow-lg flex items-center justify-center"
                animate={{ x: isDarkMode ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDarkMode ? <Moon size={12} className="text-white fill-current" /> : <Sun size={12} className="text-yellow-500 fill-current" />}
              </motion.div>
            </button>

            <button 
              onClick={fetchLeads}
              disabled={loading}
              className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-400 rounded-xl flex items-center justify-center hover:text-primary transition-all active:scale-95 disabled:opacity-50"
              title="Sincronizar dados"
            >
              <ArrowUpDown size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={exportCSV}
              className="px-6 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-sm active:scale-95"
            >
              <Download size={18} className="text-primary" />
              Exportar CSV
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-100 shadow-sm">
              <img src={adminProfile.avatar} alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 space-y-10">
          
          {activeView === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              {/* Section: Metrics Content from previous step but inside dashboard view */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Total Profissionais" value={metrics.total} icon={Users} color="blue" trend="+12%" />
                <MetricCard title="Cadastros Hoje" value={metrics.todayCount} icon={UserPlus} color="emerald" trend="Foco do dia" />
                <MetricCard title="Principal Categoria" value={metrics.topCat} isString icon={Briefcase} color="indigo" trend="Tendência" />
                <MetricCard title="Cidade em Destaque" value={metrics.topCity} isString icon={Globe} color="orange" trend="Expansão" />
              </section>

              {/* Quick Summary / Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 flex flex-col transition-colors">
                    <div className="flex items-center justify-between mb-8">
                       <div>
                          <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Resumo Semanal</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Crescimento Real de Cadastros</p>
                       </div>
                       <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-xl gap-1">
                          {['7D', '30D'].map(period => (
                            <button 
                              key={period}
                              onClick={() => setSelectedExperience(period)} // Temporarily using experience state or creating new one
                              className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${period === '7D' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm dark:text-white dark:border dark:border-white/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                              {period}
                            </button>
                          ))}
                       </div>
                    </div>
                    
                    {/* INTERACTIVE SVG CHART */}
                    <div className="flex-grow min-h-[300px] relative group/chart">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Grid Lines */}
                        {[0, 100, 200, 300].map(y => (
                          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                        ))}
                        
                        {/* Dynamic Path based on leads data (Simplified simulation for real feel) */}
                        <motion.path 
                          d="M0,280 C150,280 150,220 300,220 C450,220 450,80 600,80 C750,80 800,20 800,20 V300 H0 Z" 
                          fill="url(#chartGradient)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                        
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5 }}
                          d="M0,280 C150,280 150,220 300,220 C450,220 450,80 600,80 C750,80 800,20 800,20" 
                          fill="none" 
                          stroke="#3B82F6" 
                          strokeWidth="4" 
                          strokeLinecap="round"
                        />

                        {/* Interactive Data Points */}
                        {[
                          { x: 0, y: 280, val: leads.length > 5 ? 12 : 1, label: 'Seg' },
                          { x: 300, y: 220, val: leads.length > 2 ? 8 : 0, label: 'Qua' },
                          { x: 600, y: 80, val: leads.length, label: 'Sex' },
                          { x: 800, y: 20, val: metrics.total, label: 'Hoje' }
                        ].map((point, i) => (
                          <g key={i} className="cursor-pointer group/point">
                            {/* Hover Zone */}
                            <circle cx={point.x} cy={point.y} r={30} fill="transparent" />
                            
                            {/* Point Dot */}
                            <circle 
                              cx={point.x} 
                              cy={point.y} 
                              r={6} 
                              fill="#3B82F6" 
                              stroke="white" 
                              strokeWidth="3"
                              className="transition-transform group-hover/point:scale-150"
                            />

                            {/* Tooltip */}
                            <foreignObject x={point.x - 50} y={point.y - 70} width="100" height="60" className="opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                               <div className="bg-slate-900 text-white p-2 rounded-xl text-center shadow-xl border border-white/10">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{point.label}</p>
                                  <p className="text-sm font-black">{point.val} leads</p>
                               </div>
                            </foreignObject>
                          </g>
                        ))}
                      </svg>

                      {/* Timeline Labels */}
                      <div className="flex justify-between mt-6 px-2">
                         {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
                           <span key={day} className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{day}</span>
                         ))}
                      </div>
                    </div>
                 </div>
                 <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-white/5">
                    <TrendingUp className="absolute -right-4 -top-4 text-white/5" size={160} />
                    <h4 className="text-lg font-black mb-6 relative z-10">Atividade Recente</h4>
                    <div className="space-y-4 relative z-10">
                       {leads.slice(0, 3).map(l => (
                         <div key={l.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-[10px] font-black">{l.nome[0]}{l.sobrenome[0]}</div>
                            <div className="flex flex-col">
                               <span className="text-xs font-bold">{l.nome} {l.sobrenome}</span>
                               <span className="text-[10px] text-slate-400">Cadastrou-se agora</span>
                            </div>
                         </div>
                       ))}
                    </div>
                    <button onClick={() => setActiveView('profissionais')} className="mt-8 w-full py-4 bg-white dark:bg-slate-100 text-slate-900 rounded-2xl font-black text-xs hover:bg-slate-100 dark:hover:bg-white transition-all">Ver todos Profissionais</button>
                 </div>
              </div>
            </motion.div>
          )}

          {activeView === 'profissionais' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gerenciar Leads</h2>
                
                <div className="flex flex-wrap items-center gap-3">
                  <FilterDropdown 
                    value={selectedCategory} 
                    onChange={setSelectedCategory} 
                    options={['Todas', 'Pedreiro', 'Eletricista', 'Encanador', 'Pintor', 'Jardineiro', 'Diarista', 'Marceneiro', 'Outros']}
                    label="Categoria"
                  />
                  <FilterDropdown 
                    value={selectedCity} 
                    onChange={setSelectedCity} 
                    options={['Todas', ...uniqueCities]}
                    label="Cidade"
                  />
                  <select 
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className="h-10 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 cursor-pointer"
                  >
                    <option value="recent">Mais Recentes</option>
                    <option value="oldest">Mais Antigos</option>
                  </select>
                </div>
              </div>

              {/* Bulk Action Bar */}
              <AnimatePresence>
                {selectedLeads.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-primary/5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-primary uppercase tracking-widest">{selectedLeads.length} selecionados</span>
                      <div className="w-px h-6 bg-primary/20" />
                      <button 
                        onClick={exportCSV}
                        className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-primary flex items-center gap-2"
                      >
                        <Download size={14} />
                        Exportar selecionados
                      </button>
                      <button 
                        onClick={() => setSelectedLeads([])}
                        className="text-xs font-bold text-slate-600 dark:text-red-400 hover:text-red-500 flex items-center gap-2"
                      >
                        <X size={14} />
                        Limpar seleção
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* List Header Labels */}
              <div className="grid grid-cols-12 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100 hidden lg:grid">
                 <div className="col-span-1"><input type="checkbox" className="accent-primary" checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0} onChange={() => setSelectedLeads(selectedLeads.length === filteredLeads.length ? [] : filteredLeads.map(l => l.id))} /></div>
                 <div className="col-span-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profissional</div>
                 <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cidade / Estado</div>
                 <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categorias</div>
                 <div className="col-span-1 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cadastro</div>
                 <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Ações</div>
              </div>

              {/* Lead Collection */}
              <div className="space-y-4">
                {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                  <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    isSelected={selectedLeads.includes(lead.id)}
                    onSelect={() => toggleLeadSelection(lead.id)}
                    onView={() => setSelectedLead(lead)} 
                  />
                )) : (
                  <EmptyState />
                )}
              </div>
            </div>
          )}

          {activeView === 'settings' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mx-auto space-y-10 pb-20">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Configurações</h2>
                  <p className="text-slate-400 font-medium">Gerencie suas informações pessoais e segurança da conta.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Column: Avatar & Quick Info */}
                  <div className="space-y-6">
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                           <div className="w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-500">
                              <img src={adminProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                           </div>
                           <h4 className="font-black text-slate-900 dark:text-white">{adminProfile.name}</h4>
                           <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Administrador Master</p>
                           <input 
                             type="file" 
                             id="avatar-upload" 
                             hidden 
                             accept="image/*" 
                             onChange={handleAvatarChange} 
                           />
                           <button 
                             onClick={() => document.getElementById('avatar-upload')?.click()}
                             className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all border border-white/10"
                           >
                             Alterar Avatar
                           </button>
                        </div>
                     </div>

                     <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 transition-colors">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Status da Conta</h5>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                           <span className="text-xs font-bold text-slate-700">Conta Verificada</span>
                        </div>
                        <p className="text-[10px] text-slate-400">Último acesso: Hoje às 11:45</p>
                     </div>
                  </div>

                  {/* Right Column: Forms */}
                  <div className="lg:col-span-2 space-y-6">
                     {/* Personal Info */}
                     <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden transition-colors">
                        <div className="flex items-center gap-3 mb-8">
                           <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                              <User size={20} />
                           </div>
                           <h4 className="font-black text-slate-900 tracking-tight">Dados Pessoais</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                              <input 
                                 type="text" 
                                 value={adminProfile.name} 
                                 onChange={(e) => setAdminProfile(p => ({ ...p, name: e.target.value }))}
                                 className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Comercial</label>
                              <input 
                                 type="email" 
                                 value={adminProfile.email} 
                                 className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all opacity-70"
                                 disabled
                              />
                           </div>
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mini Biografia</label>
                              <textarea 
                                 rows={3}
                                 value={adminProfile.bio}
                                 onChange={(e) => setAdminProfile(p => ({ ...p, bio: e.target.value }))}
                                 placeholder="Conte um pouco sobre suas responsabilidades..." 
                                 className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                              />
                           </div>
                        </div>

                        <button 
                          onClick={handleSaveProfile}
                          disabled={loading}
                          className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                        >
                           {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                     </div>

                     {/* Security */}
                     <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-8">
                           <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                              <Shield size={20} />
                           </div>
                           <h4 className="font-black text-slate-900 tracking-tight">Segurança</h4>
                        </div>

                        <div className="space-y-4">
                           <button 
                             onClick={() => alert('Um link para redefinir sua senha foi enviado para seu e-mail! 🔐')}
                             className="w-full h-14 px-6 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-slate-100 transition-all"
                           >
                              <span className="text-sm font-bold text-slate-700">Alterar senha de acesso</span>
                              <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                           </button>
                           <button className="w-full h-14 px-6 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-slate-100 transition-all">
                              <span className="text-sm font-bold text-slate-700">Habilitar autenticação em dois fatores</span>
                              <div className="w-10 h-5 bg-slate-200 rounded-full relative p-1">
                                 <div className="w-3 h-3 bg-white rounded-full" />
                              </div>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDrawer 
            lead={selectedLead} 
            onClose={() => setSelectedLead(null)} 
            onDelete={async () => {
              if (confirm('Tem certeza que deseja excluir este lead?')) {
                const { error } = await supabase.from('profissionais').delete().eq('id', selectedLead.id);
                if (!error) {
                  setLeads(prev => prev.filter(l => l.id !== selectedLead.id));
                  setSelectedLead(null);
                }
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MetricCard({ title, value, icon: Icon, color, trend, isString = false }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm shadow-slate-200/50 dark:shadow-none transition-all"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
          <Icon size={24} />
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${colors[color as keyof typeof colors]}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className={`font-black text-slate-900 tracking-tight ${isString ? 'text-xl' : 'text-3xl'}`}>{value}</h3>
      </div>
    </motion.div>
  );
}

function LeadCard({ lead, onView, isSelected, onSelect }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.005, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)' }}
      className={`group bg-white p-6 md:p-8 rounded-[2rem] border transition-all flex flex-col md:flex-row md:items-center gap-6 ${isSelected ? 'border-primary ring-2 ring-primary/5' : 'border-slate-100'}`}
    >
      <div className="flex items-center gap-6 flex-grow">
        <div className="flex items-center gap-4">
           <input 
              type="checkbox" 
              checked={isSelected} 
              onChange={onSelect}
              className="w-5 h-5 accent-primary cursor-pointer" 
           />
           <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary font-black text-xl shadow-inner uppercase">
             {lead.nome[0]}{lead.sobrenome[0]}
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow items-center">
          <div className="lg:col-span-5">
            <h4 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-primary transition-colors">{lead.nome} {lead.sobrenome}</h4>
            <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-slate-400">{lead.email}</span>
            </div>
          </div>
          
          <div className="lg:col-span-3">
             <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                <MapPin size={14} className="text-slate-300" />
                {lead.cidade}, {lead.estado}
             </div>
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-2">
            {lead.categorias.slice(0, 2).map((cat: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-lg uppercase tracking-wider">
                {cat}
              </span>
            ))}
            {lead.categorias.length > 2 && (
              <span className="px-2 py-1 bg-slate-50 text-[10px] font-black text-slate-400 rounded-lg">
                +{lead.categorias.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50 min-w-[320px]">
        <div className="flex items-center gap-2 text-slate-300 font-medium text-xs mr-4">
           <Clock size={14} />
           {new Date(lead.created_at).toLocaleDateString()}
        </div>
        
        <div className="flex items-center gap-2">
          <a 
            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-12 px-6 bg-emerald-500 text-white font-black rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all text-xs shadow-lg shadow-emerald-500/10 active:scale-95"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.446 4.428-9.873 9.877-9.873 2.639 0 5.118 1.03 6.983 2.895a9.827 9.827 0 012.89 6.981c-.001 5.447-4.428 9.874-9.877 9.874m8.313-18.287A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chamar
          </a>
          
          <button 
            onClick={onView}
            className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary hover:border-primary/20 transition-all active:scale-95 shadow-sm"
          >
            <ChevronRight size={20} />
          </button>

          <div className="relative group/more">
            <button className="w-10 h-10 text-slate-300 hover:text-slate-600 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LeadDrawer({ lead, onClose, onDelete }: any) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 overflow-hidden"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-3xl z-[60] flex flex-col font-sans"
      >
        {/* Header Drawer */}
        <div className="h-24 px-10 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
              {lead.nome[0]}{lead.sobrenome[0]}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">{lead.nome} {lead.sobrenome}</h2>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1.5">Perfil do Profissional</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Drawer */}
        <div className="flex-grow overflow-auto">
          <div className="p-10 space-y-12">
            
            {/* Action Section */}
             <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 space-y-6">
               <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Contato Direto</p>
                   <p className="text-xl font-black text-slate-900">{lead.whatsapp}</p>
                 </div>
                 <div className="flex gap-2">
                   <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm">
                     <Copy size={20} />
                   </button>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => window.open(`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`, '_blank')}
                   className="h-16 bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/10 active:scale-95"
                 >
                   <Phone size={20} />
                   Chamar agora
                 </button>
                 <button 
                   onClick={() => window.location.href = `mailto:${lead.email}`}
                   className="h-16 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95"
                 >
                   <Mail size={20} />
                   Enviar E-mail
                 </button>
               </div>
             </div>

             {/* Info Groups */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InfoGroup icon={MapPin} label="Localização">
                  <p className="text-slate-900 font-bold leading-relaxed">
                    {lead.rua}, {lead.numero}<br/>
                    {lead.bairro}<br/>
                    {lead.cidade}, {lead.estado}<br/>
                    <span className="text-primary font-black mt-2 inline-block">CEP {lead.cep}</span>
                  </p>
                </InfoGroup>

                <InfoGroup icon={Briefcase} label="Especialidades">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {lead.categorias.map((cat: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-wider">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Experiência</p>
                    <p className="text-slate-900 font-black">{lead.experiencia}</p>
                  </div>
                </InfoGroup>
             </div>

             {/* Bio Section */}
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Descrição Detalhada</p>
                  <div className="flex-grow h-px bg-slate-100" />
                </div>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 italic text-slate-600 leading-relaxed font-medium shadow-inner">
                  "{lead.descricao}"
                </div>
             </div>

             {/* Metadata */}
             <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest">
                 <Calendar size={16} className="text-slate-300" />
                 Cadastrado em {new Date(lead.created_at).toLocaleDateString()}
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase">
                 <CheckCircle2 size={16} />
                 Validado pela rede
               </div>
             </div>

          </div>
        </div>

        {/* Footer Drawer */}
        <div className="p-10 border-t border-slate-50 flex items-center gap-4 shrink-0">
          <button 
            onClick={onDelete}
            className="flex-grow h-14 border border-red-100 text-red-500 font-black rounded-2xl hover:bg-red-50 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Remover Candidato
          </button>
        </div>
      </motion.div>
    </>
  );
}

function InfoGroup({ icon: Icon, label, children }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
         <Icon size={16} className="text-primary" />
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
}

function FilterDropdown({ value, onChange, options, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block">{label}:</span>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 cursor-pointer hover:border-primary/30 transition-all font-sans"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center bg-white rounded-[3rem] border border-slate-50 border-dashed">
      <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <Users className="text-slate-200" size={40} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">Ainda não há profissionais cadastrados</h3>
      <p className="text-slate-400 font-medium text-sm">Assim que os primeiros cadastros acontecerem, eles aparecerão aqui.</p>
    </div>
  );
}
