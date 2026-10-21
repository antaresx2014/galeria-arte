import React from 'react';
import { Eye, Settings, HardDrive } from 'lucide-react';
import { APP_VERSION } from '../../version';

interface DevEnvironmentBarProps {
  viewMode: 'client' | 'admin';
  onChangeViewMode: (mode: 'client' | 'admin') => void;
  artworksCount: number;
}

export const DevEnvironmentBar: React.FC<DevEnvironmentBarProps> = ({
  viewMode,
  onChangeViewMode,
  artworksCount,
}) => {
  return (
    <aside 
      aria-label="Barra de herramientas de desarrollo local"
      className="sticky top-0 z-50 w-full bg-gallery-950 text-white border-b-2 border-gold-500 shadow-md text-xs font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Environment badge & persistence note */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60 font-mono text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            v{APP_VERSION} • LOCAL-FIRST DEV
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-gallery-400 text-[11px]">
            <HardDrive className="w-3.5 h-3.5 text-gold-400" />
            <span>Persistencia física directa: <code>src/data/*.json</code></span>
          </span>
        </div>

        {/* Center / Right: Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-gallery-900 p-0.5 rounded-xs border border-gallery-800 flex items-center">
            <button
              onClick={() => onChangeViewMode('client')}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs font-medium ${
                viewMode === 'client'
                  ? 'bg-gold text-gallery-950 font-bold shadow-xs'
                  : 'text-gallery-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>👁️ Vista Cliente</span>
            </button>
            <button
              onClick={() => onChangeViewMode('admin')}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs font-medium ${
                viewMode === 'admin'
                  ? 'bg-gold text-gallery-950 font-bold shadow-xs'
                  : 'text-gallery-300 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>🛠️ Modo Administrador (Local)</span>
              <span className="ml-1 px-1.5 py-0.2 bg-gallery-800 text-gold-300 rounded-full text-[10px]">
                {artworksCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
