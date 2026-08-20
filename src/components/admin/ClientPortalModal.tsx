import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  ShieldCheck, 
  Activity, 
  Server, 
  Layers, 
  LineChart, 
  CreditCard,
  MessageSquareShare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose, user }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchPortalData();
    }
  }, [isOpen]);

  const fetchPortalData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getClientPortalMe();
      setData(res);
    } catch (err) {
      console.error('Portal load failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const client = data?.client;
  const progress = client?.trackingSetupProgress;
  const reports = data?.reports || [];
  const invoices = data?.invoices || [];

  const milestones = [
    { key: 'dataAudit', label: 'E-commerce Tracking & Tag Audit', icon: ShieldCheck, done: progress?.dataAudit },
    { key: 'gtmContainerConfigured', label: 'GTM Web & Server Containers Configured', icon: Layers, done: progress?.gtmContainerConfigured },
    { key: 'serverSideCloudProvisioned', label: 'Cloud Server Container (Stape/GCP) Active', icon: Server, done: progress?.serverSideCloudProvisioned },
    { key: 'capiAndDeduplicationActive', label: 'Meta Conversions API & Event Deduplication', icon: Activity, done: progress?.capiAndDeduplicationActive },
    { key: 'ga4EnhancedEcommerceVerified', label: 'GA4 Enhanced E-commerce Funnel Verified', icon: LineChart, done: progress?.ga4EnhancedEcommerceVerified },
    { key: 'gmcFeedApproved', label: 'GMC Product Feed & Schema Approval', icon: CheckCircle2, done: progress?.gmcFeedApproved }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B1F4D] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-blue-900/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Client Portal Active
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {client?.companyName || user?.companyName || 'Client Tracking Hub'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Service Plan: <strong className="text-[#0066FF]">{client?.servicePlan || 'Enterprise Tracking & Ads Retainer'}</strong> • Status: <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{client?.projectStatus || 'Running'}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#071438] text-slate-400 hover:text-white border border-blue-900/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading your project metrics...</div>
        ) : (
          <div className="space-y-8 pt-6">
            
            {/* Overall Progress Bar */}
            <div className="p-6 rounded-2xl bg-[#071438] border border-blue-900/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0066FF]" />
                  Server-Side Tracking Deployment Progress
                </span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {progress?.percentComplete || 0}% Complete
                </span>
              </div>
              <div className="w-full h-3 bg-blue-950 rounded-full overflow-hidden border border-blue-900/50">
                <div 
                  className="h-full bg-gradient-to-r from-[#0066FF] via-emerald-500 to-[#FF8A00] transition-all duration-500"
                  style={{ width: `${progress?.percentComplete || 0}%` }}
                />
              </div>

              {/* Milestones Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {milestones.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                        m.done 
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                          : 'bg-[#0B1F4D]/50 border-blue-900/40 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          m.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-900/30 text-slate-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold">{m.label}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.done ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {m.done ? 'Verified' : 'In Progress'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reports Section */}
            <div>
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF8A00]" />
                Audit & Performance Reports
              </h3>
              <div className="space-y-2.5">
                {reports.length > 0 ? (
                  reports.map((rep: any) => (
                    <div
                      key={rep._id}
                      className="p-4 rounded-xl bg-[#071438] border border-blue-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">
                            {rep.reportType}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{rep.reportDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{rep.reportTitle}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">{rep.summary}</p>
                      </div>

                      <a
                        href={rep.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1.5 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download ({rep.fileSize || 'PDF'})</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/40 text-xs text-slate-400 text-center">
                    No custom reports generated yet. Your monthly diagnostic will appear here.
                  </div>
                )}
              </div>
            </div>

            {/* Invoices & Dedicated Engineer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#071438] border border-blue-900/60">
                <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Billing & Invoices
                </h4>
                <div className="space-y-2">
                  {invoices.map((inv: any) => (
                    <div key={inv.id} className="p-2.5 rounded-lg bg-[#0B1F4D] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{inv.service}</div>
                        <div className="text-[10px] text-slate-400">{inv.id} • {inv.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400 font-mono">{inv.amount}</div>
                        <span className="text-[9px] uppercase font-bold text-emerald-300">{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#071438] border border-blue-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                    Assigned Senior Engineer
                  </h4>
                  <div className="text-sm font-bold text-white">{data?.assignedEngineer?.name || 'Sakib Al-Hasan'}</div>
                  <div className="text-xs text-slate-400">{data?.assignedEngineer?.role}</div>
                  <p className="text-xs text-slate-300 mt-2">
                    Available for technical consultations, tag Layer debugging, and ROAS strategy reviews.
                  </p>
                </div>

                <a
                  href={`https://wa.me/8801806301888?text=Hello%20Options%20IT%20Engineer,%20I%20am%20${encodeURIComponent(client?.clientName || 'Client')}%20from%20${encodeURIComponent(client?.companyName || 'Store')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  <span>Direct WhatsApp Engineering Line</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
