import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Users, Crown, CheckCircle2, Phone, Mail, MapPin, 
  Search, Filter, LogOut, LayoutDashboard, Calendar, 
  Loader2, User, MoreHorizontal, ChevronRight, TrendingUp,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// --- Types ---
interface Professional {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  whatsapp: string;
  bairro: string;
  cidade: string;
  categorias: string[];
  status: string;
  is_vip: boolean;
  created_at: string;
}

// --- Main Admin Component ---
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'members' | 'settings'>('dashboard');
  const [leads, setLeads] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalLeads: 0,
    totalVip: 0,
    totalPending: 0,
    totalActive: 0
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const professionals = data || [];
      setLeads(professionals);
      
      // Calculate stats
      setStatistics({
        totalLeads: professionals.length,
        totalVip: professionals.filter(p => p.is_vip).length,
        totalPending: professionals.filter(p => p.status === 'PENDING').length,
        totalActive: professionals.filter(p => p.status === 'APPROVED' || p.is_vip).length
      });

    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('profissionais')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchLeads(); // Refresh data
    } catch (error) {
      alert('Erro ao atualizar status');
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Novos Leads', icon: Users },
    { id: 'members', label: 'Especialistas', icon: User },
    // { id: 'settings', label: 'Configurações', icon: UserCog },
  ];

  return (
    <div className='flex h-screen w-full bg-slate-900 overflow-hidden font-sans text-slate-900'>
      {/* Sidebar */}
      <aside className='flex w-72 flex-col bg-slate-900 border-r border-white/5'>
        <div className='flex items-center gap-3 p-8'>
          <svg
            width='32'
            height='32'
            viewBox='0 0 190 234'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8'
          >
            <path
              d='M141.4 176.4L189.9 127.9L141.4 79.4L92.9 127.9L141.4 176.4Z'
              fill='#5D5FEF'
            />
            <path
              d='M48.5 83.5L0 132L48.5 180.5L97 132L48.5 83.5Z'
              fill='white'
            />
            <path
              d='M141.4 16.5C148.6 16.5 154.5 10.6 154.5 3.4C154.5 -3.8 148.6 -9.7 141.4 -9.7C134.2 -9.7 128.3 -3.8 128.3 3.4C128.3 10.6 134.2 16.5 141.4 16.5Z'
              fill='white'
            />
            <path
              d='M176.8 233.1C184 233.1 189.9 227.2 189.9 220C189.9 212.8 184 206.9 176.8 206.9C169.6 206.9 163.7 212.8 163.7 220C163.7 227.2 169.6 233.1 176.8 233.1Z'
              fill='white'
            />
            <path
              d='M176.8 201.2C184 201.2 189.9 195.3 189.9 188.1C189.9 180.9 184 175 176.8 175C169.6 175 163.7 180.9 163.7 188.1C163.7 195.3 169.6 201.2 176.8 201.2Z'
              fill='#5D5FEF'
            />
            <path
              d='M176.8 110.1C184 110.1 189.9 104.2 189.9 97C189.9 89.8 184 83.9 176.8 83.9C169.6 83.9 163.7 89.8 163.7 97C163.7 104.2 169.6 110.1 176.8 110.1Z'
              fill='white'
            />
            <path
              d='M176.8 63.7C184 63.7 189.9 57.8 189.9 50.6C189.9 43.4 184 37.5 176.8 37.5C169.6 37.5 163.7 43.4 163.7 50.6C163.7 57.8 169.6 63.7 176.8 63.7Z'
              fill='white'
            />
          </svg>
          <div className='flex flex-col gap-1 pr-1'>
            <span className='whitespace-nowrap font-bold text-white'>
              Reformaê
            </span>
            <span className='whitespace-nowrap text-xs font-medium text-white/80'>
              Painel Administrativo
            </span>
          </div>
        </div>

        <nav className='flex-1 overflow-y-auto p-4'>
          <ul className='space-y-1'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-white text-primary shadow-lg shadow-black/10'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-white/70')} />
                    {item.label}
                    {item.id === 'leads' && statistics.totalPending > 0 && (
                      <span className='ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary'>
                        {statistics.totalPending}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='border-t border-white/10 p-4'>
          <button
            onClick={handleSignOut}
            className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-red-500/20 hover:text-red-200'
          >
            <LogOut className='h-5 w-5' />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8'>
        <div className='mx-auto max-w-7xl'>
          <header className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-black text-slate-900 tracking-tight'>
                {menuItems.find((i) => i.id === activeTab)?.label}
              </h1>
              <p className='text-slate-500 font-medium'>
                {activeTab === 'dashboard'
                  ? 'Visão geral do sistema e métricas de desempenho.'
                  : activeTab === 'leads'
                    ? 'Gerencie e entre em contato com os novos profissionais.'
                    : activeTab === 'members'
                      ? 'Lista completa de profissionais ativos na plataforma.'
                      : 'Configurações do sistema.'}
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-slate-600 shadow-sm border border-slate-100'>
                <Calendar className='h-4 w-4 text-primary' />
                {new Date().toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                })}
              </div>
            </div>
          </header>

          <AnimatePresence mode='wait'>
            {loading ? (
              <motion.div
                key='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex h-64 items-center justify-center'
              >
                <div className='flex flex-col items-center gap-4'>
                  <Loader2 className='h-12 w-12 animate-spin text-primary' />
                  <span className='font-black text-slate-400 uppercase tracking-widest text-xs'>Carregando dados...</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && (
                  <DashboardView statistics={statistics} />
                )}
                {activeTab === 'leads' && (
                  <LeadsView 
                    leads={leads} 
                    onStatusUpdate={handleUpdateStatus} 
                  />
                )}
                {activeTab === 'members' && (
                   <MembersView professionals={leads} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-views ---

function DashboardView({ statistics }: { statistics: any }) {
  const stats = [
    {
      label: 'Novos Leads',
      value: statistics.totalPending,
      icon: Users,
      trend: '+12%',
      color: 'bg-blue-500',
    },
    {
      label: 'Membros VIP 💎',
      value: statistics.totalVip,
      icon: Crown,
      trend: '+5%',
      color: 'bg-amber-500',
    },
    {
      label: 'Profissionais Ativos',
      value: statistics.totalActive,
      icon: CheckCircle2,
      trend: '+8%',
      color: 'bg-emerald-500',
    },
    {
      label: 'Conversão VIP',
      value: `${((statistics.totalVip / (statistics.totalActive || 1)) * 100).toFixed(1)}%`,
      icon: LayoutDashboard,
      trend: '+2%',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className='space-y-8'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className='group relative rounded-[2rem] bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100 overflow-hidden'
            >
              <div className={cn('absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-5 transition-transform group-hover:scale-150', stat.color)} />
              <div className='flex items-center gap-4'>
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg', stat.color)}>
                  <Icon className='h-6 w-6' />
                </div>
                <div>
                  <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>{stat.label}</p>
                  <p className='text-3xl font-black text-slate-900 tracking-tight'>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-[2.5rem] bg-white p-8 shadow-sm border border-slate-100'>
          <h3 className='mb-6 font-black text-slate-900 uppercase tracking-widest text-sm'>Atividade Recente</h3>
          <div className='space-y-6'>
            {[1, 2, 3].map((_, i) => (
              <div key={i} className='flex items-center gap-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0'>
                <div className='h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400'>
                  <Users size={20} />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-black text-slate-900 uppercase tracking-tight'>Novo Cadastro Realizado</p>
                  <p className='text-xs font-medium text-slate-500'>Um profissional de João Pessoa acaba de se cadastrar.</p>
                </div>
                <span className='text-[10px] font-black text-slate-300 uppercase'>2h atrás</span>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-[2.5rem] bg-primary p-8 shadow-xl shadow-primary/20 text-white relative overflow-hidden'>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
           <div className="relative z-10">
              <Crown className="w-12 h-12 text-yellow-300 mb-6" />
              <h3 className='mb-2 font-black text-2xl tracking-tight uppercase'>Performance VIP</h3>
              <p className='text-white/70 font-medium mb-8'>A lista VIP está convertendo 15% melhor que na semana passada.</p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest opacity-80">Meta de Receita</span>
                    <span className="text-xs font-black">75%</span>
                 </div>
                 <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-300 w-3/4 shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function LeadsView({ 
  leads, 
  onStatusUpdate 
}: { 
  leads: Professional[]; 
  onStatusUpdate: (id: string, status: string) => void;
}) {
  const [filter, setFilter] = useState('PENDING');

  const filteredLeads = leads
    .filter((lead) => (filter === 'ALL' ? true : lead.status === filter))
    .sort((a, b) => {
        // Boost VIPs to the top
        if (a.is_vip && !b.is_vip) return -1;
        if (!a.is_vip && b.is_vip) return 1;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    });

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        {['PENDING', 'CONTACTED', 'APPROVED', 'ALL'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              'rounded-xl px-5 py-2 text-xs font-black uppercase tracking-widest transition-all',
              filter === status
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white text-slate-500 hover:bg-slate-100'
            )}
          >
            {status === 'ALL' ? 'Todos' : 
             status === 'PENDING' ? 'Novo' : 
             status === 'CONTACTED' ? 'Contatado' : 'Aprovado'}
          </button>
        ))}
      </div>

      <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className='group relative flex flex-col rounded-[2.5rem] bg-white p-6 shadow-sm transition-all hover:shadow-xl border border-slate-100'
          >
            {lead.is_vip && (
              <div className="absolute -top-3 -right-3 z-10 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-200 ring-4 ring-white">
                <Crown size={12} className="fill-current" />
                Membro VIP 💎
              </div>
            )}

            <div className='mb-6 flex items-start gap-4'>
              <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 shadow-inner group-hover:scale-110 transition-transform'>
                <User size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className='truncate text-lg font-black text-slate-900 tracking-tight leading-tight'>
                  {lead.nome} {lead.sobrenome}
                </h4>
                <div className='flex items-center gap-1.5 text-slate-500 font-bold text-xs mt-1'>
                  <MapPin size={12} className="text-primary" />
                  {lead.bairro}, {lead.cidade}
                </div>
              </div>
            </div>

            <div className='mb-6 grid grid-cols-2 gap-2'>
               {lead.categorias.slice(0, 2).map((cat, i) => (
                 <span key={i} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight border border-slate-100 truncate text-center">
                   {cat}
                 </span>
               ))}
               {lead.categorias.length > 2 && (
                 <span className="bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight border border-slate-100 text-center">
                   +{lead.categorias.length - 2} mais
                 </span>
               )}
            </div>

            <div className='mb-8 space-y-3'>
              <div className='flex items-center gap-3 text-sm text-slate-600 font-medium'>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Phone size={14} />
                </div>
                <span className="font-bold">{lead.whatsapp}</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-slate-600 font-medium'>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Mail size={14} />
                </div>
                <span className="truncate font-bold">{lead.email}</span>
              </div>
            </div>

            <div className='mt-auto flex items-center gap-2'>
              <a
                href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 font-black text-[10px] text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 uppercase tracking-widest'
              >
                <Phone size={14} /> WhatsApp
              </a>
              <select
                value={lead.status}
                onChange={(e) => onStatusUpdate(lead.id, e.target.value)}
                className='h-11 rounded-xl bg-slate-100 px-4 text-[10px] font-black text-slate-600 outline-none transition-all hover:bg-slate-200 uppercase tracking-widest'
              >
                <option value='PENDING'>Novo</option>
                <option value='CONTACTED'>Contatado</option>
                <option value='APPROVED'>Aprovado</option>
                <option value='REJECTED'>Recusado</option>
              </select>
            </div>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <div className='col-span-full py-20 text-center'>
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Users size={32} />
            </div>
            <h4 className='text-xl font-black text-slate-900 uppercase tracking-widest'>Nenhum lead encontrado</h4>
            <p className='text-slate-500 font-medium'>Tente alterar o filtro para ver outros registros.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MembersView({ professionals }: { professionals: Professional[] }) {
    const members = professionals.filter(p => p.status === 'APPROVED' || p.is_vip);

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Profissional</th>
                            <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Categoria</th>
                            <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Localização</th>
                            <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 text-center">Status</th>
                            <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {members.map((member) => (
                            <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-6 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-md",
                                            member.is_vip ? "bg-amber-500" : "bg-primary"
                                        )}>
                                            {member.is_vip ? <Crown size={16} /> : member.nome[0]}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-sm uppercase tracking-tight flex items-center gap-2">
                                                {member.nome} {member.sobrenome}
                                                {member.is_vip && <span className="text-amber-500" title="Membro VIP">💎</span>}
                                            </p>
                                            <p className="text-xs font-bold text-slate-400">{member.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-4">
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight bg-slate-100 px-3 py-1 rounded-lg">
                                        {member.categorias[0]}
                                    </span>
                                </td>
                                <td className="py-6 px-4">
                                    <p className="text-xs font-bold text-slate-900">{member.bairro}</p>
                                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{member.cidade}</p>
                                </td>
                                <td className="py-6 px-4 text-center">
                                    {member.is_vip ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest border border-amber-200">
                                            VIP
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-200">
                                            ATIVO
                                        </span>
                                    )}
                                </td>
                                <td className="py-6 px-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

