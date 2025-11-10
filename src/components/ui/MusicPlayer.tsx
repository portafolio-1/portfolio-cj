import { motion } from 'framer-motion';
import { Play, Pause, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false); // Empieza desmutado
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play al cargar la página
  useEffect(() => {
    const attemptAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.1; // Volumen al 10% para no molestar
        
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch((err) => {
    // Si el navegador bloquea el autoplay, intentar con interacción del usuario
    console.log('Autoplay bloqueado:', err.message);


            
            const handleInteraction = () => {
              if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    setIsMuted(false);
                  })
                  .catch(console.error);
              }
              // Remover listeners después de la primera interacción
              document.removeEventListener('click', handleInteraction);
              document.removeEventListener('keydown', handleInteraction);
            };

            document.addEventListener('click', handleInteraction, { once: true });
            document.addEventListener('keydown', handleInteraction, { once: true });
          });
      }
    };

    // Intentar reproducir después de un pequeño delay
    const timer = setTimeout(attemptAutoplay, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Error playing audio:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    
    if (!newMutedState && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/background-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Compact music controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-6 right-6 z-50 flex items-center gap-1.5"
      >
        {/* Play/Pause button */}
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 glass-card rounded-lg hover:text-cyan-400 text-slate-300 transition-all hover:scale-110 group"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
        </motion.button>

        {/* Mute button */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 glass-card rounded-lg transition-all hover:scale-110 group ${
            isMuted 
              ? 'text-slate-300 hover:text-cyan-400' 
              : 'text-cyan-400 hover:text-cyan-300'
          }`}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          <VolumeX className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </>
  );
}
