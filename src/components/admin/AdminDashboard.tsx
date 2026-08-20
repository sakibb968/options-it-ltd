import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Layers, 
  FileText, 
  Settings, 
  Globe, 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  MessageSquareShare, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Server, 
  Code2, 
  LogOut, 
  RefreshCw,
  Send,
  AlertCircle,
  Download
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onClose: () => void;
}

type TabType = 'overview' | 'leads' | 'clients' | 'cms' | 'services' | 'projects' | 'reports' | 'audits' | 'blogs' | 'testimonials' | 'notifications' | 'apiDocs';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadFilter, setSelectedLeadFilter] = useState('All');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Modals & Form States
  const [newNoteText, setNewNoteText] = useState('');
  const [activeLeadIdForNote, setActiveLeadIdForNote] = useState<string | null>(null);

  // New Service Form State
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    serviceName: '',
    shortDescription: '',
    fullDescription: '',
    pricingStartingAt: 399,
    features: ''
  });

  // New Client Form State
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientData, setNewClientData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    servicePlan: 'Enterprise Server-Side CAPI & GA4 Setup',
    totalPaid: 1500
  });

  // New Report Form State
  const [showAddReport, setShowAddReport] = useState(false);
  const [newReportData, setNewReportData] = useState({
    clientId: '',
    reportTitle: '',
    reportType: 'Meta Ads',
    summary: '',
    spend: 5000,
    roas: 3.8,
    emqScore: 9.4
  });

  // Notification Dispatch Form
  const [dispatchData, setDispatchData] = useState({
    title: '',
    message: '',
    recipientWhatsApp: '+8801806301888'
  });

  useEffect(() => {
    loadAllDashboardData();
  }, []);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const loadAllDashboardData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        leadsRes,
        clientsRes,
        servicesRes,
        projectsRes,
        reportsRes,
        auditsRes,
        blogsRes,
        testimonialsRes,
        notifsRes,
        cmsRes
      ] = await Promise.all([
        apiClient.getDashboardStats().catch(() => ({ stats: null })),
        apiClient.getLeads().catch(() => ({ leads: [] })),
        apiClient.getClients().catch(() => ({ clients: [] })),
        apiClient.getServices().catch(() => ({ services: [] })),
        apiClient.getProjects().catch(() => ({ projects: [] })),
        apiClient.getReports().catch(() => ({ reports: [] })),
        apiClient.getAudits().catch(() => ({ audits: [] })),
        apiClient.getBlogs().catch(() => ({ blogs: [] })),
        apiClient.getTestimonials().catch(() => ({ testimonials: [] })),
        apiClient.getNotifications().catch(() => ({ notifications: [] })),
        apiClient.getCmsContent().catch(() => ({ content: null }))
      ]);

      setStats(statsRes.stats);
      setLeads(leadsRes.leads || []);
      setClients(clientsRes.clients || []);
      setServices(servicesRes.services || []);
      setProjects(projectsRes.projects || []);
      setReports(reportsRes.reports || []);
      setAudits(auditsRes.audits || []);
      setBlogs(blogsRes.blogs || []);
      setTestimonials(testimonialsRes.testimonials || []);
      setNotifications(notifsRes.notifications || []);
      setCmsContent(cmsRes.content || null);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lead Actions
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await apiClient.updateLeadStatus(leadId, newStatus);
      showFeedback(`Lead status updated to ${newStatus}`);
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  const handleAddNoteToLead = async (leadId: string) => {
    if (!newNoteText.trim()) return;
    try {
      await apiClient.addLeadNote(leadId, newNoteText);
      setNewNoteText('');
      setActiveLeadIdForNote(null);
      showFeedback('Note added successfully');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await apiClient.deleteLead(leadId);
      showFeedback('Lead deleted');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // Tracking Progress Toggle
  const handleToggleMilestone = async (clientId: string, key: string, currentVal: boolean) => {
    try {
      await apiClient.updateTrackingProgress(clientId, { [key]: !currentVal });
      showFeedback('Milestone updated');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // Create Service Handler
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createService({
        ...newServiceData,
        features: newServiceData.features.split(',').map(f => f.trim()).filter(Boolean)
      });
      setShowAddService(false);
      setNewServiceData({ serviceName: '', shortDescription: '', fullDescription: '', pricingStartingAt: 399, features: '' });
      showFeedback('New service created');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // Create Client Handler
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createClient(newClientData);
      setShowAddClient(false);
      setNewClientData({ clientName: '', companyName: '', email: '', phone: '', website: '', servicePlan: 'Enterprise Server-Side CAPI & GA4 Setup', totalPaid: 1500 });
      showFeedback('Client onboarded successfully');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // Create Report Handler
  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createReport({
        ...newReportData,
        metrics: { spend: newReportData.spend, roas: newReportData.roas, emqScore: newReportData.emqScore }
      });
      setShowAddReport(false);
      showFeedback('Client report published');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // Send WhatsApp/Email alert
  const handleDispatchNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.dispatchNotification({
        type: 'system',
        title: dispatchData.title,
        message: dispatchData.message,
        recipientWhatsApp: dispatchData.recipientWhatsApp
      });
      setDispatchData({ title: '', message: '', recipientWhatsApp: '+8801806301888' });
      showFeedback('Notification sent to WhatsApp & Email channels');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // CMS Update Handler
  const handleSaveHomepageCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.updateHomepageCms(cmsContent.homepage);
      showFeedback('Homepage CMS content saved and live!');
      loadAllDashboardData();
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesStatus = selectedLeadFilter === 'All' || l.status === selectedLeadFilter;
    const matchesQuery = !searchQuery || 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.websiteURL.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#071438] text-slate-100 flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Admin Header Bar */}
      <header className="h-16 bg-[#0B1F4D] border-b border-blue-900/60 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#071438] border border-blue-400/40 flex items-center justify-center shadow-lg">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">
                OPTIONS <span className="text-[#0066FF]">IT</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/30 uppercase">
                ADMIN CRM
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Logged in as: <strong className="text-white">{user?.name}</strong> ({user?.role})
            </div>
          </div>
        </div>

        {/* Feedback Alert Pill */}
        {feedbackMsg && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllDashboardData}
            className="p-2 rounded-xl bg-[#071438] hover:bg-blue-900/40 text-slate-300 border border-blue-900/60 text-xs flex items-center gap-1.5 cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#071438] text-slate-400 hover:text-white border border-blue-900/50 cursor-pointer"
            title="Exit Dashboard & View Website"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body: Left Sidebar Navigation + Right Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-56 sm:w-64 bg-[#0B1F4D]/80 border-r border-blue-900/60 p-3 flex flex-col justify-between overflow-y-auto shrink-0">
          <div className="space-y-1">
            
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Management Modules
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'leads' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Leads CRM</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF8A00] text-black">
                {leads.filter(l => l.status === 'New').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'clients' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Clients & Tracking</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">{clients.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'cms' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Website Content CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'services' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Service Management</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'projects' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Case Studies & Results</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'reports' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Client Reports Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('audits')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'audits' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Store Audits</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-900 text-blue-300">
                {audits.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'blogs' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'notifications' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>Alerts & WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('apiDocs')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'apiDocs' ? 'bg-[#0066FF] text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-blue-950/60'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>API Docs & Architecture</span>
            </button>

          </div>

          <div className="p-3 rounded-2xl bg-[#071438] border border-blue-900/50 mt-4 text-[11px]">
            <div className="text-slate-400 font-bold uppercase tracking-wider">System Status</div>
            <div className="flex items-center gap-1.5 text-emerald-400 mt-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All 16 Modules Online
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">REST API v1.0.0</div>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div>
                <h2 className="text-2xl font-extrabold text-white">Agency Intelligence Dashboard</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Live tracking performance, revenue attribution, lead generation, and client onboarding metrics.
                </p>
              </div>

              {/* 4 Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Website Visitors</span>
                    <Globe className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
                    {stats?.totalVisitors?.toLocaleString() || '28,450'}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">
                    ↑ +18.4% this month
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Total Inquiries & Leads</span>
                    <Users className="w-4 h-4 text-[#FF8A00]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
                    {stats?.totalLeads || leads.length}
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium mt-1">
                    {stats?.newInquiries || 2} new needing response
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Active Tracking Clients</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
                    {stats?.activeClients || clients.length}
                  </div>
                  <div className="text-[11px] text-emerald-300 font-medium mt-1">
                    {stats?.completedProjects || 5} completed projects
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Client Revenue Overview</span>
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
                    ${(stats?.totalRevenue || 8500).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-purple-300 font-medium mt-1">
                    Retainers & setups
                  </div>
                </div>

              </div>

              {/* Charts & Demand Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Monthly Revenue Trend Bars */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#0066FF]" />
                      Agency Monthly Revenue Growth
                    </h3>
                    <span className="text-xs text-emerald-400 font-bold">+170% H2 Growth</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {stats?.monthlyRevenue?.map((m: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold">{m.month} 2026</span>
                          <span className="text-white font-bold">${m.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2.5 bg-blue-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#0066FF] to-[#FF8A00]" 
                            style={{ width: `${(m.revenue / 20000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Demand Breakdown */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#FF8A00]" />
                    Service Inquiries Demand
                  </h3>

                  <div className="space-y-3">
                    {stats?.serviceDemand?.map((srv: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 truncate max-w-[200px]">{srv.name}</span>
                          <span className="text-slate-400 font-mono">{srv.count} leads ({srv.percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-blue-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#0066FF]" 
                            style={{ width: `${srv.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Recent Leads Preview */}
              <div className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Recent Incoming Leads</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-[#0066FF] hover:underline"
                  >
                    View All in Leads CRM →
                  </button>
                </div>

                <div className="space-y-2">
                  {leads.slice(0, 4).map((l: any) => (
                    <div key={l._id} className="p-3.5 rounded-xl bg-[#071438] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{l.name}</span>
                          <span className="text-xs text-slate-400 font-mono">({l.companyName || l.websiteURL})</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {l.serviceRequired} • <strong className="text-emerald-400">{l.budget}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          l.status === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          l.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {l.status}
                        </span>

                        <a
                          href={`https://wa.me/${l.phone?.replace(/[^0-9]/g, '') || '8801806301888'}?text=Hello%20${encodeURIComponent(l.name)},%20this%20is%20Sakib%20from%20Options%20IT%20Ltd`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800 text-xs font-bold flex items-center gap-1"
                        >
                          <MessageSquareShare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Lead Management CRM</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage client inquiries, change pipeline stages, add diagnostic notes, and assign engineers.
                  </p>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <select
                    value={selectedLeadFilter}
                    onChange={e => setSelectedLeadFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="All">All Stages</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="space-y-4">
                {filteredLeads.map((lead: any) => (
                  <div
                    key={lead._id}
                    className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-3"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-white">{lead.name}</h3>
                          <span className="text-xs text-slate-400 font-mono">({lead.companyName || 'Brand'})</span>
                          <a
                            href={lead.websiteURL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#0066FF] hover:underline flex items-center gap-0.5"
                          >
                            <span>{lead.websiteURL}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-xs text-slate-300 mt-1 flex items-center gap-4 flex-wrap">
                          <span>Service: <strong className="text-white">{lead.serviceRequired}</strong></span>
                          <span>Budget: <strong className="text-emerald-400">{lead.budget}</strong></span>
                          <span>Phone/WA: <strong className="text-slate-200 font-mono">{lead.phone}</strong></span>
                          <span>Assigned: <strong className="text-blue-300">{lead.assignedTo || 'Unassigned'}</strong></span>
                        </div>
                      </div>

                      {/* Status Selector & WhatsApp Contact */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <select
                          value={lead.status}
                          onChange={e => handleUpdateLeadStatus(lead._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                            lead.status === 'New' ? 'bg-amber-950 text-amber-300 border-amber-700' :
                            lead.status === 'Converted' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                            'bg-blue-950 text-blue-300 border-blue-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <a
                          href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '') || '8801806301888'}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20Sakib%20from%20Options%20IT%20Ltd`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <MessageSquareShare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => setActiveLeadIdForNote(activeLeadIdForNote === lead._id ? null : lead._id)}
                          className="px-3 py-1.5 rounded-xl bg-[#071438] hover:bg-blue-900 border border-blue-800 text-xs font-bold text-slate-300"
                        >
                          + Note
                        </button>

                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {lead.message && (
                      <div className="p-3 rounded-xl bg-[#071438] text-xs text-slate-300 italic border border-blue-900/40">
                        "{lead.message}"
                      </div>
                    )}

                    {/* Internal Notes History */}
                    {lead.notes && lead.notes.length > 0 && (
                      <div className="pt-2 border-t border-blue-900/40 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Internal CRM Notes:</div>
                        {lead.notes.map((note: any, nIdx: number) => (
                          <div key={nIdx} className="text-xs text-slate-300 flex items-start justify-between">
                            <span>• {note.text} <strong className="text-blue-300">({note.author})</strong></span>
                            <span className="text-[10px] text-slate-500 font-mono">{new Date(note.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Note Input Field */}
                    {activeLeadIdForNote === lead._id && (
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Type internal diagnostic or call note..."
                          value={newNoteText}
                          onChange={e => setNewNoteText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-[#071438] border border-blue-800 text-xs text-white focus:outline-none"
                        />
                        <button
                          onClick={() => handleAddNoteToLead(lead._id)}
                          className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold"
                        >
                          Save Note
                        </button>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: CLIENTS & TECHNICAL TRACKING MILESTONES */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Client CRM & Tracking Setup Manager</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Control technical setup milestone checklists that reflect instantly in each client's portal.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddClient(true)}
                  className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Onboard New Client</span>
                </button>
              </div>

              {/* Add Client Modal */}
              {showAddClient && (
                <div className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-500/40 mb-6">
                  <h3 className="text-base font-bold text-white mb-4">Onboard New eCommerce Client</h3>
                  <form onSubmit={handleCreateClient} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Client Contact Name</label>
                        <input
                          type="text"
                          required
                          value={newClientData.clientName}
                          onChange={e => setNewClientData({ ...newClientData, clientName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Company / Brand Name</label>
                        <input
                          type="text"
                          required
                          value={newClientData.companyName}
                          onChange={e => setNewClientData({ ...newClientData, companyName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={newClientData.email}
                          onChange={e => setNewClientData({ ...newClientData, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">WhatsApp / Phone</label>
                        <input
                          type="text"
                          value={newClientData.phone}
                          onChange={e => setNewClientData({ ...newClientData, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Website URL</label>
                        <input
                          type="text"
                          value={newClientData.website}
                          onChange={e => setNewClientData({ ...newClientData, website: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold">
                        Confirm & Save Client
                      </button>
                      <button type="button" onClick={() => setShowAddClient(false)} className="px-4 py-2 rounded-xl bg-[#071438] text-slate-400 text-xs">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Clients List & Interactive Milestone Toggles */}
              <div className="space-y-6">
                {clients.map((client: any) => {
                  const p = client.trackingSetupProgress || {};
                  return (
                    <div key={client._id} className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-white">{client.companyName}</h3>
                            <span className="text-xs text-slate-400 font-mono">({client.clientName})</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                              {client.projectStatus}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300 mt-0.5">
                            Plan: <strong className="text-blue-300">{client.servicePlan}</strong> • Email: <span className="font-mono">{client.email}</span>
                          </div>
                        </div>

                        <div className="text-right font-mono text-sm">
                          <span className="text-xs text-slate-400">Total Paid: </span>
                          <strong className="text-emerald-400">${client.totalPaid?.toLocaleString() || '1,500'}</strong>
                        </div>
                      </div>

                      {/* Technical Milestones Checklist for this Client */}
                      <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                            Interactive Technical Milestone Toggles (Click to Update Client Portal):
                          </span>
                          <span className="text-xs font-extrabold text-[#FF8A00] font-mono">
                            {p.percentComplete || 0}% Done
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          <button
                            onClick={() => handleToggleMilestone(client._id, 'dataAudit', p.dataAudit)}
                            className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              p.dataAudit ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>1. Data & Tag Audit</span>
                            <span>{p.dataAudit ? '✓' : '○'}</span>
                          </button>

                          <button
                            onClick={() => handleToggleMilestone(client._id, 'gtmContainerConfigured', p.gtmContainerConfigured)}
                            className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              p.gtmContainerConfigured ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>2. GTM Web + Server Containers</span>
                            <span>{p.gtmContainerConfigured ? '✓' : '○'}</span>
                          </button>

                          <button
                            onClick={() => handleToggleMilestone(client._id, 'serverSideCloudProvisioned', p.serverSideCloudProvisioned)}
                            className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              p.serverSideCloudProvisioned ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>3. First-Party Cloud Subdomain</span>
                            <span>{p.serverSideCloudProvisioned ? '✓' : '○'}</span>
                          </button>

                          <button
                            onClick={() => handleToggleMilestone(client._id, 'capiAndDeduplicationActive', p.capiAndDeduplicationActive)}
                            className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              p.capiAndDeduplicationActive ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>4. Meta CAPI Deduplication (9+ EMQ)</span>
                            <span>{p.capiAndDeduplicationActive ? '✓' : '○'}</span>
                          </button>

                          <button
                            onClick={() => handleToggleMilestone(client._id, 'ga4EnhancedEcommerceVerified', p.ga4EnhancedEcommerceVerified)}
                            className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              p.ga4EnhancedEcommerceVerified ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>5. GA4 Revenue 100% Match</span>
                            <span>{p.ga4EnhancedEcommerceVerified ? '✓' : '○'}</span>
                          </button>

                          <button
                            onClick={() => handleToggleMilestone(client._id, 'gmcFeedApproved', p.gmcFeedApproved)}
                            className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              p.gmcFeedApproved ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>6. GMC Feed & Schema Reinstatement</span>
                            <span>{p.gmcFeedApproved ? '✓' : '○'}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 4: CMS EDITOR */}
          {activeTab === 'cms' && cmsContent && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Website Content Management (CMS)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Control all public website text, headlines, CTA buttons, and statistics from the central admin database.
                </p>
              </div>

              <form onSubmit={handleSaveHomepageCms} className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#0066FF]" />
                  Homepage Hero & Headline Settings
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={cmsContent.homepage?.heroTitle || ''}
                    onChange={e => setCmsContent({ ...cmsContent, homepage: { ...cmsContent.homepage, heroTitle: e.target.value } })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={cmsContent.homepage?.heroSubtitle || ''}
                    onChange={e => setCmsContent({ ...cmsContent, homepage: { ...cmsContent.homepage, heroSubtitle: e.target.value } })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={cmsContent.homepage?.ctaPrimaryText || ''}
                      onChange={e => setCmsContent({ ...cmsContent, homepage: { ...cmsContent.homepage, ctaPrimaryText: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Secondary CTA Button Label</label>
                    <input
                      type="text"
                      value={cmsContent.homepage?.ctaSecondaryText || ''}
                      onChange={e => setCmsContent({ ...cmsContent, homepage: { ...cmsContent.homepage, ctaSecondaryText: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#EA580C] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF8A00]/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish CMS Content Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Service Management</h2>
                  <p className="text-xs text-slate-400 mt-1">Manage core services, pricing, and feature highlights.</p>
                </div>

                <button
                  onClick={() => setShowAddService(!showAddService)}
                  className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {showAddService && (
                <form onSubmit={handleCreateService} className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-500/40 space-y-4">
                  <h3 className="text-sm font-bold text-white">Create New Agency Service</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Service Name</label>
                      <input
                        type="text"
                        required
                        value={newServiceData.serviceName}
                        onChange={e => setNewServiceData({ ...newServiceData, serviceName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Starting Price ($)</label>
                      <input
                        type="number"
                        value={newServiceData.pricingStartingAt}
                        onChange={e => setNewServiceData({ ...newServiceData, pricingStartingAt: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Short Description</label>
                    <input
                      type="text"
                      required
                      value={newServiceData.shortDescription}
                      onChange={e => setNewServiceData({ ...newServiceData, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Features (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="First-Party Subdomain, Safari ITP Cookie Extension, 9+ EMQ"
                      value={newServiceData.features}
                      onChange={e => setNewServiceData({ ...newServiceData, features: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold">Save Service</button>
                    <button type="button" onClick={() => setShowAddService(false)} className="px-4 py-2 rounded-xl bg-[#071438] text-slate-400 text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv: any) => (
                  <div key={srv._id} className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">{srv.serviceName}</h3>
                        <span className="text-xs font-bold text-emerald-400 font-mono">From ${srv.pricingStartingAt}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">{srv.shortDescription}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {srv.features?.map((f: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#071438] border border-blue-900 text-slate-300">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CASE STUDIES */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Case Studies & Performance Results</h2>
                <p className="text-xs text-slate-400 mt-1">Quantified client results, before/after metrics, and verified reviews.</p>
              </div>

              <div className="space-y-4">
                {projects.map((proj: any) => (
                  <div key={proj._id} className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{proj.projectTitle}</h3>
                      <span className="text-xs text-[#0066FF] font-bold">{proj.clientName}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40">
                        <div className="font-bold text-rose-300">Before Tracking Fix:</div>
                        <div className="text-slate-300 mt-1">{proj.problem}</div>
                        <div className="mt-2 text-rose-400 font-mono font-bold">{proj.beforeAfterData?.beforeMetric}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                        <div className="font-bold text-emerald-300">After Server CAPI Fix:</div>
                        <div className="text-slate-300 mt-1">{proj.results}</div>
                        <div className="mt-2 text-emerald-400 font-mono font-bold">{proj.beforeAfterData?.afterMetric}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Client Reports Management</h2>
                  <p className="text-xs text-slate-400 mt-1">Publish PDF reports for Meta Ads, Google Ads, GA4, and Tracking Audits.</p>
                </div>

                <button
                  onClick={() => setShowAddReport(!showAddReport)}
                  className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Report</span>
                </button>
              </div>

              {showAddReport && (
                <form onSubmit={handleCreateReport} className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-500/40 space-y-4">
                  <h3 className="text-sm font-bold text-white">Publish Client Report</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Select Client</label>
                      <select
                        required
                        value={newReportData.clientId}
                        onChange={e => setNewReportData({ ...newReportData, clientId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                      >
                        <option value="">Choose Client...</option>
                        {clients.map(c => <option key={c._id} value={c._id}>{c.companyName} ({c.clientName})</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Report Title</label>
                      <input
                        type="text"
                        required
                        placeholder="Meta CAPI EMQ Audit"
                        value={newReportData.reportTitle}
                        onChange={e => setNewReportData({ ...newReportData, reportTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Report Type</label>
                      <select
                        value={newReportData.reportType}
                        onChange={e => setNewReportData({ ...newReportData, reportType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                      >
                        <option value="Tracking Audit">Tracking Audit</option>
                        <option value="Meta Ads">Meta Ads</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="GA4">GA4</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Summary Findings</label>
                    <input
                      type="text"
                      placeholder="Attribution quality improved to 9.6 with zero missing checkout events."
                      value={newReportData.summary}
                      onChange={e => setNewReportData({ ...newReportData, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold">Publish to Client Hub</button>
                    <button type="button" onClick={() => setShowAddReport(false)} className="px-4 py-2 rounded-xl bg-[#071438] text-slate-400 text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {reports.map((rep: any) => (
                  <div key={rep._id} className="p-4 rounded-xl bg-[#0B1F4D] border border-blue-900/60 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">{rep.reportType}</span>
                        <span className="text-xs text-slate-400 font-mono">{rep.reportDate}</span>
                        <strong className="text-xs text-white">{rep.clientName}</strong>
                      </div>
                      <div className="text-sm font-bold text-white mt-1">{rep.reportTitle}</div>
                      <div className="text-xs text-slate-300 mt-0.5">{rep.summary}</div>
                    </div>
                    <a href={rep.fileUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-bold flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: AUDITS */}
          {activeTab === 'audits' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Store Tracking & GMC Audit Requests</h2>
                <p className="text-xs text-slate-400 mt-1">Free audits submitted by eCommerce merchants awaiting technical review.</p>
              </div>

              <div className="space-y-3">
                {audits.map((a: any) => (
                  <div key={a._id} className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-bold text-white">{a.name} ({a.businessName})</div>
                        <div className="text-xs text-[#0066FF] font-mono">{a.website}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {a.status}
                        </span>
                        <a
                          href={`https://wa.me/${a.phone?.replace(/[^0-9]/g, '') || '8801806301888'}?text=Hello%20${encodeURIComponent(a.name)},%20we%20reviewed%20your%20store%20audit%20for%20${encodeURIComponent(a.website)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <MessageSquareShare className="w-3.5 h-3.5" />
                          <span>WhatsApp Audit Result</span>
                        </a>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#071438] text-xs text-slate-300">
                      <strong>Identified Issue:</strong> {a.trackingProblem} • <strong>Platform:</strong> {a.adPlatform}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Blog CMS Management</h2>
                <p className="text-xs text-slate-400 mt-1">Publish SEO articles on Server Tracking, Meta CAPI, and Google Merchant Center fixes.</p>
              </div>

              <div className="space-y-4">
                {blogs.map((b: any) => (
                  <div key={b._id} className="p-5 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{b.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">{b.category}</span>
                    </div>
                    <p className="text-xs text-slate-300">{b.seoDescription}</p>
                    <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
                      <span>Author: <strong className="text-slate-200">{b.author}</strong></span>
                      <span>•</span>
                      <span>Slug: <strong className="text-blue-300 font-mono">{b.slug}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: ALERTS & WHATSAPP DISPATCH */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Multi-Channel Notification & WhatsApp Dispatch</h2>
                <p className="text-xs text-slate-400 mt-1">Trigger instant system alerts, client updates, and WhatsApp notifications.</p>
              </div>

              {/* Notification Dispatcher Form */}
              <form onSubmit={handleDispatchNotification} className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-4 max-w-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-400" />
                  Dispatch Instant WhatsApp & System Alert
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Notification Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Milestone Achieved: 9.6 EMQ Verified"
                    value={dispatchData.title}
                    onChange={e => setDispatchData({ ...dispatchData, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Message Content</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="First-party server container deployed successfully on custom subdomain."
                    value={dispatchData.message}
                    onChange={e => setDispatchData({ ...dispatchData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Target WhatsApp Hotline</label>
                  <input
                    type="text"
                    value={dispatchData.recipientWhatsApp}
                    onChange={e => setDispatchData({ ...dispatchData, recipientWhatsApp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#071438] border border-blue-900 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  <span>Send WhatsApp Alert</span>
                </button>
              </form>

              {/* Notification Logs */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">Recent System Notifications</h3>
                {notifications.map((n: any) => (
                  <div key={n._id} className="p-3.5 rounded-xl bg-[#0B1F4D] border border-blue-900/40 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white">{n.title}</div>
                      <div className="text-xs text-slate-300 mt-0.5">{n.message}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">{new Date(n.createdAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: API DOCS & DEPLOYMENT */}
          {activeTab === 'apiDocs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">REST API Architecture & Production Deployment</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Complete REST API endpoints list, authentication flows, rate limiting, and MongoDB deployment steps.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#0066FF]" />
                    Master REST API Endpoints Overview
                  </h3>
                  <a
                    href="/api/v1/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#071438] border border-blue-800 text-xs font-mono text-blue-300 hover:text-white flex items-center gap-1"
                  >
                    <span>View /api/v1/docs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  
                  <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/40 space-y-2">
                    <div className="font-bold text-[#0066FF] font-sans">Authentication & Users</div>
                    <div><span className="text-emerald-400">POST</span> /api/v1/auth/login</div>
                    <div><span className="text-emerald-400">POST</span> /api/v1/auth/register</div>
                    <div><span className="text-blue-400">GET</span> /api/v1/auth/profile</div>
                    <div><span className="text-amber-400">POST</span> /api/v1/auth/change-password</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/40 space-y-2">
                    <div className="font-bold text-[#0066FF] font-sans">Analytics & CMS</div>
                    <div><span className="text-blue-400">GET</span> /api/v1/dashboard/stats</div>
                    <div><span className="text-blue-400">GET</span> /api/v1/cms/content</div>
                    <div><span className="text-amber-400">PUT</span> /api/v1/cms/homepage</div>
                    <div><span className="text-amber-400">PUT</span> /api/v1/cms/about</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/40 space-y-2">
                    <div className="font-bold text-[#0066FF] font-sans">Leads CRM & Audits</div>
                    <div><span className="text-emerald-400">POST</span> /api/v1/leads</div>
                    <div><span className="text-blue-400">GET</span> /api/v1/leads</div>
                    <div><span className="text-purple-400">PATCH</span> /api/v1/leads/:id/status</div>
                    <div><span className="text-emerald-400">POST</span> /api/v1/audits</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/40 space-y-2">
                    <div className="font-bold text-[#0066FF] font-sans">Clients, Reports & Progress</div>
                    <div><span className="text-blue-400">GET</span> /api/v1/clients</div>
                    <div><span className="text-blue-400">GET</span> /api/v1/clients/portal/me</div>
                    <div><span className="text-purple-400">PATCH</span> /api/v1/clients/:id/progress</div>
                    <div><span className="text-emerald-400">POST</span> /api/v1/reports</div>
                  </div>

                </div>

                {/* Deployment Instructions Box */}
                <div className="p-4 rounded-xl bg-[#071438] border border-emerald-500/30 text-xs space-y-2">
                  <div className="font-bold text-emerald-400 font-sans flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Production Deployment Instructions
                  </div>
                  <p className="text-slate-300">
                    1. <strong>MongoDB Setup:</strong> Set <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-300">MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/options_it</code> in <code className="bg-black/50 px-1.5 py-0.5 rounded">.env</code>.
                  </p>
                  <p className="text-slate-300">
                    2. <strong>Build Full-Stack App:</strong> Run <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-300">npm run build</code> (compiles Vite frontend & bundles Node/Express server into <code className="bg-black/50 px-1.5 py-0.5 rounded">dist/server.cjs</code>).
                  </p>
                  <p className="text-slate-300">
                    3. <strong>Launch Server:</strong> Run <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-300">npm start</code> (starts Express on port 3000).
                  </p>
                </div>

              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
