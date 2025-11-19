
import React, { useState, useCallback } from 'react';
import { generateError } from '../services/geminiService';
import { ErrorIcon } from '../constants';

export const ErrorGeneratorContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [topic, setTopic] = useState<string>('l\'imprimante');
  const [error, setError] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Veuillez entrer un sujet.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedMessage('');
    try {
      const message = await generateError(topic);
      setGeneratedMessage(message);
    } catch (e: any) {
      setError(`Une erreur est survenue: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="p-4 bg-white win98-inset h-full flex flex-col">
      <div className="flex-grow">
        <label htmlFor="topic-input" className="text-lg">
          Sujet de l'erreur :
        </label>
        <input
          id="topic-input"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="win98-inset w-full p-1 my-2 text-lg"
          placeholder="Ex: la souris, internet, le café..."
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="win98-button bg-[#C0C0C0] px-6 py-1 text-lg disabled:opacity-50"
        >
          {isLoading ? 'Génération...' : 'Générer l\'erreur'}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {isLoading && (
          <div className="mt-4 text-lg">
            Consultation des archives de la micro-informatique...
          </div>
        )}
        
        {generatedMessage && (
          <div className="mt-6 flex space-x-4">
            <ErrorIcon className="w-16 h-16 flex-shrink-0" />
            <div className="text-lg space-y-2">
              {generatedMessage.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
        <div className="flex justify-center mt-4">
            <button className="win98-button bg-[#C0C0C0] px-8 py-1 text-lg" onClick={onClose} disabled={!onClose}>
              OK
            </button>
        </div>
    </div>
  );
};
