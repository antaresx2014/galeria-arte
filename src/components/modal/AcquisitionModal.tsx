import React, { useState } from 'react';
import type { Artwork } from '../../types/artwork';
import { formatPrice, generateWhatsAppLink, generateMailtoLink } from '../../utils/formatters';
import { 
  X, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Send,
  Lock
} from 'lucide-react';

interface AcquisitionModalProps {
  artwork: Artwork;
  mode: 'reserve' | 'inquiry';
  isOpen: boolean;
  onClose: () => void;
}

export const AcquisitionModal: React.FC<AcquisitionModalProps> = ({
  artwork,
  mode,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    offerAmount: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a production backend, this would call an API/endpoint.
  };

  const isSold = artwork.status === 'sold';
  const whatsappUrl = generateWhatsAppLink(
    artwork, 
    mode === 'reserve' ? 'reserve' : (formData.offerAmount ? 'offer' : 'inquiry'),
    formData.offerAmount ? `${formData.offerAmount} €` : undefined
  );
  const mailtoUrl = generateMailtoLink(artwork, mode === 'reserve' ? 'reserve' : 'inquiry');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gallery-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white rounded-xs shadow-modal border border-gallery-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gallery-200 bg-gallery-50">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold block">
              {mode === 'reserve' ? 'Adquisición & Reserva Exclusiva' : 'Consulta Privada & Propuesta'}
            </span>
            <h3 className="font-serif text-xl font-bold text-gallery-900">
              {artwork.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gallery-400 hover:text-gallery-900 hover:bg-gallery-200 rounded transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Artwork Mini Summary Card */}
          <div className="flex items-center gap-4 p-3 bg-gallery-50 rounded border border-gallery-200">
            <img
              src={artwork.primaryImage}
              alt={artwork.title}
              className="w-16 h-16 object-cover rounded-xs border border-gallery-300 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gallery-500">Ref: {artwork.id} • {artwork.year}</p>
              <h4 className="font-serif text-sm font-bold text-gallery-900 truncate">
                {artwork.title}
              </h4>
              <p className="text-xs text-gallery-600 truncate">
                {artwork.dimensions.height} × {artwork.dimensions.width} cm • {artwork.medium}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-serif text-base font-bold text-gallery-900">
                {formatPrice(artwork.price)}
              </p>
              <p className="text-[10px] text-gallery-500 uppercase">
                {isSold ? 'Vendido' : 'Disponible 1/1'}
              </p>
            </div>
          </div>

          {submitted ? (
            /* Success Feedback */
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-gallery-900">
                Solicitud Recibida Correctamente
              </h4>
              <p className="text-sm text-gallery-600 max-w-md mx-auto">
                Gracias por su interés en <em>"{artwork.title}"</em>. El artista {artwork.artist} o su asistente de galería se pondrá en contacto con usted en un plazo máximo de 12 horas para coordinar los detalles.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Continuar por WhatsApp Inmediato</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Direct Conversions (WhatsApp & Email) */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gallery-700 uppercase tracking-wider">
                  Canales de Comunicación Directa con el Atelier:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 p-3 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors group"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp con Ref. Automática</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="flex items-center justify-center gap-2.5 p-3 rounded bg-gallery-50 hover:bg-gallery-100 text-gallery-800 border border-gallery-300 text-xs font-semibold transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-gallery-600 group-hover:scale-110 transition-transform" />
                    <span>Enviar Email con Especificaciones</span>
                  </a>
                </div>
              </div>

              {/* Form Option */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-gallery-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gallery-700 uppercase tracking-wider">
                    {mode === 'reserve' ? 'O formalizar reserva previa:' : 'Formulario de consulta / oferta:'}
                  </span>
                  <span className="text-[11px] text-gallery-400">Sin compromiso</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gallery-600 mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carmen Navarro"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold focus:bg-white outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gallery-600 mb-1">Correo electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="carmen@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold focus:bg-white outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gallery-600 mb-1">Teléfono de contacto</label>
                    <input
                      type="tel"
                      placeholder="+34 600 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold focus:bg-white outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gallery-600 mb-1">Ciudad / País de destino</label>
                    <input
                      type="text"
                      placeholder="Madrid, París, Nueva York..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold focus:bg-white outline-hidden"
                    />
                  </div>
                </div>

                {mode === 'inquiry' && (
                  <div>
                    <label className="block text-xs text-gallery-600 mb-1">Propuesta de precio (EUR €) opcional</label>
                    <input
                      type="number"
                      placeholder={`Precio catálogo: ${artwork.price} €`}
                      value={formData.offerAmount}
                      onChange={(e) => setFormData({ ...formData, offerAmount: e.target.value })}
                      className="w-full text-xs p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold focus:bg-white outline-hidden"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-gallery-600 mb-1">Comentario o petición específica</label>
                  <textarea
                    rows={3}
                    placeholder="¿Desea solicitar una visita privada al taller, consultar opciones de enmarcado a medida o solicitar factura para empresa?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold focus:bg-white outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gallery-900 hover:bg-gold-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {mode === 'reserve' ? 'Enviar Solicitud de Reserva y Factura Proforma' : 'Enviar Propuesta al Artista'}
                  </span>
                </button>
              </form>

              {/* Security & Authenticity guarantees */}
              <div className="pt-2 border-t border-gallery-200 grid grid-cols-3 gap-2 text-center text-[10px] text-gallery-500">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>Certificado Original Firmado</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-gold-600" />
                  <span>Envío con Seguro Total</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Lock className="w-4 h-4 text-gold-600" />
                  <span>Transacción Confidencial</span>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
