import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Briefcase, 
  Globe, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  MoreVertical,
  ExternalLink, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  X,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  BarChart3,
  Copy,
  ArrowUpDown,
  Trash2,
  MessageSquare,
  User,
  Shield,
  Moon,
  Sun,
  AlertCircle,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  CheckCircle2,
  Crown,
  Bell,
  Check,
  AlertCircle as AlertIcon // Just in case
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import logoDark from '../assets/images/logo-dark.png';
import logoClaro from '../assets/images/logo-claro.png';
import iconeClaro from '../assets/images/icone-claro.png';

// Imagem premium de arquitetura moderna para o login
const loginHeroImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

interface Lead {
  id: string;
  nome: string;
  sobrenome: string;
  whatsapp: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  categorias: string[];
  is_vip: boolean;
  vip_until: string | null;
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
  const [selectedVipStatus, setSelectedVipStatus] = useState('Todos');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notifications, setNotifications] = useState<{id: string, title: string, description: string, time: string, type: 'new' | 'expiry'}[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
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

      if (error) throw error;
      setLeads(data || []);

      // Calculate Notifications
      const newNotifications = [];
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      data?.forEach((l: any) => {
        const createdAt = new Date(l.created_at);
        if (createdAt > oneDayAgo) {
          newNotifications.push({
            id: `new-${l.id}`,
            title: 'Novo Profissional',
            description: `${l.nome} se cadastrou agora.`,
            time: createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'new' as const
          });
        }

        if (l.is_vip && l.vip_until) {
          const expiry = new Date(l.vip_until);
          const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays > 0 && diffDays <= 10) {
            newNotifications.push({
              id: `exp-${l.id}`,
              title: 'VIP Expirando',
              description: `Vaga de ${l.nome} vence em ${diffDays} dias.`,
              time: 'Alerta',
              type: 'expiry' as const
            });
          }
        }
      });
      setNotifications(newNotifications);
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

    const vipCount = leads.filter(l => l.is_vip).length;

    return { total, todayCount, topCat, topCity, vipCount };
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

    if (selectedVipStatus !== 'Todos') {
      const isVipFilter = selectedVipStatus === 'VIP';
      result = result.filter(l => Boolean(l.is_vip) === isVipFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    return result;
  }, [leads, searchTerm, selectedCategory, selectedCity, selectedExperience, selectedVipStatus, sortBy]);

  // Data processing for the chart (Last 7 days)
  const chartData = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const now = new Date();
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayName = days[d.getDay()];
      const count = leads.filter(l => {
        const leadDate = new Date(l.created_at);
        return leadDate.toDateString() === d.toDateString();
      }).length;
      result.push({ name: dayName, value: count, date: d.toLocaleDateString('pt-BR') });
    }
    return result;
  }, [leads]);

  const maxChartValue = Math.max(...chartData.map(d => d.value), 5);
  
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

  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) return;
    
    if (confirm(`Tem certeza que deseja excluir ${selectedLeads.length} profissionais selecionados? Esta ação não pode ser desfeita.`)) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('profissionais')
          .delete()
          .in('id', selectedLeads);

        if (error) throw error;

        setLeads(prev => prev.filter(l => !selectedLeads.includes(l.id)));
        setSelectedLeads([]);
        alert('Profissionais excluídos com sucesso! 🗑️');
      } catch (err) {
        console.error('Erro ao excluir:', err);
        alert('Houve um erro ao excluir os registros. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }
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
    <div className={`flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-500`}>
      {/* Sidebar - Premium Animated */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarExpanded ? 256 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-white/5 fixed h-full z-50 overflow-hidden"
      >
        {/* Wrapper with conditional width to ensure centering in collapsed state */}
        <div className={`flex flex-col items-center py-8 h-full px-4 ${isSidebarExpanded ? 'w-[256px]' : 'w-[80px]'}`}>
          {/* Logo Section */}
          <div className="mb-10 w-full flex flex-col items-center">
             <div className={`relative h-12 w-full flex items-center justify-center ${isSidebarExpanded ? 'pr-12' : 'pr-0'}`}>
                <AnimatePresence mode="wait">
                   {isSidebarExpanded ? (
                     <motion.img 
                       key="logo"
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 10 }}
                       src={logoClaro} 
                       alt="Logo" 
                       className="h-8 w-auto object-contain" 
                     />
                   ) : (
                     <motion.img 
                       key="icon"
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       src={iconeClaro} 
                       alt="Icon" 
                       className="h-8 w-auto object-contain" 
                     />
                   )}
                </AnimatePresence>
             </div>
          </div>

          <nav className="flex flex-col w-full gap-4 flex-grow">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'profissionais', icon: Users, label: 'Profissionais' },
              { id: 'settings', icon: Settings, label: 'Configurações' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`group relative w-full h-12 flex items-center ${isSidebarExpanded ? 'px-4' : 'justify-center'} rounded-2xl transition-all duration-300 ${activeView === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary'}`}
              >
                <div className="w-8 flex justify-center shrink-0">
                  <item.icon size={20} className="transition-transform group-hover:scale-110 shrink-0" />
                </div>
                <AnimatePresence>
                  {isSidebarExpanded && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-4 text-xs font-black uppercase tracking-widest whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {activeView === item.id && !isSidebarExpanded && (
                  <motion.div layoutId="activePill" className="absolute -left-4 w-1.5 h-6 bg-primary rounded-r-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-50 dark:border-white/5 w-full flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-full h-12 flex items-center ${isSidebarExpanded ? 'px-4' : 'justify-center'} text-slate-400 dark:text-slate-500 hover:text-primary transition-colors hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl`}
            >
              {isDarkMode ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
              {isSidebarExpanded && (
                <span className="ml-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{isDarkMode ? 'Luz' : 'Escuro'}</span>
              )}
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className={`w-full h-12 flex items-center ${isSidebarExpanded ? 'px-4' : 'justify-center'} text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all group`}
              title="Sair"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform shrink-0" />
              {isSidebarExpanded && (
                <span className="ml-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Sair</span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Floating Toggle Button - Mounted outside sidebar to avoid clipping and overlap */}
      <motion.button 
        animate={{ left: isSidebarExpanded ? 242 : 66 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        className="hidden lg:flex fixed top-32 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/10 rounded-full items-center justify-center text-slate-400 hover:text-primary transition-all shadow-xl z-[70] group cursor-pointer"
      >
        <motion.div
          animate={{ rotate: isSidebarExpanded ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "anticipate" }}
        >
           <ChevronRight size={14} className="group-hover:scale-110" />
        </motion.div>
      </motion.button>

      {/* Main Content - Synchronized Transition */}
      <motion.main 
        animate={{ paddingLeft: isSidebarExpanded ? 256 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-grow flex flex-col min-h-screen transition-colors duration-500"
      >
        {/* Header - Solid & Clean */}
        <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-10 sticky top-0 z-40 transition-all duration-500 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeView === 'dashboard' ? 'Painel Geral' : activeView === 'profissionais' ? 'Gestão de Profissionais' : 'Configurações'}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Reformaê CRM & Analytics</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-white placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-primary/5 transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-11 h-11 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-slate-400 rounded-2xl flex items-center justify-center hover:text-primary transition-all active:scale-95 relative"
                  title="Notificações"
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-[8px] font-black text-white">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Notificações</h3>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div key={n.id} className="p-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                              <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'new' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                  {n.type === 'new' ? <UserPlus size={18} /> : <AlertCircle size={18} />}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{n.title}</p>
                                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{n.description}</p>
                                  <p className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">{n.time}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-10 text-center space-y-3">
                            <CheckCircle2 size={32} className="mx-auto text-slate-200" />
                            <p className="text-xs font-bold text-slate-400">Tudo em dia por aqui!</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={fetchLeads}
                disabled={loading}
                className="w-11 h-11 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-slate-400 rounded-2xl flex items-center justify-center hover:text-primary transition-all active:scale-95 disabled:opacity-50"
                title="Sincronizar"
              >
                <ArrowUpDown size={18} className={loading ? "animate-spin" : ""} />
              </button>
              <button 
                onClick={exportCSV}
                className="h-11 px-6 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 border border-transparent dark:border-white/10 font-black rounded-2xl flex items-center gap-2 hover:opacity-90 dark:hover:bg-slate-700 transition-all text-xs shadow-lg shadow-slate-900/10 active:scale-95"
              >
                <Download size={18} />
                Exportar
              </button>
            </div>

            <div className="w-px h-8 bg-slate-100 dark:bg-white/10 mx-2" />
            
            <div className="group flex items-center gap-4 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-none">{adminProfile.name}</p>
                <p className="text-[10px] font-bold text-primary uppercase mt-1">Administrador</p>
              </div>
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl ring-1 ring-slate-100 dark:ring-white/5 transition-transform group-hover:scale-105">
                <img src={adminProfile.avatar} alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 space-y-10">
          
          {activeView === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              {/* Section: Metrics Content from previous step but inside dashboard view */}
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
                <MetricCard title="Total Profissionais" value={metrics.total} icon={Users} color="blue" trend="+12%" />
                <MetricCard title="Assinantes VIP 💎" value={metrics.vipCount} icon={Crown} color="orange" trend="Premium" />
                <MetricCard title="Cadastros Hoje" value={metrics.todayCount} icon={UserPlus} color="emerald" trend="Foco do dia" />
                <MetricCard title="Principal Categoria" value={metrics.topCat} isString icon={Briefcase} color="indigo" trend="Tendência" />
                <MetricCard title="Cidade em Destaque" value={metrics.topCity} isString icon={Globe} color="blue" trend="Expansão" />
              </section>

              {/* Quick Summary / Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 flex flex-col shadow-sm transition-all duration-500">
                     <div className="flex items-center justify-between mb-10">
                        <div>
                           <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Resumo Semanal</h4>
                           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2">Crescimento Real de Cadastros</p>
                        </div>
                        <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-xl gap-1">
                           {['7D', '30D'].map(period => (
                             <button 
                               key={period}
                               className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${period === '7D' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm dark:shadow-none' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                             >
                               {period}
                             </button>
                           ))}
                        </div>
                     </div>
                    <div className="flex-grow min-h-[350px] relative mt-6 px-10">
                      {/* Premium Grid System */}
                      <div className="absolute inset-x-10 inset-y-0 flex flex-col justify-between pointer-events-none">
                        {[4, 3, 2, 1, 0].map((v) => (
                          <div key={v} className="relative w-full border-t border-slate-100 dark:border-white/5 flex items-center h-0">
                            <span className="absolute -left-10 text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{Math.round((v / 4) * maxChartValue)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Unified Bar & Line Engine */}
                      <div className="absolute inset-x-10 inset-y-0 flex items-end justify-between gap-4">
                        {chartData.map((d, i) => {
                          const heightPct = (d.value / Math.max(maxChartValue, 1)) * 100;
                          
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center group/item relative h-full justify-end">
                              {/* Animated Bar */}
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPct}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.05 }}
                                className="w-full max-w-[40px] bg-gradient-to-t from-primary/20 to-primary/40 dark:from-primary/10 dark:to-primary/30 rounded-t-xl relative border-x border-t border-primary/20 group-hover/item:border-primary/40 transition-all duration-300 group-hover/item:from-primary/40 group-hover/item:to-primary/60"
                              >
                                {/* Inner glow for depth */}
                                <div className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 group-hover/item:opacity-100 transition-opacity rounded-t-lg" />
                              </motion.div>

                              {/* Invisible Hover Area (Wide enough to pick up movements) */}
                              <div className="absolute inset-0 z-30 cursor-pointer" />

                              {/* Tooltip - Premium Floating */}
                              <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 z-50 pointer-events-none scale-90 group-hover/item:scale-100">
                                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl shadow-2xl border border-white/10 dark:border-slate-200 text-center min-w-[100px] backdrop-blur-md">
                                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-0.5">{d.name}</p>
                                  <p className="text-xs font-black">{d.value} leads</p>
                                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* SVG Line Overlay for Trend */}
                      <svg className="absolute inset-x-10 inset-y-0 w-[calc(100%-80px)] h-full overflow-visible pointer-events-none z-20" preserveAspectRatio="none">
                        <defs>
                          <filter id="lineGlow">
                             <feGaussianBlur stdDeviation="3" result="blur" />
                             <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <motion.path 
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{ pathLength: 1, opacity: 1 }}
                           transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                           d={(() => {
                             const step = 100 / (chartData.length - 1);
                             return chartData.map((d, i) => {
                               const x = `${i * step}%`;
                               const y = `${100 - (d.value / Math.max(maxChartValue, 1)) * 100}%`;
                               return (i === 0 ? "M " : "L ") + `${x} ${y}`;
                             }).join(" ");
                           })()}
                           fill="none"
                           stroke="#3B82F6"
                           strokeWidth="3"
                           strokeLinecap="round"
                           filter="url(#lineGlow)"
                        />
                      </svg>

                      {/* Bottom Labels */}
                      <div className="absolute bottom-[-35px] inset-x-10 flex justify-between">
                        {chartData.map(d => (
                          <div key={d.name} className="flex-1 flex flex-col items-center text-center">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{d.name}</span>
                            <span className="text-[8px] font-bold text-slate-300 dark:text-slate-700 mt-1">{d.date.split('/')[0]}/{d.date.split('/')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                     <TrendingUp className="absolute -right-10 -top-10 text-white/5" size={200} />
                     <h4 className="text-xl font-black mb-8 relative z-10 tracking-tight">Atividade Recente</h4>
                     <div className="space-y-4 relative z-10">
                        {leads.slice(0, 4).map(l => (
                          <div key={l.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                             <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-xs font-black">{l.nome[0]}{l.sobrenome[0]}</div>
                             <div className="flex flex-col">
                                <span className="text-xs font-bold group-hover:text-primary transition-colors">{l.nome} {l.sobrenome}</span>
                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Novo Profissional</span>
                             </div>
                          </div>
                        ))}
                     </div>
                     <button onClick={() => setActiveView('profissionais')} className="mt-10 w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg active:scale-95">Ver todos</button>
                  </div>
               </div>
            </motion.div>
          )}

          {activeView === 'profissionais' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-slate-900">Gerenciar Leads</h2>
                
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
                  <FilterDropdown 
                    value={selectedVipStatus}
                    onChange={setSelectedVipStatus}
                    options={['Todos', 'VIP', 'Normal']}
                    label="Assinatura"
                  />
                  <FilterDropdown 
                    value={sortBy}
                    onChange={setSortBy}
                    options={['recent', 'oldest']}
                    label="Ordenar"
                  />
                </div>
              </div>

              {/* Bulk Action Bar */}
              <AnimatePresence>
                {selectedLeads.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-primary/5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-primary uppercase tracking-widest">{selectedLeads.length} selecionados</span>
                      <div className="w-px h-6 bg-primary/20" />
                      <button 
                        onClick={exportCSV}
                        className="text-xs font-bold text-slate-600 hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <Download size={14} />
                        Exportar selecionados
                      </button>
                      
                      <div className="w-px h-6 bg-primary/20" />

                      <button 
                        onClick={handleBulkDelete}
                        className="text-xs font-bold text-slate-600 hover:text-red-500 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Excluir selecionados
                      </button>

                      <div className="w-px h-6 bg-primary/20" />

                      <button 
                        onClick={() => setSelectedLeads([])}
                        className="text-xs font-bold text-slate-600 hover:text-primary flex items-center gap-2"
                      >
                        <X size={14} />
                        Limpar seleção
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* List Header Labels - Pixel Perfect Unified Alignment */}
              <div className="grid grid-cols-12 px-6 py-4 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 hidden lg:grid items-center mb-4">
                 <div className="col-span-1 flex justify-center">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-primary bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 rounded-lg cursor-pointer transition-all" 
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0} 
                      onChange={() => setSelectedLeads(selectedLeads.length === filteredLeads.length ? [] : filteredLeads.map(l => l.id))} 
                    />
                 </div>
                 <div className="col-span-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-6">Profissional</div>
                 <div className="col-span-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Categorias</div>
                 <div className="col-span-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Localização</div>
                 <div className="col-span-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Assinatura</div>
                 <div className="col-span-1 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right pr-6">Ações</div>
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
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Configurações</h2>
                  <p className="text-slate-400 font-medium">Gerencie suas informações pessoais e segurança da conta.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Column: Avatar & Quick Info */}
                  <div className="space-y-6">
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                           <div className="w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-xl group-hover:scale-105 transition-transform duration-500">
                              <img src={adminProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                           </div>
                           <h4 className="font-black text-slate-900">{adminProfile.name}</h4>
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

                     <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
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
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
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
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
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
      </motion.main>

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
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    orange: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color as keyof typeof colors]} shadow-inner`}>
          <Icon size={28} />
        </div>
        <div className="flex flex-col items-end">
           <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${colors[color as keyof typeof colors]}`}>
             {trend}
           </span>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">{title}</p>
        <h3 className={`font-black text-slate-900 dark:text-white tracking-tight ${isString ? 'text-2xl' : 'text-4xl'}`}>{value}</h3>
      </div>
    </motion.div>
  );
}

function LeadCard({ lead, onView, isSelected, onSelect }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onView}
      className={`group bg-white dark:bg-slate-900/50 px-6 py-5 rounded-3xl border transition-all flex flex-col md:row items-center cursor-pointer mb-4 ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-xl shadow-primary/5' : 'border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 hover:shadow-lg'}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-center">
        {/* Checkbox Column */}
        <div className="col-span-1 flex justify-center" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={onSelect}
            className="w-5 h-5 accent-primary bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 rounded-lg cursor-pointer transition-all" 
          />
        </div>

        {/* Profissional Column (Avatar & Name) */}
        <div className="md:col-span-3 flex items-center gap-6 pl-2">
          <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary font-black text-xl border border-slate-200 dark:border-white/10 shadow-inner uppercase shrink-0 transition-transform group-hover:scale-105">
            {lead.nome[0]}
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">{lead.nome} {lead.sobrenome}</h4>
              {lead.is_vip && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[8px] font-black uppercase tracking-tight border border-amber-200 dark:border-amber-500/20 shadow-sm shadow-amber-500/10">
                  <Crown size={8} />
                  VIP
                </div>
              )}
            </div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 truncate">{lead.whatsapp}</p>
          </div>
        </div>

        {/* Categories Column */}
        <div className="md:col-span-3 flex flex-wrap gap-2">
          {lead.categorias.slice(0, 3).map((cat: string, i: number) => (
            <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-[9px] font-black rounded-xl uppercase tracking-widest border border-slate-200 dark:border-white/10">
              {cat}
            </span>
          ))}
          {lead.categorias.length > 2 && (
            <span className="text-[9px] font-black text-slate-400 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-lg">+{lead.categorias.length - 2}</span>
          )}
        </div>

        {/* Location Column */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-black text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <MapPin size={14} className="text-primary/60" />
              {lead.cidade}, {lead.estado}
            </p>
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">{lead.experiencia}</p>
          </div>
        </div>

        {/* Subscription Column */}
        <div className="md:col-span-2 flex items-center">
          {lead.is_vip ? (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl text-[9px] font-black uppercase tracking-tight border border-amber-200 dark:border-amber-500/20">
               <Crown size={10} />
               VIP Ativo
             </div>
          ) : (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-tight border border-slate-200 dark:border-white/10">
               Grátis
             </div>
          )}
        </div>

        {/* Actions Column */}
        <div className="md:col-span-1 flex items-center justify-end pr-4">
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <a 
              href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center justify-center hover:scale-110 transition-all active:scale-90"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
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
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] overflow-hidden"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white dark:bg-slate-950 shadow-3xl z-[110] flex flex-col font-sans overflow-hidden"
      >
        {/* Header Drawer */}
        <div className="h-20 px-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Especialista</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-400 transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Drawer */}
        <div className="flex-grow overflow-auto">
          <div className="p-8 space-y-10">
            
            {/* Header / Intro */}
            <div className="space-y-1">
               <h3 className="text-xl font-black text-slate-900 dark:text-white">Detalhes do Profissional</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Informações completas e contato direto com o especialista.</p>
            </div>

            {/* Profile Section */}
            <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20">
                  {lead.nome[0]}{lead.sobrenome[0]}
                </div>
                <div>
                   <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{lead.nome} {lead.sobrenome}</h4>
                   <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">ID: {lead.id.slice(0, 8)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`, '_blank')}
                  className="px-6 h-12 bg-primary text-white font-black rounded-xl text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Phone size={16} />
                  Contato
                </button>
                <button 
                  onClick={onDelete}
                  className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all shadow-sm"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Form-style sections */}
            <div className="space-y-8">
               <div className="space-y-4">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Informações de Contato</p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                        <div className="h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center text-sm font-bold text-slate-900 dark:text-white">
                           {lead.whatsapp}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                        <div className="h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center text-sm font-bold text-slate-900 dark:text-white truncate">
                           {lead.email}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Localização & Endereço</p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endereço Completo</label>
                        <div className="h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center text-sm font-bold text-slate-900 dark:text-white">
                           {lead.rua}, {lead.numero} - {lead.bairro}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade / Estado</label>
                        <div className="h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center text-sm font-bold text-slate-900 dark:text-white">
                           {lead.cidade}, {lead.estado}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CEP</label>
                        <div className="h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center text-sm font-bold text-slate-900 dark:text-white">
                           {lead.cep}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Experiência Profissional</p>
                  <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/5 italic text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    "{lead.descricao}"
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lead.categorias.map((cat: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black rounded-xl uppercase tracking-widest border border-primary/20">
                        {cat}
                      </span>
                    ))}
                  </div>
               </div>

               {lead.is_vip && (
                 <div className="space-y-4">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Assinatura VIP 💎</p>
                    <div className="bg-amber-50 dark:bg-amber-500/5 p-6 rounded-3xl border border-amber-100 dark:border-amber-500/10 flex items-center justify-between">
                       <div>
                          <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Assinatura Ativa</p>
                          <p className="text-[10px] font-medium text-amber-600/70 dark:text-amber-500/50 mt-1 uppercase tracking-widest leading-none">
                            Válido até: {lead.vip_until ? new Date(lead.vip_until).toLocaleDateString('pt-BR') : 'Indeterminado'}
                          </p>
                       </div>
                       <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center">
                          <Crown size={24} />
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Footer Drawer */}
        <div className="p-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-end shrink-0 bg-slate-50/50 dark:bg-white/5">
          <button 
            onClick={onClose}
            className="px-10 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:opacity-90 transition-all text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 active:scale-95"
          >
            Confirmar e Sair
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayLabel = (opt: string) => {
    if (opt === 'VIP') return 'Apenas VIP 💎';
    if (opt === 'Normal') return 'Apenas Grátis';
    if (opt === 'recent') return 'Mais Recentes';
    if (opt === 'oldest') return 'Mais Antigos';
    if (opt === 'Todos' || opt === 'Todas') return 'Todas';
    return opt;
  };

  return (
    <div className="flex items-center gap-3" ref={containerRef}>
      <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest hidden lg:block whitespace-nowrap">{label}:</span>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`h-11 px-5 min-w-[140px] bg-white dark:bg-slate-900 border ${isOpen ? 'border-primary ring-4 ring-primary/5' : 'border-slate-100 dark:border-white/10'} rounded-2xl flex items-center justify-between gap-4 transition-all hover:border-primary/30 group`}
        >
          <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
            {getDisplayLabel(value)}
          </span>
          <ChevronDown size={14} className={`text-slate-400 group-hover:text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-[100] left-0 right-0 mt-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[1.5rem] shadow-2xl shadow-slate-900/10 overflow-hidden py-2 px-1.5 backdrop-blur-xl"
            >
              {options.map((opt: string) => {
                const isSelected = value === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left rounded-xl transition-all flex items-center justify-between group/opt ${isSelected ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-tight truncate">
                      {getDisplayLabel(opt)}
                    </span>
                    {isSelected && <Check size={12} strokeWidth={4} />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
