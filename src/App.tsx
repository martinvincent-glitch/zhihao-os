import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Zap, Send, Battery, Wifi, Cpu, Navigation, Crosshair, Aperture, 
  Wind, Trophy, Play, RotateCcw, ChevronLeft, ChevronRight, MapPin, Star, 
  Utensils, Coffee, ThumbsUp, Award, Scan, FlaskConical, FileText, Flame, 
  BookOpen, Database, Satellite, Eye, Moon, Rocket, Calendar, Gauge, 
  MessageCircle, Lock, Unlock, CheckCircle, Terminal, Wrench, CircuitBoard, 
  GraduationCap, Users, Timer, Brain, Search, Disc, School, Briefcase, 
  GitBranch, Layers, Code, Lightbulb, PenTool, UtensilsCrossed, History, HeartHandshake 
} from 'lucide-react';

// --- SVG Icons Components ---

const ROGLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className} fill="currentColor">
    <path d="M5,35 L30,10 C45,-5 65,-5 80,10 L95,25" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M15,45 C25,35 40,30 50,30 C60,30 75,35 85,45 L50,75 Z" />
    <circle cx="50" cy="45" r="8" fill="black" opacity="0.5" />
  </svg>
);

const NvidiaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50,10 C20,10 5,30 5,30 C5,30 20,20 50,20 C80,20 95,40 95,40 C95,40 80,10 50,10 Z" />
    <path d="M50,30 C30,30 15,45 15,45 C15,45 30,38 50,38 C70,38 85,55 85,55 C85,55 70,30 50,30 Z" />
    <path d="M50,50 C40,50 30,58 30,58 C30,58 40,55 50,55 C60,55 70,65 70,65 C70,65 60,50 50,50 Z" />
  </svg>
);

const TeslaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M10,20 L90,20 L50,50 Z" opacity="0.3"/>
    <path d="M20,15 L80,15 M50,15 L50,85" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M20,15 Q50,40 80,15" stroke="currentColor" strokeWidth="5" fill="none" />
  </svg>
);

// --- Sub-Components ---

const BrainWaves = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let dataPoints: number[] = Array(60).fill(50);
    let frameId = 0;

    const draw = () => {
      dataPoints.shift();
      const last = dataPoints[dataPoints.length - 1];
      const volatility = active ? 30 : 10;
      let next = last + (Math.random() - 0.5) * volatility;
      
      if (next > 95) next = 95;
      if (next < 5) next = 5;
      if (Math.random() < 0.05) next = active ? 90 : 70;

      dataPoints.push(next);
      
      // 手機自適應寬度
      if (canvas.parentElement) {
          canvas.width = canvas.parentElement.clientWidth;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = active ? '#ff0055' : '#00ffcc';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < dataPoints.length - 1; i++) {
        const x1 = (i / (dataPoints.length - 1)) * canvas.width;
        const y1 = canvas.height - (dataPoints[i] / 100) * canvas.height;
        const x2 = ((i + 1) / (dataPoints.length - 1)) * canvas.width;
        const y2 = canvas.height - (dataPoints[i+1] / 100) * canvas.height;
        if (i === 0) ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      frameId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [active]);

  return (
    <div className="w-full h-24 bg-black/60 rounded border border-gray-700 overflow-hidden relative mt-2">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-1 left-2 text-[10px] text-gray-400 font-mono flex items-center gap-1">
            <Brain size={10} /> 腦波活躍度 (BRAIN WAVES)
        </div>
        <div className={`absolute bottom-1 right-2 text-[10px] font-mono font-bold ${active ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
            {active ? 'HIGH LOAD' : 'NORMAL'}
        </div>
    </div>
  );
};

const AbilityRadar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stats = [
      { label: '專業技術', value: 1.0 },
      { label: '美食雷達', value: 0.95 },
      { label: '人體導航', value: 1.0 },
      { label: '極限駕駛', value: 0.9 },
      { label: '問題解決', value: 1.0 },
      { label: '領導魅力', value: 1.0 }
    ];

    const numSides = stats.length;
    const size = window.innerWidth < 768 ? 70 : 100; // 手機版縮小雷達圖
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angleStep = (Math.PI * 2) / numSides;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let level = 1; level <= 3; level++) {
        ctx.beginPath();
        for (let i = 0; i < numSides; i++) {
          const radius = (size / 3) * level;
          const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i < numSides; i++) {
        const x = centerX + size * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + size * Math.sin(i * angleStep - Math.PI / 2);
        ctx.moveTo(centerX, centerY); ctx.lineTo(x, y);
        const labelX = centerX + (size + 30) * Math.cos(i * angleStep - Math.PI / 2);
        const labelY = centerY + (size + 20) * Math.sin(i * angleStep - Math.PI / 2);
        ctx.fillStyle = '#4ade80';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(stats[i].label, labelX, labelY);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
      ctx.strokeStyle = '#facc15';
      const time = Date.now() / 500;
      stats.forEach((stat, i) => {
        const val = stat.value * (0.95 + 0.05 * Math.sin(time + i));
        const x = centerX + size * val * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + size * val * Math.sin(i * angleStep - Math.PI / 2);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath(); ctx.fill(); ctx.stroke();
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <div className="flex justify-center items-center py-4">
      <canvas ref={canvasRef} width={320} height={300} className="max-w-full"/>
    </div>
  );
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootText = [
    "INITIALIZING ZHIHAO_OS KERNEL v6.3...",
    "SYSTEM DATE OVERRIDE: 2026-01-19 [TARGET BIRTHDAY]",
    "LOADING LANGUAGE PACK: TRADITIONAL_CHINESE... [OK]",
    "CONNECTING TO SATELLITE NETWORK... [ESRI_WORLD_IMAGERY]",
    "LOADING DRIVER: NVIDIA_RTX_5090_TI [PROTOTYPE]... [OK]",
    "LOADING DRIVER: ROG_MATRIX_PLATINUM [FEARLESS_EYE]... [OK]",
    "LOADING MEMORY: LONG_TERM_CONNECTION_LOGS... [OK]",
    "ANALYZING LEADERSHIP METRICS... [S-CLASS]",
    "SYSTEM STATUS: BIRTHDAY MODE ENGAGED",
    "WELCOME, COMMANDER."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, index) => {
      delay += Math.random() * 500 + 200;
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (index === bootText.length - 1) setTimeout(onComplete, 1500);
      }, delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-start justify-end h-screen p-8 font-mono text-sm bg-black text-green-500 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="mb-1 animate-pulse">
          <span className="mr-2">{`>`}</span>{line}
        </div>
      ))}
      <div className="w-4 h-6 bg-green-500 animate-ping mt-2"></div>
    </div>
  );
};

const RacingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'pitting'>('start');
  const [score, setScore] = useState(0);
  const [overtakes, setOvertakes] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [nitroActive, setNitroActive] = useState(false);
  const [collisionEffect, setCollisionEffect] = useState(false);
  const [tireHealth, setTireHealth] = useState(100);
  const [tiresChanged, setTiresChanged] = useState([false, false, false, false]); 
  const [pidValues, setPidValues] = useState({p: 0, i: 0, d: 0});
  
  // 完整 F1 戰績數據
  const INITIAL_GRID = [
    { code: 'VER', color: '#3671C6', gap: 'LEADER', name: 'Max Verstappen' },
    { code: 'NOR', color: '#FF8000', gap: '+1.2s', name: 'Lando Norris' },
    { code: 'LEC', color: '#F91536', gap: '+3.4s', name: 'Charles Leclerc' },
    { code: 'HAM', color: '#6CD3BF', gap: '+5.1s', name: 'Lewis Hamilton' },
    { code: 'PIA', color: '#FF8000', gap: '+6.9s', name: 'Oscar Piastri' },
    { code: 'SAI', color: '#F91536', gap: '+8.1s', name: 'Carlos Sainz' },
    { code: 'ZHI', color: '#ff0000', gap: '+9.3s', name: 'Dr. Zhihao', isPlayer: true },
    { code: 'RUS', color: '#6CD3BF', gap: '+10.5s', name: 'George Russell' },
    { code: 'ALO', color: '#358C75', gap: '+12.2s', name: 'Fernando Alonso' },
    { code: 'PER', color: '#3671C6', gap: '+14.0s', name: 'Sergio Perez' },
  ];
  const [grid, setGrid] = useState(INITIAL_GRID);
  
  const tracks = [
    { name: "金門大獎賽", year: "2018", desc: "回憶起點", bgColor: "#2a2a2a", kerbColor: "#ffffff" }, 
    { name: "廈門國際賽道", year: "2018", desc: "跨海之旅", bgColor: "#222222", kerbColor: "#ff0000" }, 
    { name: "深圳電動大獎賽", year: "2019", desc: "科技之城", bgColor: "#1a1a1a", kerbColor: "#00ffcc" } 
  ];

  const playerLane = useRef(1);
  const rivals = useRef<any[]>([]);
  const speed = useRef(8);
  const scoreRef = useRef(0);
  const animationFrameId = useRef<number>(0);
  const rivalColors = ['#ff0000', '#ff8800', '#0000ff', '#cccccc', '#ff00ff'];

  const gameLoop = () => {
    if (gameState === 'pitting') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 手機自適應寬度優化
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = window.innerWidth < 768 ? 450 : container.clientHeight;
    }

    const laneWidth = canvas.width / 3;
    const CAR_WIDTH = canvas.width / 7.5;
    const CAR_HEIGHT = CAR_WIDTH * 1.8;

    speed.current = Math.min(speed.current + 0.005, nitroActive ? 25 : 18);
    setTireHealth(prev => Math.max(0, prev - (nitroActive ? 0.2 : 0.05)));
    scoreRef.current += speed.current;
    setScore(Math.floor(scoreRef.current / 100));

    if (Math.random() < 0.02) {
      const lane = Math.floor(Math.random() * 3);
      rivals.current.push({
        x: lane * laneWidth + laneWidth / 2 - CAR_WIDTH / 2,
        y: -150,
        color: rivalColors[Math.floor(Math.random() * rivalColors.length)],
        speed: speed.current * 0.6,
        passed: false
      });
    }

    rivals.current.forEach(r => r.y += (speed.current - r.speed));
    rivals.current = rivals.current.filter(r => r.y < canvas.height + 100);

    ctx.fillStyle = tracks[trackIndex].bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 繪製賽道邊緣
    const kerbSize = 60;
    const scrollY = (Date.now() * speed.current / 10) % (kerbSize * 2);
    for(let i = -kerbSize*2; i < canvas.height + kerbSize; i+=kerbSize) {
        ctx.fillStyle = Math.floor((i + scrollY) / kerbSize) % 2 === 0 ? '#cc0000' : tracks[trackIndex].kerbColor;
        ctx.fillRect(0, i + scrollY, 15, kerbSize);
        ctx.fillRect(canvas.width - 15, i + scrollY, 15, kerbSize);
    }

    // 繪製對手
    rivals.current.forEach(r => {
      ctx.fillStyle = r.color;
      ctx.roundRect(r.x, r.y, CAR_WIDTH, CAR_HEIGHT, 5);
      ctx.fill();
    });

    // 繪製玩家
    const playerX = playerLane.current * laneWidth + laneWidth / 2 - CAR_WIDTH / 2;
    const playerY = canvas.height - 130;
    ctx.fillStyle = '#00ffcc';
    ctx.shadowBlur = nitroActive ? 20 : 0;
    ctx.shadowColor = '#00ffff';
    ctx.roundRect(playerX, playerY, CAR_WIDTH, CAR_HEIGHT, 8);
    ctx.fill();
    ctx.shadowBlur = 0;

    animationFrameId.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState === 'playing') animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameState]);

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {gameState === 'start' && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6">
          <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-6">POLE POSITION</h2>
          <div className="grid grid-cols-3 gap-2 mb-8">
              {tracks.map((t, i) => (
                  <button key={i} onClick={() => setTrackIndex(i)} className={`p-2 border text-[10px] rounded ${trackIndex === i ? 'border-red-500 bg-red-900/30' : 'border-gray-700 text-gray-500'}`}>{t.name}</button>
              ))}
          </div>
          <button onClick={() => setGameState('playing')} className="bg-red-600 text-white px-12 py-4 rounded font-bold skew-x-[-10deg] shadow-[0_0_20px_red]">LIGHTS OUT</button>
        </div>
      )}

      {gameState === 'playing' && (
        <>
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
             <div className="bg-black/80 px-4 py-2 rounded border border-green-500/30 font-mono text-sm text-green-400">DIST: {score}M</div>
             <div className={`bg-black/80 px-4 py-2 rounded border font-mono text-sm ${tireHealth < 30 ? 'border-red-500 text-red-500 animate-pulse' : 'border-blue-400 text-blue-400'}`}>TYRE: {Math.floor(tireHealth)}%</div>
          </div>
          <div className="absolute bottom-4 left-0 w-full flex h-48 z-10">
            <div className="w-1/2 h-full" onClick={() => playerLane.current = Math.max(0, playerLane.current - 1)}></div>
            <div className="w-1/2 h-full" onClick={() => playerLane.current = Math.min(2, playerLane.current + 1)}></div>
          </div>
          <button 
            onClick={() => { if(!nitroActive) { setNitroActive(true); setTimeout(()=>setNitroActive(false), 3000); } }}
            className={`absolute bottom-8 right-8 w-16 h-16 rounded-full border-4 font-black italic text-[10px] flex items-center justify-center z-20 ${nitroActive ? 'bg-cyan-500 border-white text-black animate-pulse' : 'bg-black/50 border-cyan-500 text-cyan-500'}`}>NITRO</button>
        </>
      )}
    </div>
  );
};

const DroneView = () => {
  const [altitude, setAltitude] = useState(400);
  const [locIndex, setLocIndex] = useState(4);
  const [viewMode, setViewMode] = useState<'rgb' | 'thermal' | 'night'>('rgb');

  // 完整地標數據
  const locations = [
    { name: "金門 (Kinmen)", lat: 24.4400, lon: 118.3300, note: "大學回憶：相識之地" },
    { name: "廈門 (Xiamen)", lat: 24.4500, lon: 118.0800, note: "大學回憶：跨海之旅" },
    { name: "深圳 (Shenzhen)", lat: 22.5431, lon: 114.0579, note: "大學回憶：科技參訪" },
    { name: "台北 (Taipei)", lat: 25.0339, lon: 121.5644, note: "台北 101 信義區" },
    { name: "桃園 (Taoyuan)", lat: 25.0125, lon: 121.2980, note: "最強在地嚮導" },
    { name: "新竹 (Hsinchu)", lat: 24.7820, lon: 121.0000, note: "工程師集散地" },
    { name: "台中 (Taichung)", lat: 24.1618, lon: 120.6468, note: "國家歌劇院" },
    { name: "台南 (Tainan)", lat: 22.9997, lon: 120.2127, note: "古都美食巡禮" },
    { name: "高雄 (Kaohsiung)", lat: 22.6116, lon: 120.3000, note: "港都 85 大樓" },
  ];

  const currentLoc = locations[locIndex];
  const getSatelliteUrl = (lat: number, lon: number) => {
    const bbox = `${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}`;
    return `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export?bbox=${bbox}&bboxSR=4326&size=800,600&f=image`;
  };

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-gray-700">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" 
           style={{ backgroundImage: `url(${getSatelliteUrl(currentLoc.lat, currentLoc.lon)})`, 
                    transform: `scale(${1 + (800-altitude)/375})`,
                    filter: viewMode === 'thermal' ? 'hue-rotate(180deg) invert(1)' : viewMode === 'night' ? 'sepia(1) brightness(1.2) hue-rotate(100deg)' : 'none' }} />
      
      <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto">
            <div className="bg-black/60 p-2 rounded backdrop-blur-md border border-white/10 text-[10px] font-mono">
                <div className="text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> GPS LOCKED</div>
                <div className="mt-1">TARGET: {currentLoc.name}</div>
            </div>
            <div className="flex gap-2">
                <button onClick={()=>setViewMode('rgb')} className={`p-2 rounded ${viewMode==='rgb'?'bg-cyan-600':'bg-gray-800'}`}><Eye size={14}/></button>
                <button onClick={()=>setViewMode('thermal')} className={`p-2 rounded ${viewMode==='thermal'?'bg-red-600':'bg-gray-800'}`}><Flame size={14}/></button>
            </div>
        </div>

        <div className="flex justify-center gap-8 items-center pointer-events-auto">
            <button onClick={()=>setLocIndex(prev=>(prev>0?prev-1:locations.length-1))} className="p-4 bg-black/40 rounded-full hover:bg-black/60"><ChevronLeft/></button>
            <div className="text-center">
                <div className="text-xl font-bold text-white drop-shadow-lg">{currentLoc.name}</div>
                <div className="text-xs text-yellow-400 font-mono">{currentLoc.note}</div>
            </div>
            <button onClick={()=>setLocIndex(prev=>(prev<locations.length-1?prev+1:0))} className="p-4 bg-black/40 rounded-full hover:bg-black/60"><ChevronRight/></button>
        </div>

        <div className="flex justify-between items-end pointer-events-auto">
          <div className="bg-black/80 p-3 rounded-lg border border-gray-700">
            <div className="text-[10px] text-gray-400">ALTITUDE / ZOOM</div>
            <div className="text-xl font-bold text-cyan-400">{altitude}M</div>
            <input type="range" min="100" max="800" value={altitude} onChange={e => setAltitude(parseInt(e.target.value))} className="w-32 mt-2 accent-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsDashboard = () => (
  // 手機版自動堆疊優化
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto pb-24 md:pb-4 custom-scrollbar">
    <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 flex flex-col items-center">
      <h3 className="w-full text-left text-gray-400 font-mono text-[10px] mb-4 uppercase">生理狀態 (Physiological)</h3>
      <TeslaLogo className="w-24 h-24 text-blue-500 mb-6 animate-pulse" />
      <div className="grid grid-cols-2 gap-8 w-full text-center mb-6">
        <div><div className="text-3xl font-bold">36.8°C</div><div className="text-[10px] text-gray-500">核心溫度</div></div>
        <div><div className="text-3xl font-bold">100%</div><div className="text-[10px] text-gray-500">熱情指數</div></div>
      </div>
      <BrainWaves active={false} />
    </div>

    <div className="bg-black/60 rounded-2xl p-6 border border-gray-800 flex flex-col">
       <div className="text-purple-500 font-bold text-xs mb-4 flex items-center gap-2"><Activity size={16}/> 核心能力分析 (CAPABILITY)</div>
       <AbilityRadar />
    </div>

    <div className="md:col-span-2 bg-gray-800/40 rounded-2xl p-6 border border-gray-700">
       <div className="flex items-center gap-2 mb-6 text-yellow-500 font-bold text-sm"><Cpu size={18}/> 系統版本歷程 (LIFECYCLE)</div>
       <div className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/50 text-blue-400 font-bold text-xs">v1.0</div>
             <div className="flex-1">
                <div className="flex justify-between text-xs mb-1"><span>大學時期 (UNIVERSITY)</span><span className="text-green-500 font-mono">[COMPLETED]</span></div>
                <div className="text-[10px] text-gray-500 mb-2">基礎學科建構 • 社團活動 • 金門相識</div>
                <div className="w-full bg-gray-700 h-1 rounded overflow-hidden"><div className="w-full h-full bg-blue-500"></div></div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center border border-green-500/50 text-green-400 font-bold text-xs">v3.0</div>
             <div className="flex-1">
                <div className="flex justify-between text-xs mb-1"><span>工程師階段 (ENGINEER)</span><span className="text-yellow-500 font-mono animate-pulse">[RUNNING]</span></div>
                <div className="text-[10px] text-gray-500 mb-2">專案開發 • 技術落地 • 最強在地嚮導</div>
                <div className="w-full bg-gray-700 h-1 rounded overflow-hidden"><div className="w-1/3 h-full bg-green-500 animate-pulse"></div></div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

const HospitalityView = () => {
    // 完整技能晶片與互動
    const skills = [
        { name: "全端開發", icon: <Code size={16}/>, color: "text-blue-400", desc: "前後端通吃，架構大師" },
        { name: "硬體維修", icon: <CircuitBoard size={16}/>, color: "text-green-400", desc: "什麼板子都能修，焊槍之神" },
        { name: "美食偵測", icon: <UtensilsCrossed size={16}/>, color: "text-yellow-400", desc: "桃園在地美食資料庫" },
        { name: "創意無限", icon: <Lightbulb size={16}/>, color: "text-purple-400", desc: "點子王，解決方案產生器" },
        { name: "極限操作", icon: <PenTool size={16}/>, color: "text-red-400", desc: "在 Deadline 前一刻完美交付" },
        { name: "生活嚮導", icon: <MapPin size={16}/>, color: "text-cyan-400", desc: "跟著博士走，絕對不迷路" },
    ];

    return (
        <div className="h-full flex flex-col p-4 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-y-auto pb-24 md:pb-4 custom-scrollbar">
            <div className="text-center mb-8">
                <div className="inline-block p-4 rounded-full bg-yellow-500/20 border-2 border-yellow-500 mb-4 animate-bounce">
                    <Award className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">全能夥伴認證 (ALL-ROUNDER)</h2>
                <p className="text-gray-500 text-[10px] font-mono mt-1">VERIFIED BY MARTIN • LV.99 MASTER</p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border-l-4 border-yellow-500 mb-8">
                <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2"><Star size={16} /> 特別致謝</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    認識這麼久以來，從大學到現在，我們的互動從未間斷。感謝你展現出的卓越領導能力，總是在關鍵時刻給予方向；更感謝你過去經常熱心幫助，成為我最強大的後盾。
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
                {skills.map((s, i) => (
                    <div key={i} className="bg-black/40 p-3 rounded-lg border border-gray-700 flex flex-col gap-1">
                        <div className={s.color}>{s.icon}</div>
                        <div className="text-white font-bold text-xs">{s.name}</div>
                        <div className="text-[9px] text-gray-500 leading-tight">{s.desc}</div>
                    </div>
                ))}
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all">一鍵呼叫全能博士</button>
        </div>
    );
};

const MessageTab = () => {
  const [decrypted, setDecrypted] = useState(false);
  return (
    <div className="h-full overflow-y-auto pb-24 md:pb-4 custom-scrollbar">
      <div className="bg-black border border-gray-800 rounded-2xl p-8 relative overflow-hidden min-h-[450px] flex flex-col items-center justify-center">
        <ROGLogo className="absolute -top-10 -right-10 w-64 h-64 text-red-500/5 rotate-12" />
        <NvidiaLogo className="absolute -bottom-10 -left-10 w-48 h-48 text-green-500/5" />
        
        {!decrypted ? (
          <div className="text-center relative z-10">
            <Lock size={64} className="text-red-600 mx-auto mb-6 animate-pulse" />
            <p className="text-red-500 font-mono text-xs mb-8 uppercase tracking-[0.2em]">Encrypted Uplink Locked</p>
            <button onClick={() => setDecrypted(true)} className="bg-red-600 hover:bg-red-500 text-white px-12 py-5 font-bold rounded-none skew-x-[-10deg] flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,0,0,0.3)]">
              <Unlock size={24}/> DECRYPT UPLINK
            </button>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000 max-w-md relative z-10">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 italic tracking-tighter">HAPPY BIRTHDAY!</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed text-sm text-left border-l-2 border-gray-800 pl-6">
              <p>感謝你在我每次北上的時候擔任最強 <strong className="text-white underline decoration-yellow-500">桃園在地嚮導</strong>，撥出時間熱心招待。博士忙碌之餘也別忘了好好充電休息。</p>
              <p>祝你 <strong className="text-red-400 italic font-black">Pole Position</strong> 起步，在事業與生活上直線超車，一路領跑！工程師偶爾也要進站保養 (Pit Stop) 一下喔！</p>
            </div>
            <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
               <div className="text-left font-mono text-[10px] text-gray-500">
                  SENDER: MARTIN <br/> STATUS: TRANSMITTED
               </div>
               <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Application ---
const App = () => {
  const [booted, setBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'race' | 'drone' | 'hospitality' | 'message'>('dashboard');
  
  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden font-sans">
      {/* 響應式側邊導航欄 - 手機固定底部 */}
      <nav className="fixed bottom-0 left-0 w-full h-16 md:relative md:w-24 md:h-full bg-black/95 backdrop-blur-xl border-t md:border-t-0 md:border-r border-gray-800 flex md:flex-col justify-around items-center p-2 z-50">
        <div className="hidden md:block mb-10"><Zap className="text-yellow-400 w-10 h-10" /></div>
        <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-2xl transition-all ${activeTab==='dashboard'?'bg-blue-600 text-white shadow-[0_0_20px_blue]':'text-gray-500'}`}><Activity size={26}/></button>
        <button onClick={() => setActiveTab('race')} className={`p-3 rounded-2xl transition-all ${activeTab==='race'?'bg-red-600 text-white shadow-[0_0_20px_red]':'text-gray-500'}`}><Trophy size={26}/></button>
        <button onClick={() => setActiveTab('drone')} className={`p-3 rounded-2xl transition-all ${activeTab==='drone'?'bg-green-600 text-white shadow-[0_0_20px_green]':'text-gray-500'}`}><Aperture size={26}/></button>
        <button onClick={() => setActiveTab('hospitality')} className={`p-3 rounded-2xl transition-all ${activeTab==='hospitality'?'bg-yellow-600 text-white shadow-[0_0_20px_yellow]':'text-gray-500'}`}><Utensils size={26}/></button>
        <button onClick={() => setActiveTab('message')} className={`p-3 rounded-2xl transition-all ${activeTab==='message'?'bg-purple-600 text-white shadow-[0_0_20px_purple]':'text-gray-500'}`}><Send size={26}/></button>
        <div className="hidden md:block mt-auto pb-4"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /></div>
      </nav>

      <main className="flex-1 p-4 md:p-8 flex flex-col h-full overflow-hidden">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter text-white">ZHIHAO_OS <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded ml-2 border border-green-500/30">v6.3</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-1">System Status: Nominal</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:block text-right font-mono"><div className="text-[10px] text-gray-400">LOCATION</div><div className="text-[10px] text-green-500">TAOYUAN, TW</div></div>
             <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden shadow-2xl"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" /></div>
          </div>
        </header>

        <div className="flex-1 relative bg-gray-900/40 rounded-3xl border border-gray-800 p-4 md:p-6 overflow-hidden shadow-2xl mb-16 md:mb-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
          <div className="relative z-10 h-full">
            {activeTab === 'dashboard' && <StatsDashboard />}
            {activeTab === 'race' && <RacingGame />}
            {activeTab === 'drone' && <DroneView />}
            {activeTab === 'hospitality' && <HospitalityView />}
            {activeTab === 'message' && <MessageTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;