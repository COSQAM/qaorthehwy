import { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import SpeakerCard from './SpeakerCard';

interface Link {
  title: string;
  url: string;
  linkType: string;
}

interface Speaker {
  id: string;
  fullName: string;
  tagLine: string;
  profilePicture: string;
  isTopSpeaker?: boolean;
  links?: Link[];
}

interface SpeakerCarouselProps {
  speakers: Speaker[];
}

export default function SpeakerCarousel({ speakers }: SpeakerCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const flickityRef = useRef<Flickity | null>(null);

  useEffect(() => {
    if (carouselRef.current && !flickityRef.current) {
      flickityRef.current = new Flickity(carouselRef.current, {
        cellAlign: 'left',
        contain: false,
        wrapAround: true,
        autoPlay: 3000,
        pauseAutoPlayOnHover: true,
        pageDots: true,
        prevNextButtons: false,
        freeScroll: true,
      });
    }

    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
        flickityRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={carouselRef} className="speaker-carousel">
      {speakers.map((speaker) => {
        const slug = speaker.fullName.toLowerCase().replace(/\s+/g, '-');
        return (
          <div key={speaker.id} className="carousel-cell w-full sm:w-1/2 lg:w-1/4 px-4">
            <SpeakerCard
              name={speaker.fullName}
              tagLine={speaker.tagLine}
              profilePicture={speaker.profilePicture}
              speakerSlug={slug}
            />
          </div>
        );
      })}
    </div>
  );
}
