import React from 'react';
import type { SiteContent } from '../../types/siteContent';
import { Award, Calendar, Compass } from 'lucide-react';

interface ArtistSectionProps {
  siteContent: SiteContent;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({ siteContent }) => {
  const { artist, artistSection } = siteContent;

  return (
    <section id="artista" className="w-full bg-white py-20 sm:py-28 border-t border-gallery-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-700 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>{artistSection.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gallery-900 leading-tight">
            {artistSection.titlePrefix} {artist.name}
          </h2>
          <p className="text-base text-gallery-600 font-serif italic">
            {artist.tagline}
          </p>
        </div>

        {/* Main Grid: Biography + Studio Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual Studio & Portrait */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-gallery-100 shadow-gallery">
              <img
                src={artist.portraitImage}
                alt={artist.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gallery-900/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-gold-300 font-medium">
                  {artist.location}
                </p>
                <h3 className="font-serif text-2xl font-bold">
                  {artist.name}
                </h3>
              </div>
            </div>

            {/* Studio Sculpture Thumbnail */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-gallery-100 shadow-gallery border border-gallery-200">
              <img
                src={artist.studioImage}
                alt={`Taller y estudio de ${artist.name}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded">
                Busto en madera tallada • Taller de {artist.name}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Timeline & Awards */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio text */}
            <div className="space-y-4 text-gallery-700 text-sm sm:text-base leading-relaxed">
              <p>
                {artist.bio}
              </p>
              <p>
                {artist.bioExtended}
              </p>
              <blockquote className="border-l-2 border-gold pl-4 py-1 italic text-gallery-900 font-serif text-base sm:text-lg">
                {artist.statement}
              </blockquote>
            </div>

            {/* Exhibitions Timeline */}
            <div className="space-y-4 pt-4 border-t border-gallery-200">
              <h3 className="text-xs uppercase tracking-widest text-gallery-900 font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-700" />
                <span>{artistSection.exhibitionsHeading}</span>
              </h3>
              
              <div className="space-y-3">
                {artist.exhibitions.map((expo, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-xs sm:text-sm">
                    <span className="font-mono text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded shrink-0">
                      {expo.year}
                    </span>
                    <div>
                      <p className="font-semibold text-gallery-900">{expo.title}</p>
                      <p className="text-gallery-500 text-xs">{expo.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Distinctions */}
            <div className="space-y-4 pt-4 border-t border-gallery-200">
              <h3 className="text-xs uppercase tracking-widest text-gallery-900 font-bold flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-700" />
                <span>{artistSection.awardsHeading}</span>
              </h3>
              
              <div className="space-y-2.5">
                {artist.awards.map((award, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-gallery-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
