import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { MapPin, Users, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface City {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  status: 'exclusive' | 'available';
  partnerName?: string;
  avatar?: string;
}

const cities: City[] = [
  { id: '1', name: 'João Pessoa', state: 'PB', lat: -7.115, lng: -34.863, status: 'exclusive', partnerName: 'Ricardo S.', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Campina Grande', state: 'PB', lat: -7.219, lng: -35.881, status: 'exclusive', partnerName: 'Ana Paula', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Goiana', state: 'PE', lat: -7.560, lng: -35.006, status: 'exclusive', partnerName: 'Marcos V.', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Recife', state: 'PE', lat: -8.047, lng: -34.877, status: 'available' },
  { id: '5', name: 'Natal', state: 'RN', lat: -5.794, lng: -35.211, status: 'available' },
  { id: '6', name: 'Maceió', state: 'AL', lat: -9.666, lng: -35.735, status: 'available' },
  { id: '7', name: 'Fortaleza', state: 'CE', lat: -3.717, lng: -38.543, status: 'available' },
  { id: '8', name: 'Salvador', state: 'BA', lat: -12.971, lng: -38.511, status: 'available' },
  { id: '9', name: 'São Paulo', state: 'SP', lat: -23.550, lng: -46.633, status: 'available' },
  { id: '10', name: 'Rio de Janeiro', state: 'RJ', lat: -22.906, lng: -43.172, status: 'available' },
];

const getCityIcon = (city: City) => {
  if (city.status === 'exclusive') {
    return L.divIcon({
      className: 'bg-transparent border-none',
      html: `
        <div class="flex flex-col items-center -mt-6 cursor-pointer" style="width: max-content; transform: translateX(-50%);">
          <div class="relative transition-transform hover:scale-110 duration-300">
            <img src="${city.avatar}" class="w-12 h-12 rounded-full border-2 border-white shadow-lg" alt="${city.partnerName}" />
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
          </div>
          <span class="mt-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-900 shadow-sm whitespace-nowrap">
            ${city.partnerName}
          </span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  } else {
    return L.divIcon({
      className: 'bg-transparent border-none',
      html: `
        <div class="flex flex-col items-center -mt-2 cursor-pointer group" style="width: max-content; transform: translateX(-50%);">
          <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:scale-150 transition-all duration-300"></div>
          <span class="mt-2 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ${city.name}
          </span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  }
};

const MapController = ({ activeCity }: { activeCity: City | null }) => {
  const map = useMap();
  useEffect(() => {
    if (activeCity) {
      map.flyTo([activeCity.lat, activeCity.lng], 6, { animate: true, duration: 1.5 });
    }
  }, [activeCity, map]);
  
  return null;
};

export default function ExpansionMapSection() {
  const [activeCity, setActiveCity] = useState<City | null>(null);

  const scrollToForm = (cityName: string) => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('fill-city', { detail: cityName }));
    }
  };

  return (
    <section id="map-section" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 rounded-full border border-primary/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Expansão ativa em todo o Brasil
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Veja quem já está dominando as cidades — e quais ainda estão disponíveis
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            Cada ponto representa um parceiro ativo ou uma oportunidade aberta. As cidades disponíveis estão sendo ocupadas rapidamente.
          </p>
        </div>

        <div className="relative min-h-[400px] sm:min-h-[600px] lg:min-h-[800px] w-full max-w-6xl mx-auto bg-slate-50/50 rounded-[40px] border border-slate-100 p-2 lg:p-4 overflow-hidden z-0">
          
          {/* Floating UI Elements */}
          <div className="absolute top-8 left-8 z-[1000] space-y-4 hidden md:block pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl shadow-slate-200/50 max-w-xs pointer-events-auto"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Status da Rede</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-sm font-semibold text-slate-700">Unidade Exclusiva</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                  <span className="text-sm font-semibold text-slate-700">Território Disponível</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl max-w-xs text-white pointer-events-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Parceiros Ativos</h3>
              </div>
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="Partner" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
              <p className="text-xs text-slate-400">Junte-se a centenas de empreendedores que já estão lucrando.</p>
            </motion.div>
          </div>

          {/* Interactive Map Area */}
          <div className="relative w-full h-[400px] sm:h-[600px] lg:h-[750px] overflow-hidden rounded-[32px] z-0">
            <MapContainer center={[-14.235, -51.925]} zoom={4} zoomControl={false} scrollWheelZoom={false} className="w-full h-full relative z-0">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <MapController activeCity={activeCity} />
              {cities.map((city) => (
                <Marker 
                  key={city.id} 
                  position={[city.lat, city.lng]} 
                  icon={getCityIcon(city)}
                  eventHandlers={{ click: () => setActiveCity(city) }}
                />
              ))}
            </MapContainer>
          </div>

          {/* Popover */}
          <AnimatePresence>
            {activeCity && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 mb-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-[1000] overflow-hidden"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveCity(null); }}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-900">{activeCity.name}</h4>
                  <p className="text-xs text-slate-500">{activeCity.state}</p>
                </div>

                <div className={cn(
                  "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-4",
                  activeCity.status === 'exclusive' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                )}>
                  {activeCity.status === 'exclusive' ? 'Unidade Exclusiva' : 'Território Disponível'}
                </div>

                <p className="text-sm text-slate-600 mb-6">
                  {activeCity.status === 'exclusive' 
                    ? `Esta cidade já está sendo operada com sucesso pelo parceiro ${activeCity.partnerName}.`
                    : "Esta oportunidade ainda está aberta. Seja o primeiro a dominar esta região."}
                </p>

                {activeCity.status === 'available' && (
                  <button 
                    onClick={() => scrollToForm(activeCity.name)}
                    className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                  >
                    Quero esta cidade
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
