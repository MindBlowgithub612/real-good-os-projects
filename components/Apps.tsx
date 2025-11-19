
import React, { useState, useRef, useEffect } from 'react';

export const NotepadContent: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex space-x-2 p-1 bg-[#C0C0C0] text-sm border-b border-gray-400">
        <span>Fichier</span>
        <span>Edition</span>
        <span>Recherche</span>
        <span>Aide</span>
      </div>
      <textarea className="flex-grow w-full h-full p-1 font-mono resize-none outline-none border-none text-black" autoFocus />
    </div>
  );
};

export const PaintContent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>('black');
  const [tool, setTool] = useState<'pencil' | 'brush' | 'eraser'>('pencil');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // White background by default
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
  }, []);

  const getLineWidth = () => {
      switch(tool) {
          case 'pencil': return 1;
          case 'brush': return 6;
          case 'eraser': return 12;
          default: return 1;
      }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = getLineWidth();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? 'white' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
  }

  const colors = ['black', 'gray', 'maroon', 'olive', 'green', 'teal', 'navy', 'purple', 'white', 'silver', 'red', 'yellow', 'lime', 'aqua', 'blue', 'fuchsia'];

  return (
    <div className="h-full flex flex-col bg-[#C0C0C0] select-none">
      <div className="flex space-x-2 p-1 bg-[#C0C0C0] text-sm border-b border-gray-400 mb-1">
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Fichier</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Edition</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Affichage</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Image</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Couleurs</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Aide</span>
      </div>
      <div className="flex flex-grow overflow-hidden p-1 gap-1">
        <div className="w-10 bg-[#C0C0C0] flex flex-col gap-1 items-center pt-1">
             <button 
                className={`w-7 h-7 flex items-center justify-center text-lg ${tool === 'pencil' ? 'win98-inset bg-white' : 'win98-button'}`}
                onClick={() => setTool('pencil')}
                title="Crayon"
             >
                ✎
             </button>
             <button 
                className={`w-7 h-7 flex items-center justify-center text-lg ${tool === 'brush' ? 'win98-inset bg-white' : 'win98-button'}`}
                onClick={() => setTool('brush')}
                title="Pinceau"
             >
                🖌
             </button>
             <button 
                className={`w-7 h-7 flex items-center justify-center text-lg ${tool === 'eraser' ? 'win98-inset bg-white' : 'win98-button'}`}
                onClick={() => setTool('eraser')}
                title="Gomme"
             >
                ▧
             </button>
              <div className="h-1"></div>
             <button 
                className="w-7 h-7 flex items-center justify-center text-lg win98-button active:win98-inset"
                onClick={clearCanvas}
                title="Tout effacer"
             >
                🗑
             </button>
        </div>
        <div className="flex-grow bg-[#808080] win98-inset p-2 overflow-auto flex items-start justify-start">
             <canvas 
                ref={canvasRef}
                width={640}
                height={480}
                className="bg-white cursor-crosshair shadow-sm"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
             />
        </div>
      </div>
      <div className="h-12 bg-[#C0C0C0] border-t border-gray-400 flex items-center p-1 gap-2">
         <div className="w-8 h-8 win98-inset border-2 border-gray-400 bg-gray-200 flex items-center justify-center">
            <div className="w-6 h-6 border border-gray-800" style={{backgroundColor: color}}></div>
         </div>
         <div className="flex flex-wrap w-64 h-8 gap-px border border-gray-600 win98-inset bg-white">
            {colors.map(c => (
                <div 
                    key={c} 
                    style={{backgroundColor: c}} 
                    className="w-4 h-4 border-r border-b border-gray-100 cursor-pointer active:border-black"
                    onClick={() => setColor(c)}
                ></div>
            ))}
         </div>
      </div>
    </div>
  );
};

export const CalculatorContent: React.FC = () => {
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="h-full bg-[#C0C0C0] p-2 flex flex-col gap-2">
       <div className="bg-white win98-inset h-8 flex items-center justify-end px-2 font-mono text-xl">0</div>
       <div className="grid grid-cols-4 gap-1 flex-grow">
         <button className="win98-button text-red-800 col-span-2">C</button>
         <button className="win98-button text-red-800 col-span-2">CE</button>
         {buttons.map(btn => (
            <button key={btn} className="win98-button font-bold text-blue-800">{btn}</button>
         ))}
       </div>
    </div>
  );
};

export const MinesweeperContent: React.FC = () => {
  return (
    <div className="h-full bg-[#C0C0C0] flex flex-col border-2 border-white border-r-gray-500 border-b-gray-500 p-1">
        <div className="flex justify-between items-center mb-2 win98-inset bg-[#C0C0C0] p-1 border-2 border-gray-500 border-r-white border-b-white">
             <div className="bg-black text-red-600 font-mono text-xl px-1">010</div>
             <button className="win98-button w-8 h-8 bg-[#C0C0C0] flex items-center justify-center text-xl">🙂</button>
             <div className="bg-black text-red-600 font-mono text-xl px-1">999</div>
        </div>
        <div className="win98-inset border-4 border-gray-400 flex-grow bg-gray-400 grid grid-cols-9 gap-0">
            {Array.from({length: 81}).map((_, i) => (
                <div key={i} className="win98-button bg-[#C0C0C0] w-6 h-6"></div>
            ))}
        </div>
    </div>
  );
}

export const SolitaireContent: React.FC = () => {
    return (
        <div className="h-full bg-[#008000] p-4 relative font-mono">
            <div className="flex gap-4 mb-8">
                <div className="w-16 h-24 border border-black rounded bg-blue-800 opacity-50"></div>
                <div className="w-16 h-24 border border-black rounded bg-white flex items-center justify-center text-red-600 font-bold text-xl">A♥</div>
            </div>
             <div className="flex gap-4">
                {Array.from({length: 7}).map((_, i) => (
                     <div key={i} className="w-16 h-24 border border-black rounded bg-white flex flex-col items-center pt-2">
                         <div className="w-full h-2 bg-blue-800 mb-1"></div>
                          <div className="w-full h-2 bg-blue-800 mb-1"></div>
                          {i % 2 === 0 && <div className="w-full h-2 bg-blue-800"></div>}
                     </div>
                ))}
            </div>
        </div>
    )
}

export const MsDosContent: React.FC = () => {
    return (
        <div className="h-full bg-black text-gray-300 font-mono p-1 text-sm">
            <p>Microsoft(R) Windows 98</p>
            <p>(C)Copyright Microsoft Corp 1981-1998.</p>
            <br/>
            <p>C:\WINDOWS&gt;<span className="animate-pulse">_</span></p>
        </div>
    )
}

export const OutlookContent: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-white">
             <div className="flex space-x-2 p-1 bg-[#C0C0C0] text-sm border-b border-gray-400">
                <span>Fichier</span>
                <span>Edition</span>
                <span>Affichage</span>
                <span>Outils</span>
                <span>Message</span>
                <span>Aide</span>
            </div>
            <div className="flex flex-grow win98-inset m-1">
                <div className="w-32 bg-white border-r border-gray-400 p-1">
                    <div className="font-bold text-sm mb-2">Dossiers</div>
                    <ul className="text-sm space-y-1">
                        <li className="bg-[#000080] text-white px-1">Boîte de réception</li>
                        <li className="px-1">Boîte d'envoi</li>
                        <li className="px-1">Eléments envoyés</li>
                        <li className="px-1">Eléments supprimés</li>
                        <li className="px-1">Brouillons</li>
                    </ul>
                </div>
                <div className="flex-grow flex flex-col">
                     <div className="h-1/2 border-b border-gray-400 bg-white">
                         <table className="w-full text-xs text-left">
                             <thead className="bg-[#C0C0C0]">
                                 <tr>
                                     <th className="border border-gray-400 px-1">De</th>
                                     <th className="border border-gray-400 px-1">Objet</th>
                                     <th className="border border-gray-400 px-1">Reçu</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td className="px-1">Bill Gates</td>
                                     <td className="px-1">Bienvenue sur Windows 98</td>
                                     <td className="px-1">25/06/98</td>
                                 </tr>
                             </tbody>
                         </table>
                     </div>
                     <div className="flex-grow p-2 text-sm">
                        <p className="font-bold mb-2">De: Bill Gates</p>
                        <p>Bienvenue dans l'expérience Windows 98.</p>
                     </div>
                </div>
            </div>
        </div>
    )
}

export const XFramesContent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const vertices = [
      {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
      {x: -1, y: -1, z: 1}, {x: 1, y: -1, z: 1}, {x: 1, y: 1, z: 1}, {x: -1, y: 1, z: 1},
    ];
    const edges = [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ];

    let angleX = 0;
    let angleY = 0;

    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) / 4;

      angleX += 0.02;
      angleY += 0.03;

      const projected = vertices.map(v => {
        let x = v.x * Math.cos(angleY) - v.z * Math.sin(angleY);
        let z = v.x * Math.sin(angleY) + v.z * Math.cos(angleY);
        let y = v.y * Math.cos(angleX) - z * Math.sin(angleX);
        z = v.y * Math.sin(angleX) + z * Math.cos(angleX);

        const dist = 3;
        const zScale = scale / (dist - z);
        return { x: cx + x * zScale, y: cy + y * zScale };
      });

      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      edges.forEach(([s, e]) => {
        ctx.moveTo(projected[s].x, projected[s].y);
        ctx.lineTo(projected[e].x, projected[e].y);
      });
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-full bg-black flex flex-col font-mono">
      <div className="bg-[#000080] text-white p-1 font-bold flex justify-between text-sm">
        <span>X-FRAMES 3D BENCHMARK 1.0</span>
        <span>FPS: {fps}</span>
      </div>
      <div className="flex-grow relative win98-inset border-gray-600">
         <canvas ref={canvasRef} width={400} height={300} className="w-full h-full" />
      </div>
    </div>
  );
};
