import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Zap, 
  Send, 
  Battery, 
  Wifi, 
  Cpu, 
  Navigation, 
  Crosshair, 
  Aperture,
  Wind,
  Trophy,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Utensils,
  Coffee,
  ThumbsUp,
  Award,
  Scan,
  FlaskConical,
  FileText,
  Flame,
  BookOpen,
  Database,
    Clapperboard,
  Satellite,
  Eye,
  Moon,
  Rocket,
  Calendar,
  Gauge,
  MessageCircle,
  Lock,
  Unlock,
  CheckCircle,
  Terminal,
  Wrench,
  CircuitBoard,
  GraduationCap,
  Users,
  Timer,
  Brain,
  Search,
  Disc,       
  School,     
  Briefcase,  
  GitBranch,  
  Layers,      
  Code,       
  Lightbulb,  
  PenTool,    
  UtensilsCrossed,
  History,    // Added for History/Time
  HeartHandshake // Added for Partnership/Help
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

// New Component: Brain Waves Graph
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2);
      ctx.moveTo(0, canvas.height/4); ctx.lineTo(canvas.width, canvas.height/4);
      ctx.moveTo(0, canvas.height*0.75); ctx.lineTo(canvas.width, canvas.height*0.75);
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
      
      ctx.shadowBlur = active ? 15 : 5;
      ctx.shadowColor = active ? '#ff0055' : '#00ffcc';
      
      frameId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [active]);

  return (
    <div className="w-full h-24 bg-black/60 rounded border border-gray-700 overflow-hidden relative mt-2">
        <canvas ref={canvasRef} className="w-full h-full block" width={300} height={100} />
        <div className="absolute top-1 left-2 text-[10px] text-gray-400 font-mono flex items-center gap-1">
            <Brain size={10} /> 腦波活躍度 (BRAIN WAVES)
        </div>
        <div className={`absolute bottom-1 right-2 text-[10px] font-mono font-bold ${active ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
            {active ? 'HIGH LOAD' : 'NORMAL'}
        </div>
    </div>
  );
};

// New Component: Ability Radar Chart
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
      { label: '領導魅力', value: 1.0 } // Maxed out leadership
    ];

    const numSides = stats.length;
    const size = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angleStep = (Math.PI * 2) / numSides;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let level = 1; level <= 3; level++) {
        ctx.beginPath();
        for (let i = 0; i < numSides; i++) {
          const radius = (size / 3) * level;
          const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw Axes & Labels
      ctx.beginPath();
      for (let i = 0; i < numSides; i++) {
        const x = centerX + size * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + size * Math.sin(i * angleStep - Math.PI / 2);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        
        const labelX = centerX + (size + 25) * Math.cos(i * angleStep - Math.PI / 2);
        const labelY = centerY + (size + 25) * Math.sin(i * angleStep - Math.PI / 2);
        ctx.fillStyle = '#4ade80';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(stats[i].label, labelX, labelY);
      }
      ctx.stroke();

      // Draw Stat Polygon
      ctx.beginPath();
      ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      
      const time = Date.now() / 500;
      stats.forEach((stat, i) => {
        const val = stat.value * (0.95 + 0.05 * Math.sin(time + i));
        const x = centerX + size * val * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + size * val * Math.sin(i * angleStep - Math.PI / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

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

// 1. Boot Sequence Animation
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootText = [
    "INITIALIZING ZHIHAO_OS KERNEL v6.3...",
    "SYSTEM DATE OVERRIDE: 2026-01-18 [TARGET BIRTHDAY]",
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
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 1500);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-start justify-end h-full p-8 font-mono text-sm bg-black text-green-500 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="mb-1 animate-pulse">
          <span className="mr-2">{`>`}</span>
          {line}
        </div>
      ))}
      <div className="w-4 h-6 bg-green-500 animate-ping mt-2"></div>
    </div>
  );
};

// 2. F1 Racing Game
const RacingGame = () => {
  // ... (Code for RacingGame remains exactly the same)
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

  const CAR_WIDTH = 52;
  const CAR_HEIGHT = 96;
  const playerLane = useRef(1);
  const rivals = useRef<{x: number, y: number, color: string, speed: number, passed: boolean}[]>([]);
  const particles = useRef<{x: number, y: number, length: number, speed: number, alpha: number}[]>([]);
  const speed = useRef(8);
  const scoreRef = useRef(0);
  const animationFrameId = useRef<number>(0);
  const nitroTimeout = useRef<NodeJS.Timeout | null>(null);
  const rivalColors = ['#ff0000', '#ff8800', '#0000ff', '#cccccc', '#ff00ff'];

  useEffect(() => {
      if (gameState !== 'playing') return;
      const interval = setInterval(() => {
          setGrid(prev => prev.map((driver, idx) => {
              if (idx === 0) return driver; 
              const currentGap = parseFloat(driver.gap.replace('+','').replace('s',''));
              const newGap = (currentGap + (Math.random() * 0.2 - 0.1)).toFixed(1);
              return { ...driver, gap: `+${newGap}s` };
          }));
      }, 2000);
      return () => clearInterval(interval);
  }, [gameState]);

  const updateLeaderboardPosition = () => {
      setGrid(prev => {
          const newGrid = [...prev];
          const playerIdx = newGrid.findIndex(d => d.isPlayer);
          if (playerIdx > 0) {
              const temp = newGrid[playerIdx];
              newGrid[playerIdx] = newGrid[playerIdx - 1];
              newGrid[playerIdx - 1] = temp;
              newGrid[playerIdx].gap = `+${(parseFloat(newGrid[playerIdx-1].gap.replace('+','')) + 0.5).toFixed(1)}s`; 
          }
          return newGrid;
      });
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setOvertakes(0);
    setTireHealth(100);
    setGrid(INITIAL_GRID);
    scoreRef.current = 0;
    speed.current = 8;
    rivals.current = [];
    particles.current = [];
    playerLane.current = 1;
    gameLoop();
  };

  const activateNitro = () => {
    if (gameState !== 'playing' || nitroActive || tireHealth < 10) return;
    setNitroActive(true);
    speed.current += 15;
    if (nitroTimeout.current) clearTimeout(nitroTimeout.current);
    nitroTimeout.current = setTimeout(() => {
        setNitroActive(false);
        speed.current = Math.max(8, speed.current - 15); 
    }, 2500); 
  };

  const enterPitStop = () => {
      setGameState('pitting');
      setTiresChanged([false, false, false, false]);
      speed.current = 0;
  };

  const performPitAction = (tireIndex: number) => {
      if (tiresChanged[tireIndex]) return;
      const newStatus = [...tiresChanged];
      newStatus[tireIndex] = true;
      setTiresChanged(newStatus);
      if (newStatus.every(t => t)) {
          setTimeout(() => {
              setTireHealth(100);
              setGameState('playing');
              speed.current = 8;
              gameLoop();
          }, 1500); 
      }
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handleInput = (direction: 'left' | 'right') => {
    if (gameState !== 'playing') return;
    if (direction === 'left' && playerLane.current > 0) playerLane.current -= 0.15; 
    if (direction === 'left' && playerLane.current > 0) playerLane.current -= 0.85; 
    if (direction === 'right' && playerLane.current < 2) playerLane.current += 0.85;
    playerLane.current = Math.max(0, Math.min(2, playerLane.current));
  };

  const drawRealisticCar = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, isPlayer: boolean) => {
      ctx.save();
      if (isPlayer) {
        const vibrationX = (Math.random() - 0.5) * (nitroActive ? 2 : 0.5);
        const vibrationY = (Math.random() - 0.5) * (nitroActive ? 2 : 0.5);
        ctx.translate(vibrationX, vibrationY);
      }
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.ellipse(x + CAR_WIDTH/2, y + CAR_HEIGHT/2 + 8, CAR_WIDTH/2 + 4, CAR_HEIGHT/2 + 4, 0, 0, Math.PI * 2);
      ctx.fill();

      const tireWidth = 16;
      const tireHeight = 26;
      const tireColor = '#1a1a1a';
      const drawTire = (tx: number, ty: number) => {
          if (isPlayer && speed.current > 15) {
             ctx.fillStyle = 'rgba(20,20,20,0.3)';
             ctx.fillRect(tx, ty + 10, tireWidth, 20); 
          }
          ctx.fillStyle = tireColor;
          ctx.beginPath();
          ctx.roundRect(tx, ty, tireWidth, tireHeight, 6);
          ctx.fill();
          if (isPlayer && tireHealth < 30) {
              ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
              ctx.fillRect(tx + 2, ty + 2, tireWidth - 4, tireHeight - 4);
          } else {
              const grad = ctx.createLinearGradient(tx, ty, tx + tireWidth, ty);
              grad.addColorStop(0, '#111'); grad.addColorStop(0.2, '#333'); grad.addColorStop(1, '#000');
              ctx.fillStyle = grad;
              ctx.fill();
          }
          ctx.fillStyle = isPlayer ? (nitroActive ? '#fff' : '#00ffcc') : '#888'; 
          ctx.beginPath();
          ctx.arc(tx + tireWidth/2, ty + tireHeight/2, 4, 0, Math.PI*2);
          ctx.fill();
      };
      drawTire(x - 8, y + 60); 
      drawTire(x + CAR_WIDTH - 8, y + 60); 
      drawTire(x - 6, y + 10); 
      drawTire(x + CAR_WIDTH - 10, y + 10); 

      ctx.strokeStyle = '#222'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x + CAR_WIDTH/2, y + 25); ctx.lineTo(x + 2, y + 20); ctx.moveTo(x + CAR_WIDTH/2, y + 25); ctx.lineTo(x + CAR_WIDTH - 2, y + 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + CAR_WIDTH/2, y + 65); ctx.lineTo(x + 2, y + 70); ctx.moveTo(x + CAR_WIDTH/2, y + 65); ctx.lineTo(x + CAR_WIDTH - 2, y + 70); ctx.stroke();

      const bodyGradient = ctx.createLinearGradient(x, y, x + CAR_WIDTH, y + CAR_HEIGHT);
      if (isPlayer) {
          bodyGradient.addColorStop(0, '#004d40'); bodyGradient.addColorStop(0.4, '#00bfa5'); bodyGradient.addColorStop(1, '#004d40');
      } else {
          bodyGradient.addColorStop(0, color); bodyGradient.addColorStop(1, '#000');
      }
      ctx.fillStyle = bodyGradient;
      ctx.fillRect(x - 2, y + 25, CAR_WIDTH + 4, 55); 
      ctx.beginPath(); ctx.moveTo(x + CAR_WIDTH/2, y); ctx.lineTo(x + CAR_WIDTH/2 + 6, y + 15); ctx.lineTo(x + CAR_WIDTH - 8, y + 35); ctx.lineTo(x + CAR_WIDTH - 4, y + 70); ctx.lineTo(x + CAR_WIDTH/2, y + 85); ctx.lineTo(x + 4, y + 70); ctx.lineTo(x + 8, y + 35); ctx.lineTo(x + CAR_WIDTH/2 - 6, y + 15); ctx.closePath(); ctx.fill();
      
      if (isPlayer) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x + 15, y + 40); ctx.lineTo(x + 25, y + 40); ctx.lineTo(x + 25, y + 60); ctx.stroke();
          ctx.fillStyle = '#111'; ctx.fillRect(x + 22, y + 45, 8, 8);
      }
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(x + 10, y + 38, 4, 8, 0.2, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + CAR_WIDTH - 10, y + 38, 4, 8, -0.2, 0, Math.PI*2); ctx.fill();

      ctx.fillStyle = isPlayer ? '#eee' : '#333'; 
      ctx.beginPath(); ctx.moveTo(x - 4, y + 5); ctx.lineTo(x + CAR_WIDTH + 4, y + 5); ctx.lineTo(x + CAR_WIDTH, y + 12); ctx.lineTo(x + CAR_WIDTH/2, y + 8); ctx.lineTo(x, y + 12); ctx.closePath(); ctx.fill();

      if (isPlayer) {
          ctx.fillStyle = '#ff0000'; 
          for(let i=0; i<5; i++) { ctx.beginPath(); ctx.arc(x + 8 + i * 9, y + 6, 1.5, 0, Math.PI*2); ctx.fill(); }
      }

      ctx.fillStyle = '#111'; ctx.fillRect(x + 2, y + 82, CAR_WIDTH - 4, 14);
      ctx.fillStyle = isPlayer ? '#00ffcc' : color; ctx.fillRect(x + 2, y + 84, CAR_WIDTH - 4, 4);
      ctx.fillStyle = '#fff'; ctx.fillRect(x + 1, y + 82, 2, 14); ctx.fillRect(x + CAR_WIDTH - 3, y + 82, 2, 14);

      ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.ellipse(x + CAR_WIDTH/2, y + 45, 7, 12, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = isPlayer ? '#fff' : color; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + CAR_WIDTH/2, y + 32); ctx.lineTo(x + CAR_WIDTH/2, y + 38); ctx.moveTo(x + CAR_WIDTH/2 - 6, y + 38); ctx.quadraticCurveTo(x + CAR_WIDTH/2, y + 48, x + CAR_WIDTH/2 + 6, y + 38); ctx.stroke();
      ctx.fillStyle = isPlayer ? '#ffcc00' : '#fff'; ctx.beginPath(); ctx.arc(x + CAR_WIDTH/2, y + 44, 5, 0, Math.PI*2); ctx.fill();

      if (Math.floor(Date.now() / 100) % 2 === 0) {
          ctx.fillStyle = '#ff0000'; ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 10; ctx.fillRect(x + CAR_WIDTH/2 - 3, y + 94, 6, 6); ctx.shadowBlur = 0; 
      }

      if (isPlayer && nitroActive) {
          ctx.globalCompositeOperation = 'lighter';
          const flameGrad = ctx.createLinearGradient(x, y + 96, x, y + 130);
          flameGrad.addColorStop(0, '#00ffff'); flameGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = flameGrad; ctx.beginPath(); ctx.moveTo(x + CAR_WIDTH/2 - 4, y + 96); ctx.lineTo(x + CAR_WIDTH/2 + 4, y + 96); ctx.lineTo(x + CAR_WIDTH/2, y + 130); ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
      }
      ctx.restore();
  };

  const gameLoop = () => {
    if (gameState === 'pitting') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const laneWidth = canvas.width / 3;

    if (!nitroActive) speed.current = Math.min(speed.current + 0.01, 20); 
    
    if (speed.current > 2) {
        setTireHealth(prev => Math.max(0, prev - (nitroActive ? 0.2 : 0.05)));
    }
    if (tireHealth < 20 && speed.current > 6) speed.current -= 0.1;

    const error = playerLane.current - 1;
    setPidValues({
        p: Math.floor(error * 100),
        i: Math.floor(scoreRef.current % 50),
        d: Math.floor((Math.random() - 0.5) * 20)
    });
    
    scoreRef.current += speed.current;
    setScore(Math.floor(scoreRef.current / 100));

    if (Math.random() < 0.02) { 
      const lane = Math.floor(Math.random() * 3);
      const tooClose = rivals.current.some(r => Math.abs(r.y + 150) < 100 && Math.abs((r.x + CAR_WIDTH/2) - (lane * laneWidth + laneWidth/2)) < 50);
      if (!tooClose) {
          rivals.current.push({
            x: lane * laneWidth + laneWidth / 2 - CAR_WIDTH / 2,
            y: -150,
            color: rivalColors[Math.floor(Math.random() * rivalColors.length)],
            speed: speed.current * 0.6,
            passed: false
          });
      }
    }

    rivals.current.forEach(r => {
        const relativeSpeed = speed.current - r.speed;
        r.y += relativeSpeed;
    });
    rivals.current = rivals.current.filter(r => r.y < canvas.height + 100);

    if (particles.current.length < 30) {
        particles.current.push({
            x: Math.random() * canvas.width,
            y: -50,
            length: Math.random() * 50 + 20,
            speed: Math.random() * 10 + speed.current,
            alpha: Math.random() * 0.5 + 0.1
        });
    }
    particles.current.forEach(p => {
        p.y += p.speed * (nitroActive ? 2 : 1);
        if (p.y > canvas.height) {
            p.y = -50;
            p.x = Math.random() * canvas.width;
        }
    });

    const playerX = playerLane.current * laneWidth + laneWidth / 2 - CAR_WIDTH / 2;
    const playerY = canvas.height - 200; 

    let collisionOccurred = false;

    rivals.current.forEach(rival => {
        if (!rival.passed && rival.y > playerY + CAR_HEIGHT) {
            rival.passed = true;
            setOvertakes(prev => prev + 1);
            updateLeaderboardPosition();
        }

        if (
            playerX < rival.x + CAR_WIDTH - 5 &&
            playerX + CAR_WIDTH > rival.x + 5 &&
            playerY < rival.y + CAR_HEIGHT - 5 &&
            playerY + CAR_HEIGHT > rival.y + 5
        ) {
            collisionOccurred = true;
            speed.current = Math.max(4, speed.current * 0.95);
            rival.y -= 10; 
        }
    });

    if (collisionOccurred) {
        setCollisionEffect(true);
        setTimeout(() => setCollisionEffect(false), 100);
    }

    ctx.fillStyle = tracks[trackIndex].bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#dddddd';
    ctx.fillRect(laneWidth * 1.5 - 5, 0, 10, canvas.height); 

    ctx.strokeStyle = `rgba(255, 255, 255, ${nitroActive ? 0.3 : 0.1})`;
    particles.current.forEach(p => {
        ctx.lineWidth = p.alpha * 3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length * (nitroActive ? 2 : 1));
        ctx.stroke();
    });

    const lineOffset = (Date.now() * speed.current * 0.8) % 120;
    const kerbSize = 80;
    const scrollY = (Date.now() * speed.current) % (kerbSize * 2);
    
    for(let i = -kerbSize*2; i < canvas.height + kerbSize; i+=kerbSize) {
        const isRed = Math.floor((i + scrollY) / kerbSize) % 2 === 0;
        ctx.fillStyle = isRed ? '#cc0000' : tracks[trackIndex].kerbColor;
        ctx.fillRect(0, i + scrollY, 25, kerbSize);
        ctx.fillRect(canvas.width - 25, i + scrollY, 25, kerbSize);
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 4;
    ctx.setLineDash([40, 60]);
    ctx.lineDashOffset = -lineOffset;
    ctx.beginPath();
    ctx.moveTo(laneWidth, 0); ctx.lineTo(laneWidth, canvas.height);
    ctx.moveTo(laneWidth * 2, 0); ctx.lineTo(laneWidth * 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    rivals.current.forEach(rival => {
        drawRealisticCar(ctx, rival.x, rival.y, rival.color, false);
    });

    drawRealisticCar(ctx, playerX, playerY, '#00ffcc', true);

    if (collisionEffect) {
        ctx.fillStyle = 'rgba(255, 50, 0, 0.3)';
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    if (nitroActive) {
        const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 600);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, 'rgba(0, 255, 255, 0.2)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    animationFrameId.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameState]);

  return (
    <div className={`relative w-full h-full bg-gray-900 rounded-lg overflow-hidden border transition-all duration-200 ${collisionEffect ? 'border-red-600 border-4' : (nitroActive ? 'border-cyan-400 shadow-[0_0_30px_cyan] scale-[1.01]' : 'border-red-900 shadow-[0_0_20px_rgba(255,0,0,0.3)]')}`}>
      {gameState !== 'pitting' && <canvas ref={canvasRef} className="w-full h-full block" />}
      
      {/* PIT STOP VIEW - Enhanced with Scene */}
      {gameState === 'pitting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
              <div className="absolute inset-0 bg-gray-800">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
                  <div className="absolute top-0 bottom-0 left-10 w-4 bg-[repeating-linear-gradient(45deg,#fbbf24,#fbbf24_10px,#000_10px,#000_20px)] opacity-50"></div>
                  <div className="absolute top-0 bottom-0 right-10 w-4 bg-[repeating-linear-gradient(45deg,#fbbf24,#fbbf24_10px,#000_10px,#000_20px)] opacity-50"></div>
              </div>

              <div className="text-5xl font-black text-yellow-500 mb-4 animate-pulse relative z-10 drop-shadow-md">PIT STOP</div>
              
              <div className="relative w-72 h-[450px] bg-gray-900/80 rounded-xl p-4 border-2 border-yellow-500/50 backdrop-blur-md shadow-2xl">
                  {/* Car SVG Representation */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-96 opacity-100">
                      <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-2xl">
                        <rect x="20" y="40" width="60" height="120" fill="#111" rx="5" />
                        <path d="M50 10 L60 40 L80 60 L80 140 L60 160 L50 190 L40 160 L20 140 L20 60 L40 40 Z" fill="url(#pitCarGradient)" />
                        <circle cx="50" cy="100" r="10" fill="#222" />
                        <circle cx="50" cy="100" r="5" fill="#ffcc00" />
                        <rect x="10" y="15" width="80" height="10" fill="#eee" rx="2" />
                        <rect x="20" y="170" width="60" height="15" fill="#111" />
                        <defs>
                          <linearGradient id="pitCarGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#004d40" />
                            <stop offset="50%" stopColor="#00bfa5" />
                            <stop offset="100%" stopColor="#004d40" />
                          </linearGradient>
                        </defs>
                      </svg>
                  </div>
                  
                  {/* 4 Tires Buttons with Crew Icons */}
                  <div className="absolute top-20 left-2">
                      <button 
                        onClick={() => performPitAction(0)} 
                        className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold transition-all transform active:scale-90 ${tiresChanged[0] ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 animate-pulse hover:bg-red-500'}`}
                      >
                          {tiresChanged[0] ? <CheckCircle size={24}/> : <Users size={20}/>}
                      </button>
                  </div>
                  <div className="absolute top-20 right-2">
                      <button 
                        onClick={() => performPitAction(1)} 
                        className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold transition-all transform active:scale-90 ${tiresChanged[1] ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 animate-pulse hover:bg-red-500'}`}
                      >
                          {tiresChanged[1] ? <CheckCircle size={24}/> : <Users size={20}/>}
                      </button>
                  </div>
                  <div className="absolute bottom-20 left-2">
                      <button 
                        onClick={() => performPitAction(2)} 
                        className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold transition-all transform active:scale-90 ${tiresChanged[2] ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 animate-pulse hover:bg-red-500'}`}
                      >
                          {tiresChanged[2] ? <CheckCircle size={24}/> : <Users size={20}/>}
                      </button>
                  </div>
                  <div className="absolute bottom-20 right-2">
                      <button 
                        onClick={() => performPitAction(3)} 
                        className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold transition-all transform active:scale-90 ${tiresChanged[3] ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 animate-pulse hover:bg-red-500'}`}
                      >
                          {tiresChanged[3] ? <CheckCircle size={24}/> : <Users size={20}/>}
                      </button>
                  </div>
              </div>
              
              <div className="mt-6 text-white font-mono text-center z-10 bg-black/60 p-4 rounded-xl border border-gray-600">
                  <div className="text-gray-400 text-xs mb-1">TEAM RADIO</div>
                  <div className="text-yellow-400 text-sm font-bold animate-pulse typing-effect">
                      "工程師忙碌之餘，也要記得進站休息保養喔！"
                  </div>
              </div>
              
              {tiresChanged.every(t=>t) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
                      <div className="text-6xl text-green-500 font-black italic tracking-tighter animate-[ping_0.5s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">
                          GO GO GO!
                      </div>
                  </div>
              )}
          </div>
      )}

      {/* NEW: F1 LIVE LEADERBOARD (LEFT SIDE) */}
      {gameState !== 'pitting' && (
      <div className="absolute top-16 left-4 z-20 hidden md:block">
          <div className="bg-black/80 rounded-t-lg border-b-2 border-red-600 px-3 py-1 flex items-center gap-2">
              <span className="text-white font-bold text-xs">F1 LIVE</span>
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-[2px] bg-black/40 p-[2px] rounded-b-lg backdrop-blur-sm">
              {grid.map((driver, index) => (
                  <div 
                    key={driver.code} 
                    className={`flex items-center text-xs h-6 w-48 rounded-sm overflow-hidden transition-all duration-500 ${driver.isPlayer ? 'bg-gray-800 border-l-2 border-white' : 'bg-black/70'}`}
                    style={{transform: `translateY(0)`}} 
                  >
                      <div className="w-6 text-center font-mono font-bold text-white bg-gray-900/80 h-full flex items-center justify-center">{index + 1}</div>
                      <div className="w-1 h-full" style={{backgroundColor: driver.color}}></div>
                      <div className={`flex-1 px-2 font-bold font-mono ${driver.isPlayer ? 'text-yellow-400' : 'text-white'}`}>{driver.code}</div>
                      <div className="w-14 text-right px-2 font-mono text-gray-400 text-[10px]">{index===0 ? 'INT' : driver.gap}</div>
                  </div>
              ))}
          </div>
      </div>
      )}

      {/* HUD RIGHT */}
      {gameState !== 'pitting' && (
      <>
        {/* PID moved slightly down to accommodate leaderboard on mobile if needed, though hidden on mobile above */}
        <div className="absolute bottom-4 left-4 z-10 hidden md:block">
            <div className="bg-black/80 text-white font-mono px-3 py-1 rounded border-l-4 border-purple-500">
                <div className="text-xs text-gray-400 flex items-center gap-1"><CircuitBoard size={10}/> PID</div>
                <div className="text-xs text-green-400">P:{pidValues.p} I:{pidValues.i} D:{pidValues.d}</div>
            </div>
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
            <div className="bg-black/80 text-green-400 font-mono px-4 py-2 rounded border border-green-500/30">
                <div className="text-xs text-gray-400">DISTANCE</div>
                <div className="text-xl font-bold">{score} M</div>
            </div>
            <div className={`bg-black/80 font-mono px-4 py-2 rounded border ${tireHealth < 30 ? 'border-red-500 text-red-500 animate-pulse' : 'border-blue-500/30 text-blue-400'}`}>
                <div className="text-xs text-gray-400">TYRES</div>
                <div className="text-xl font-bold">{Math.floor(tireHealth)}%</div>
            </div>
        </div>

        {/* PIT BUTTON */}
        {gameState === 'playing' && tireHealth < 100 && (
            <button 
                className={`absolute bottom-28 right-8 w-20 h-20 rounded-lg border-4 font-black text-xs flex flex-col items-center justify-center transition-all z-20 ${tireHealth < 40 ? 'bg-red-600 border-white text-white animate-bounce' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
                onClick={enterPitStop}
            >
                <Wrench size={20}/>
                <span>BOX BOX</span>
            </button>
        )}

        {gameState === 'playing' && (
            <button 
                className={`absolute bottom-8 right-8 w-20 h-20 rounded-full border-4 font-black italic text-xs flex items-center justify-center transition-all z-20 ${nitroActive ? 'bg-cyan-500 border-white text-black scale-110 shadow-[0_0_40px_cyan] animate-pulse' : 'bg-black/50 border-cyan-500 text-cyan-500 hover:bg-cyan-900/50'}`}
                onClick={activateNitro}
                disabled={nitroActive || tireHealth < 10}
            >
                {nitroActive ? 'MAX' : 'NITRO'}
            </button>
        )}
      </>
      )}

      {/* Start Overlay */}
      {gameState === 'start' && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 font-black italic tracking-tighter mb-4 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">POLE POSITION</h2>
          <div className="text-xs font-mono text-purple-400 mb-4 flex items-center gap-2"><CircuitBoard size={14}/> SMART CAR MODE ACTIVE</div>
          
          <div className="grid grid-cols-3 gap-2 mb-8">
              {tracks.map((t, i) => (
                  <button 
                    key={i}
                    onClick={() => setTrackIndex(i)}
                    className={`p-2 border ${trackIndex === i ? 'border-red-500 bg-red-900/30 text-white' : 'border-gray-700 text-gray-500'} text-xs font-mono rounded`}
                  >
                      {t.name}
                  </button>
              ))}
          </div>

          <button 
            onClick={startGame}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded skew-x-[-10deg] transition-all transform hover:scale-105 shadow-[0_0_20px_red]"
          >
            <Play size={24} /> <span className="skew-x-[10deg] font-bold text-xl">LIGHTS OUT</span>
          </button>
          <div className="mt-4 text-gray-500 font-mono text-xs">NO GAME OVER • PIT STOP ENABLED</div>
        </div>
      )}

      {/* Touch Controls (Invisible but functional) */}
      {gameState === 'playing' && (
        <div className="absolute bottom-0 w-full h-1/2 flex z-10">
           <div className="w-1/2 h-full" onClick={() => handleInput('left')}></div>
           <div className="w-1/2 h-full" onClick={() => handleInput('right')}></div>
        </div>
      )}
    </div>
  );
};

// 3. DJI Drone Interface
const DroneView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [altitude, setAltitude] = useState(400); 
  const [locIndex, setLocIndex] = useState(4);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'rgb' | 'thermal' | 'night'>('rgb');
  const [displayUrl, setDisplayUrl] = useState('');
  
  const locations = [
    { name: "金門 (Kinmen)", lat: 24.4400, lon: 118.3300, note: "大學回憶：相識之地", type: "uni" },
    { name: "廈門 (Xiamen)", lat: 24.4500, lon: 118.0800, note: "大學回憶：跨海之旅", type: "uni" },
    { name: "深圳 (Shenzhen)", lat: 22.5431, lon: 114.0579, note: "大學回憶：科技參訪", type: "uni" },
    { name: "台北 (Taipei)", lat: 25.0339, lon: 121.5644, note: "台北 101 信義區", type: "travel" },
    { name: "桃園 (Taoyuan)", lat: 25.0125, lon: 121.2980, note: "最強在地嚮導", type: "home" },
    { name: "新竹 (Hsinchu)", lat: 24.7820, lon: 121.0000, note: "工程師集散地", type: "tech" },
    { name: "苗栗 (Miaoli)", lat: 24.5602, lon: 120.8214, note: "山城風光", type: "travel" },
    { name: "台中 (Taichung)", lat: 24.1618, lon: 120.6468, note: "國家歌劇院", type: "travel" },
    { name: "台南 (Tainan)", lat: 22.9997, lon: 120.2127, note: "古都美食巡禮", type: "food" },
    { name: "高雄 (Kaohsiung)", lat: 22.6116, lon: 120.3000, note: "港都 85 大樓", type: "travel" },
  ];

  const currentLoc = locations[locIndex];

  const getSatelliteUrl = (lat: number, lon: number) => {
    const offsetLat = 0.008;
    const offsetLon = 0.012;
    const bbox = `${lon - offsetLon},${lat - offsetLat},${lon + offsetLon},${lat + offsetLat}`;
    return `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export?bbox=${bbox}&bboxSR=4326&size=800,600&f=image`;
  };

  const targetUrl = getSatelliteUrl(currentLoc.lat, currentLoc.lon);

  useEffect(() => {
    if (targetUrl !== displayUrl) {
        setLoading(true);
    }
  }, [targetUrl, displayUrl]);

  const changeLoc = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLocIndex(prev => (prev > 0 ? prev - 1 : locations.length - 1));
    } else {
      setLocIndex(prev => (prev < locations.length - 1 ? prev + 1 : 0));
    }
  };

  const scaleValue = 1 + (800 - altitude) / 375; 

  const getFilterStyle = () => {
      switch(viewMode) {
          case 'thermal': return 'contrast(1.2) hue-rotate(180deg) invert(1) saturate(1.5)';
          case 'night': return 'sepia(1) hue-rotate(100deg) contrast(1.2) brightness(1.2) saturate(0.8)';
          default: return 'none'; 
      }
  };

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden group border border-gray-700 bg-black">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
           backgroundImage: `url(${displayUrl})`,
           transform: `scale(${scaleValue})`,
           filter: getFilterStyle()
        }}
      />

      <img 
        src={targetUrl}
        alt="preload"
        className="hidden"
        onLoad={() => {
            setDisplayUrl(targetUrl);
            setLoading(false);
        }}
      />
      
      {loading && (
        <div className="absolute top-16 right-4 z-20">
             <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-cyan-500/30">
                 <Satellite className="text-cyan-400 animate-spin" size={14} />
                 <span className="text-cyan-400 font-mono text-[10px] animate-pulse">BUFFERING...</span>
             </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>

      <div className="absolute inset-0 p-2 md:p-4 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex justify-between items-center text-white font-mono text-xs drop-shadow-md bg-black/40 p-2 rounded backdrop-blur-md border border-white/10 pointer-events-auto">
                    <div className="flex-1 flex items-center justify-center gap-4">
                         <span className="px-2 py-1 rounded text-[10px] text-center bg-gradient-to-r from-blue-500 via-green-500 to-yellow-400 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]">Google Travel Map</span>
                         <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> GPS: LOCKED</span>
                         <span className="hidden md:inline">MODE: {viewMode.toUpperCase()}</span>
                         <span className="text-yellow-400">SAT: 24</span>
                    </div>
          
                    <div className="flex gap-2 flex-none">
             <button onClick={() => setViewMode('rgb')} className={`p-1 rounded ${viewMode === 'rgb' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`} title="RGB Camera"><Eye size={14}/></button>
             <button onClick={() => setViewMode('thermal')} className={`p-1 rounded ${viewMode === 'thermal' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'}`} title="Thermal Mode"><Flame size={14}/></button>
             <button onClick={() => setViewMode('night')} className={`p-1 rounded ${viewMode === 'night' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`} title="Night Vision"><Moon size={14}/></button>
          </div>
        </div>

        {/* Crosshair Center (Absolute Positioned for True Center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Crosshair className="text-white/80 w-32 md:w-56 h-32 md:h-56 drop-shadow-md" strokeWidth={0.5} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
            <div className="absolute top-[140px] left-1/2 transform -translate-x-1/2 text-center w-56">
                <div className="text-2xl font-bold text-white font-mono tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {currentLoc.name}
                </div>
                <div className="flex justify-center gap-2 mt-1 flex-wrap">
                    {currentLoc.type === 'uni' && (
                        <span className="text-yellow-400 font-mono text-[10px] bg-yellow-900/50 px-2 rounded flex items-center gap-1 border border-yellow-500/50">
                            <GraduationCap size={10} /> 大學回憶
                        </span>
                    )}
                    <span className="text-cyan-300 font-mono text-[10px] bg-black/50 px-1 rounded">LAT: {currentLoc.lat}</span>
                    <span className="text-cyan-300 font-mono text-[10px] bg-black/50 px-1 rounded">LON: {currentLoc.lon}</span>
                </div>
            </div>
        </div>

        {/* Navigation Arrows (Flanking the center crosshair) */}
        <button onClick={() => changeLoc('prev')} className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 p-3 md:p-5 hover:bg-black/40 rounded-full transition-all opacity-50 hover:opacity-100 hover:scale-110 z-30 pointer-events-auto">
            <ChevronLeft className="w-8 md:w-12 h-8 md:h-12 text-white drop-shadow-[0_0_10px_rgba(0,0,0,1)]" />
        </button>

        <button onClick={() => changeLoc('next')} className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 p-3 md:p-5 hover:bg-black/40 rounded-full transition-all opacity-50 hover:opacity-100 hover:scale-110 z-30 pointer-events-auto">
            <ChevronRight className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(0,0,0,1)]" />
        </button>

        <div className="flex justify-between items-end text-white font-mono pointer-events-auto">
           <div className="bg-black/60 p-3 rounded backdrop-blur-md border border-gray-700 min-w-[200px]">
             <div className="flex items-center gap-2 mb-1">
                 <Scan size={14} className="text-cyan-400"/>
                 <span className="text-xs text-gray-400">TARGET INTEL</span>
             </div>
             <div className="text-sm font-bold text-yellow-400 typing-effect">{currentLoc.note}</div>
           </div>

           <button 
             onClick={() => setIsRecording(!isRecording)}
             className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 ${isRecording ? 'bg-red-500/20' : 'bg-transparent'}`}
           >
             <div className={`rounded-full transition-all duration-300 ${isRecording ? 'w-6 h-6 bg-red-600 rounded-sm' : 'w-12 h-12 bg-red-500'}`}></div>
           </button>

           <div className="bg-black/60 p-3 rounded backdrop-blur-md border border-gray-700 text-right">
              <div className="text-xs text-gray-400 flex items-center justify-end gap-1">
                  ZOOM / ALTITUDE <Navigation size={10} className="transform -rotate-45"/>
              </div>
              <div className="text-2xl font-bold text-cyan-400 tabular-nums">{altitude}<span className="text-sm ml-1 text-white">M</span></div>
              <input 
                type="range" 
                min="50" max="800" 
                value={altitude} 
                onChange={(e) => setAltitude(parseInt(e.target.value))}
                className="w-32 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2 accent-cyan-400"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

// 4. Dashboard (Updated with Overclock)
const StatsDashboard = () => {
  const [overclocked, setOverclocked] = useState(false);
  const [scanActive, setScanActive] = useState(false);

  const startScan = () => {
      if (scanActive) return;
      setScanActive(true);
      setTimeout(() => setScanActive(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 h-full overflow-y-auto relative min-w-0 auto-rows-min px-1 md:px-0">
      {/* Scanning Effect Overlay */}
      {scanActive && (
          <div className="absolute inset-0 z-50 pointer-events-none">
              <div className="w-full h-full bg-green-500/10 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-green-400 shadow-[0_0_15px_#4ade80] animate-[scan_1.5s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 font-mono text-2xl font-bold bg-black/80 px-4 py-2 border border-green-500">
                  SYSTEM DIAGNOSTIC...
              </div>
          </div>
      )}

      {/* 1. System Health (Tesla Style with Overclock) */}
      <div className={`rounded-2xl p-6 border flex flex-col items-center justify-center relative transition-all duration-500 ${overclocked ? 'bg-red-900/30 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'bg-gray-800/50 border-gray-700'}`}>
        <h3 className="absolute top-4 left-4 text-gray-400 font-mono text-xs uppercase">生理狀態監測 (PHYSIOLOGICAL)</h3>
        
        <div className="absolute top-4 right-4 flex gap-2">
            {!overclocked && (
                <button 
                    onClick={startScan} 
                    className="bg-gray-700 text-xs px-2 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                    title="Run Diagnostics"
                >
                    <Search size={10}/> 系統診斷
                </button>
            )}
            {overclocked ? (
                <div className="text-red-500 font-bold font-mono animate-pulse text-xs">⚠️ 警告：過熱</div>
            ) : (
                <button 
                    onClick={() => setOverclocked(true)} 
                    className="bg-gray-700 text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                    一鍵超頻
                </button>
            )}
        </div>

        <div className="mt-10 text-[10px] text-gray-400 tracking-[0.25em] uppercase">Apple Care Health HUD</div>
        <div className="relative w-28 h-28 mb-4">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(#fa114f_0deg,#fa114f_220deg,transparent_220deg)] opacity-70"></div>
            <div className="absolute inset-2 rounded-full bg-[conic-gradient(#9cfc35_0deg,#9cfc35_200deg,transparent_200deg)] opacity-80"></div>
            <div className="absolute inset-4 rounded-full bg-[conic-gradient(#00d7fa_0deg,#00d7fa_240deg,transparent_240deg)] opacity-80"></div>
            <div className="absolute inset-6 rounded-full bg-black/80 border border-gray-700 flex items-center justify-center text-[10px] text-gray-300">Health</div>
        </div>

        <TeslaLogo className={`w-32 h-32 mb-4 transition-all duration-300 ${overclocked ? 'text-red-500 drop-shadow-[0_0_20px_red] animate-[spin_0.5s_linear_infinite]' : 'text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`} />
        
        <div className="grid grid-cols-2 gap-8 w-full">
            <div className="text-center">
                <div className={`text-3xl font-bold ${overclocked ? 'text-red-500' : 'text-white'}`}>{overclocked ? '98.5°C' : '36.8°C'}</div>
                <div className="text-xs text-gray-400">核心溫度 (CORE TEMP)</div>
            </div>
            <div className="text-center">
                <div className={`text-3xl font-bold ${overclocked ? 'text-red-500' : 'text-white'}`}>{overclocked ? '110%' : '100%'}</div>
                <div className="text-xs text-gray-400">熱情指數 (PASSION)</div>
            </div>
        </div>
        
        {/* Brain Activity Graph */}
        <BrainWaves active={overclocked} />

        <div className="text-xs text-green-400 mt-2 font-mono text-center">
            {overclocked ? '系統極限已突破。效能最大化。' : '系統運作正常。隨時準備迎接挑戰。'}
        </div>
        
        {overclocked && (
             <button onClick={() => setOverclocked(false)} className="mt-2 text-xs text-gray-400 underline hover:text-white">解除超頻 (Cooldown)</button>
        )}
      </div>

      {/* 2. Shared Memories */}
      <div className="bg-black rounded-2xl p-6 border border-gray-800 flex flex-col justify-between relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-20">
             <Database size={64} className="text-gray-500" /> 
         </div>
         
         <div className="flex justify-between items-center mb-4 relative z-10">
             <div className="flex items-center gap-2 text-purple-500 font-bold">
                 <Activity size={20} /> 共同記憶核心 (MEMORY)
             </div>
             <div className="text-xs text-gray-500">SINCE 2018</div>
         </div>
         
         <div className="flex justify-center items-center relative my-4">
            <div className={`w-40 h-40 rounded-full border-8 border-red-900 relative flex items-center justify-center ${overclocked ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}>
                <div className="absolute inset-0 rounded-full border-8 border-t-red-600 border-r-red-600 border-l-transparent border-b-transparent rotate-[120deg]"></div>
                
                <div className="w-28 h-28 rounded-full border-8 border-green-900 relative flex items-center justify-center">
                     <div className="absolute inset-0 rounded-full border-8 border-t-green-500 border-r-green-500 border-l-green-500 border-b-transparent rotate-[200deg]"></div>
                     
                     <div className="w-16 h-16 rounded-full border-8 border-blue-900 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-t-blue-400 border-r-blue-400 border-l-transparent border-b-transparent rotate-[300deg]"></div>
                     </div>
                </div>
            </div>
         </div>

         <div className="space-y-2 font-mono text-xs z-10">
             <div className="flex justify-between items-center text-red-400 cursor-help" title="那些熬夜做實驗的日子">
                 <span className="flex items-center gap-2"><FlaskConical size={14}/> 實驗室時光</span> 
                 <span>999+ HRS</span>
             </div>
             <div className="flex justify-between items-center text-green-400 cursor-help" title="一起拿下的冠軍獎盃">
                 <span className="flex items-center gap-2"><Trophy size={14}/> 自走車競賽</span> 
                 <span>RANK #1</span>
             </div>
             <div className="flex justify-between items-center text-blue-400 cursor-help" title="寫不完的報告與論文">
                 <span className="flex items-center gap-2"><FileText size={14}/> 結案報告</span> 
                 <span>Infinite</span>
             </div>
         </div>
      </div>

      {/* 3. Tech Stack & Life Cycle (New Section) */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 col-span-1 md:col-span-2">
         {/* Tech Domains */}
         <div className="mb-6">
             <div className="flex items-center gap-2 mb-4">
                 <Cpu className="text-yellow-500" />
                 <h3 className="text-white font-bold">核心技術模組 (CORE MODULES)</h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                 {/* EE */}
                 <div className="bg-black/40 p-3 rounded border border-gray-600 hover:bg-gray-700 transition-colors group">
                     <div className="flex items-center justify-between mb-2">
                         <span className="text-gray-400">電子電機</span>
                         <Zap size={16} className="text-yellow-400 group-hover:scale-110 transition-transform"/>
                     </div>
                     <div className="text-white font-bold">電路精通</div>
                     <div className="w-full bg-gray-700 h-1 mt-2 rounded"><div className="w-[95%] h-full bg-yellow-400 rounded"></div></div>
                 </div>
                 {/* Semi */}
                 <div className="bg-black/40 p-3 rounded border border-gray-600 hover:bg-gray-700 transition-colors group">
                     <div className="flex items-center justify-between mb-2">
                         <span className="text-gray-400">半導體</span>
                         <Disc size={16} className="text-cyan-400 group-hover:rotate-90 transition-transform"/>
                     </div>
                     <div className="text-white font-bold">製程掌握</div>
                     <div className="w-full bg-gray-700 h-1 mt-2 rounded"><div className="w-[90%] h-full bg-cyan-400 rounded"></div></div>
                 </div>
                 {/* CS */}
                 <div className="bg-black/40 p-3 rounded border border-gray-600 hover:bg-gray-700 transition-colors group">
                     <div className="flex items-center justify-between mb-2">
                         <span className="text-gray-400">資訊工程</span>
                         <Terminal size={16} className="text-green-400 group-hover:translate-x-1 transition-transform"/>
                     </div>
                     <div className="text-white font-bold">全端開發</div>
                     <div className="w-full bg-gray-700 h-1 mt-2 rounded"><div className="w-[98%] h-full bg-green-400 rounded"></div></div>
                 </div>
                 {/* AI */}
                 <div className="bg-black/40 p-3 rounded border border-gray-600 hover:bg-gray-700 transition-colors group">
                     <div className="flex items-center justify-between mb-2">
                         <span className="text-gray-400">AI 人工智慧</span>
                         <Brain size={16} className="text-purple-400 group-hover:pulse transition-transform"/>
                     </div>
                     <div className="text-white font-bold">模型優化</div>
                     <div className="w-full bg-gray-700 h-1 mt-2 rounded"><div className="w-[88%] h-full bg-purple-400 rounded"></div></div>
                 </div>
             </div>
         </div>

         {/* Life Cycle Timeline */}
         <div>
             <div className="flex items-center gap-2 mb-4">
                 <GitBranch className="text-blue-500" />
                 <h3 className="text-white font-bold">系統版本歷程 (SYSTEM LIFECYCLE)</h3>
             </div>
             <div className="space-y-4">
                 {/* University */}
                 <div className="flex items-center gap-4">
                     <div className="bg-blue-900/30 p-2 rounded-full border border-blue-500/50"><School size={16} className="text-blue-400"/></div>
                     <div className="flex-1">
                         <div className="flex justify-between text-xs mb-1">
                             <span className="text-white font-bold">v1.0 大學時期 (University)</span>
                             <span className="text-green-400 font-mono">[COMPLETED]</span>
                         </div>
                         <div className="text-gray-500 text-[10px]">基礎學科建構 • 社團活動 • 熱血青春</div>
                     </div>
                 </div>
                 {/* Graduate */}
                 <div className="flex items-center gap-4">
                     <div className="bg-purple-900/30 p-2 rounded-full border border-purple-500/50"><GraduationCap size={16} className="text-purple-400"/></div>
                     <div className="flex-1">
                         <div className="flex justify-between text-xs mb-1">
                             <span className="text-white font-bold">v2.0 研究所 (Graduate)</span>
                             <span className="text-green-400 font-mono">[DEFENDED]</span>
                         </div>
                         <div className="text-gray-500 text-[10px]">論文衝刺 • 實驗室熬夜 • 深度研究</div>
                     </div>
                 </div>
                 {/* Engineer */}
                 <div className="flex items-center gap-4">
                     <div className="bg-green-900/30 p-2 rounded-full border border-green-500/50"><Briefcase size={16} className="text-green-400"/></div>
                     <div className="flex-1">
                         <div className="flex justify-between text-xs mb-1">
                             <span className="text-white font-bold">v3.0 工程師 (Engineer)</span>
                             <span className="text-yellow-400 font-mono animate-pulse">[RUNNING...]</span>
                         </div>
                         <div className="text-gray-500 text-[10px]">專案開發 • 技術落地 • 社會歷練</div>
                         <div className="w-full bg-gray-700 h-1.5 mt-2 rounded overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-green-500 to-yellow-400 w-1/3 animate-[loading_3s_ease-in-out_infinite]"></div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* 4. Movie Night / Cinema Mode */}
    <div className="bg-black/60 rounded-2xl p-6 border border-gray-700 col-span-1 md:col-span-2 shadow-[0_0_20px_rgba(0,0,0,0.4)] min-w-0">
         <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-pink-400 font-bold">
                 <Clapperboard size={20} /> 電影時刻 (Cinema Mode)
             </div>
             <span className="text-[10px] font-mono text-gray-400">IMAX / Dolby Vision</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono min-w-0">
             <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <div className="text-gray-400 mb-1">片單 (Watchlist)</div>
                <div className="text-white">Top Gun: Maverick</div>
                <div className="text-white">Gran Turismo</div>
                <div className="text-white">The Martian</div>
             </div>
             <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <div className="text-gray-400 mb-2">模式 (Mode)</div>
                <div className="flex items-center gap-2 text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> RTX Film Grain Off
                </div>
                <div className="flex items-center gap-2 text-cyan-400 mt-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span> Atmos Spatial Audio
                </div>
             </div>
             <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <div className="text-gray-400 mb-2">進度 (Now Playing)</div>
                <div className="text-white font-bold mb-1">Movie Night Loading...</div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 w-[65%] animate-pulse"></div>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

// 5. Hospitality / Host Mode (Interactive) - Ensure Chinese text if any
const HospitalityView = () => {
    const [likes, setLikes] = useState(100);
    const [activeSkill, setActiveSkill] = useState<string | null>(null);
    const [helperStatus, setHelperStatus] = useState<string>('');

    const skills = [
        { name: "全端開發", icon: <Code size={16}/>, color: "text-blue-400", border: "border-blue-500/50", desc: "前後端通吃，架構大師" },
        { name: "硬體維修", icon: <CircuitBoard size={16}/>, color: "text-green-400", border: "border-green-500/50", desc: "什麼板子都能修，焊槍之神" },
        { name: "美食偵測", icon: <UtensilsCrossed size={16}/>, color: "text-yellow-400", border: "border-yellow-500/50", desc: "桃園在地美食資料庫" },
        { name: "創意無限", icon: <Lightbulb size={16}/>, color: "text-purple-400", border: "border-purple-500/50", desc: "點子王，解決方案產生器" },
        { name: "極限操作", icon: <PenTool size={16}/>, color: "text-red-400", border: "border-red-500/50", desc: "在 Deadline 前一刻完美交付" },
        { name: "生活嚮導", icon: <MapPin size={16}/>, color: "text-cyan-400", border: "border-cyan-500/50", desc: "跟著博士走，絕對不迷路" },
    ];

    const summonDrZhihao = () => {
        const scenarios = [
            "正在計算最佳路徑... [導航模式啟動]",
            "偵測到飢餓訊號... [搜尋在地美食]",
            "發現硬體故障... [拿起焊槍支援]",
            "專案進度告急... [全速 Coding 中]",
            "心情低落... [啟動垃圾話療癒模組]"
        ];
        const randomMsg = scenarios[Math.floor(Math.random() * scenarios.length)];
        setHelperStatus(`呼叫成功：${randomMsg}`);
        setTimeout(() => setHelperStatus(''), 3000);
    };

    return (
        <div className="h-full flex flex-col p-2 md:p-4 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-y-auto custom-scrollbar border border-yellow-500/20">
            <div className="text-center mb-4 relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/10 blur-3xl rounded-full"></div>
                
                <div className="inline-block p-3 rounded-full bg-yellow-500/20 border-2 border-yellow-500 mb-2 animate-[bounce_2s_infinite] relative z-10">
                    <Award className="w-12 h-12 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1 relative z-10">全能夥伴認證 (ALL-ROUNDER)</h2>
                <div className="text-gray-400 font-mono text-xs relative z-10">VERIFIED BY MARTIN • LV.99 MASTER</div>
            </div>

            {/* RADAR CHART */}
            <div className="bg-gray-800/40 rounded-xl border border-gray-700 relative mb-6">
                <div className="absolute top-2 left-2 text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Scan size={12}/> 能力分析 (CAPABILITY SCAN)
                </div>
                <AbilityRadar />
            </div>
            
            {/* NEW: Relationship Log Section */}
            <div className="bg-gray-800/40 p-4 rounded-xl border-l-4 border-yellow-500 mb-6">
                <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                    <Star size={16} /> 特別致謝 (ACKNOWLEDGEMENT)
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    認識這麼久以來，從大學到現在，我們的互動從未間斷。
                    <br/><br/>
                    感謝你展現出的卓越<span className="text-white font-bold">領導能力</span>，總是在關鍵時刻給予方向；
                    更感謝你過去經常<span className="text-white font-bold">熱心幫助</span>，成為我最強大的後盾。
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 bg-black/20 p-2 rounded">
                    <span>LINK_ESTABLISHED: 2018</span>
                    <span>STATUS: ACTIVE_SYNC</span>
                </div>
            </div>

            {/* NEW: Movie Memory Section */}
            <div className="bg-black/40 p-4 rounded-xl border-l-4 border-pink-500 mb-6">
                <h3 className="text-pink-400 font-bold mb-3 flex items-center gap-2">
                    <Clapperboard size={16} /> 電影回憶 (CINEMA MEMORIES)
                </h3>
                <div className="space-y-2 text-xs font-mono text-gray-300">
                    <div className="flex items-center justify-between bg-gray-900/60 p-2 rounded border border-pink-500/20">
                        <span>🎬 Top Gun: Maverick <span className="text-gray-500">(2022)</span></span>
                        <span className="text-pink-400">極速追夢</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/60 p-2 rounded border border-purple-500/20">
                        <span>🏎️ Gran Turismo <span className="text-gray-500">(2023)</span></span>
                        <span className="text-purple-400">賽道精神</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/60 p-2 rounded border border-cyan-500/20">
                        <span>🚀 The Martian <span className="text-gray-500">(2015)</span></span>
                        <span className="text-cyan-400">堅毅不屈</span>
                    </div>
                </div>
                <div className="mt-3 text-[10px] text-gray-500 italic text-center">
                    每一部電影都是我們共同的回憶，感謝你陪我欣賞每個精彩時刻。
                </div>
            </div>

            {/* SKILL MATRIX */}
            <div className="mb-6">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Cpu size={18} className="text-green-400"/> 技能晶片組 (SKILL CHIPS)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill) => (
                        <button
                            key={skill.name}
                            onClick={() => setActiveSkill(skill.desc)}
                            onBlur={() => setActiveSkill(null)}
                            className={`flex items-center gap-2 p-3 rounded-lg border bg-black/40 hover:bg-gray-800 transition-all ${skill.border} text-left group`}
                        >
                            <div className={`${skill.color} group-hover:scale-110 transition-transform`}>{skill.icon}</div>
                            <div>
                                <div className="text-white font-bold text-sm">{skill.name}</div>
                                <div className="text-[10px] text-gray-500 font-mono">MODULE_OK</div>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Skill Description Toast */}
                <div className="h-8 mt-2 flex items-center justify-center">
                    {activeSkill && (
                        <div className="text-cyan-400 text-xs font-mono animate-pulse bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-500/30">
                            &gt; {activeSkill}
                        </div>
                    )}
                </div>
            </div>

            {/* INTERACTIVE SUMMON */}
            <div className="bg-gray-800/60 p-4 rounded-xl border border-blue-500/30 text-center">
                <div className="text-blue-300 text-xs mb-2 font-mono">遇到困難了嗎？ (NEED BACKUP?)</div>
                <button 
                    onClick={summonDrZhihao}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    <Rocket size={20} className={helperStatus ? 'animate-bounce' : ''}/> 
                    {helperStatus ? '正在連線中...' : '一鍵呼叫全能博士'}
                </button>
                {helperStatus && (
                    <div className="mt-3 text-green-400 text-sm font-bold font-mono animate-[fadeIn_0.5s_ease-out] border-t border-gray-700 pt-2">
                        {helperStatus}
                    </div>
                )}
            </div>
            
            {/* FOOTER STATS */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div 
                    className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 flex flex-col items-center hover:border-yellow-500 transition-colors cursor-pointer"
                    onClick={() => setLikes(prev => prev + 1)}
                >
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        <ThumbsUp size={20} /> <span className="text-xl font-bold">{likes}</span>
                    </div>
                    <div className="text-gray-500 text-[10px]">好評推薦 (ENDORSEMENTS)</div>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 flex flex-col items-center">
                    <div className="text-xl font-bold text-white mb-1">∞</div>
                    <div className="text-gray-500 text-[10px]">潛力指數 (POTENTIAL)</div>
                </div>
            </div>
        </div>
    );
};

// 6. MessageTab (Keep existing)
const MessageTab = () => {
  const [decrypted, setDecrypted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [replyStatus, setReplyStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [confetti, setConfetti] = useState<{x:number, y:number, color: string}[]>([]);

  // Simulate Decryption
  const startDecryption = () => {
      let p = 0;
      const interval = setInterval(() => {
          p += 2;
          setProgress(p);
          if (p >= 100) {
              clearInterval(interval);
              setDecrypted(true);
          }
      }, 30);
  };

  // Simulate Reply Action
  const sendReply = (msg: string) => {
      if (replyStatus !== 'idle') return;
      setReplyStatus('sending');
      
      // Fire confetti
      const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff'];
      const newConfetti = Array.from({length: 30}).map(() => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setConfetti(newConfetti);

      setTimeout(() => {
          setReplyStatus('sent');
      }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar relative">
       {/* Confetti Layer */}
       {replyStatus !== 'idle' && confetti.map((c, i) => (
           <div 
             key={i} 
             className="absolute w-2 h-2 rounded-full animate-[ping_1s_ease-out_infinite]"
             style={{
                 left: `${c.x}%`,
                 top: `${c.y}%`,
                 backgroundColor: c.color,
                 animationDelay: `${Math.random()}s`
             }}
           />
       ))}

       <div className={`bg-black border p-8 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.1)] relative overflow-hidden transition-all duration-1000 ${decrypted ? 'border-green-500/30' : 'border-red-500/50'}`}>
          {/* UPDATED: ROG Logo with breathing effect */}
          <ROGLogo className={`absolute -top-10 -right-10 w-64 h-64 transition-all duration-1000 ${decrypted ? 'text-red-900/20 rotate-12' : 'text-red-500/10 grayscale'}`} />
          <NvidiaLogo className="absolute -bottom-10 -left-10 w-48 h-48 text-green-900/20" />
          
          <div className="relative z-10">
             
             {/* Header Section */}
             <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-all ${decrypted ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-800'}`}>
                    {decrypted ? 'Z' : <Lock size={24} />}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Dr. 志豪</h2>
                    <div className="flex gap-2 text-xs font-mono text-gray-400">
                        <span className="bg-gray-800 px-2 py-1 rounded text-red-400">ROG_ELITE</span>
                        <span className="bg-gray-800 px-2 py-1 rounded text-green-400">NVIDIA_DEV</span>
                        <span className="bg-gray-800 px-2 py-1 rounded text-blue-400">MECH_ENG</span>
                    </div>
                </div>
             </div>

             {/* Content Area */}
             {!decrypted ? (
                 <div className="flex flex-col items-center justify-center py-12 space-y-6">
                     <div className="text-red-500 font-mono text-center animate-pulse">
                         ⚠ 收到加密傳輸訊號<br/>內容已鎖定 (ENCRYPTED CONTENT LOCKED)
                     </div>
                     
                     {/* Decrypt Button */}
                     {progress === 0 ? (
                         <button 
                            onClick={startDecryption}
                            className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-none skew-x-[-10deg] font-bold flex items-center gap-2 group transition-all hover:scale-105"
                         >
                             <Unlock size={20} className="group-hover:rotate-12 transition-transform" /> 
                             <span className="skew-x-[10deg]">執行解碼 (DECRYPT)</span>
                         </button>
                     ) : (
                         <div className="w-full max-w-md space-y-2">
                             <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-green-500 transition-all duration-75" style={{width: `${progress}%`}}></div>
                             </div>
                             <div className="text-xs font-mono text-green-400 text-right">解碼中... {progress}%</div>
                             <div className="font-mono text-xs text-gray-500 h-16 overflow-hidden">
                                 {Array.from({length: 5}).map((_, i) => (
                                     <div key={i}>{Math.random().toString(36).substring(2)}... [OK]</div>
                                 ))}
                             </div>
                         </div>
                     )}
                 </div>
             ) : (
                 <div className="space-y-6 text-gray-300 leading-relaxed font-sans animate-[fadeIn_1s_ease-out]">
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
                        HAPPY BIRTHDAY!
                    </div>
                    
                    <p>
                        <span className="text-green-500 font-mono">{`>>>`}</span> 感謝你在我每次北上的時候擔任最強 <strong className="text-white">桃園在地嚮導</strong>，都撥出時間熱心招待。博士忙碌之餘，也別忘了好好充電休息。
                    </p>

                    <p>
                        <span className="text-red-500 font-mono">{`>>>`}</span> 祝你 <strong className="text-red-400 italic">Pole Position</strong> 起步，在事業與生活上直線超車，一路領跑！
                    </p>

                    <p className="bg-gray-900 p-4 rounded-r-xl border-l-4 border-yellow-500 italic text-gray-400">
                        <span className="block text-xs font-bold text-yellow-500 mb-1">SYSTEM ADVISORY:</span>
                        平常大腦高強度運轉，體力高負載，真的辛苦了。工程師偶爾也要 <span className="text-white font-bold">進站保養 (Pit Stop)</span> 一下喔。
                    </p>

                    <p className="text-gray-300 font-mono text-sm">
                        <span className="text-purple-400 font-mono">{`>>>`}</span> Best regards, Martin
                    </p>

                    {/* Interactive Footer */}
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm font-mono text-gray-500">
                                SENDER: <span className="text-white">Martin</span><br/>
                                TIME: 2026.01.18 UTC+8
                            </div>
                            {replyStatus === 'sent' ? (
                                <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full">
                                    <CheckCircle size={16} /> SIGNAL RECEIVED
                                </div>
                            ) : (
                                <div className="text-xs text-yellow-500 animate-pulse">等待回覆中 (AWAITING RESPONSE)...</div>
                            )}
                        </div>

                        {/* Reply Terminal */}
                        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                <Terminal size={12} /> 上傳訊號終端 (UPLINK TERMINAL)
                            </div>
                            
                            {replyStatus === 'idle' ? (
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => sendReply('ACK')} className="bg-gray-800 hover:bg-green-600 hover:text-white text-gray-300 px-4 py-2 rounded text-xs font-mono transition-colors">
                                        [ 收到 (ACK) ]
                                    </button>
                                    <button onClick={() => sendReply('ROGER')} className="bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-300 px-4 py-2 rounded text-xs font-mono transition-colors">
                                        [ 了解 (ROGER) ]
                                    </button>
                                    <button onClick={() => sendReply('THANKS')} className="bg-gray-800 hover:bg-purple-600 hover:text-white text-gray-300 px-4 py-2 rounded text-xs font-mono transition-colors">
                                        [ 感謝 (THANKS) ]
                                    </button>
                                </div>
                            ) : (
                                <div className="text-green-400 font-mono text-xs">
                                    {replyStatus === 'sending' ? '> 正在傳輸封包...' : '> 訊息已成功送達。'}
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
             )}
          </div>
       </div>
    </div>
  );
};


// --- Main Application ---

const App = () => {
  const [booted, setBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'race' | 'drone' | 'hospitality' | 'message'>('dashboard');

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-green-500 selection:text-black overflow-hidden flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-20 bg-black border-r border-gray-800 flex md:flex-col justify-between items-center p-4 z-50">
        <div className="hidden md:block mb-8">
           <Zap className="text-yellow-400 w-8 h-8" />
        </div>
        
        <div className="flex md:flex-col w-full md:w-auto justify-around md:gap-8 overflow-x-auto md:overflow-visible">
            <button 
                onClick={() => setActiveTab('dashboard')}
                className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-[0_0_15px_#2563eb]' : 'text-gray-500 hover:text-gray-300'}`}
                title="系統儀表板"
            >
                <Activity size={24} />
            </button>
            <button 
                onClick={() => setActiveTab('race')}
                className={`p-3 rounded-xl transition-all ${activeTab === 'race' ? 'bg-red-600 text-white shadow-[0_0_15px_#dc2626]' : 'text-gray-500 hover:text-gray-300'}`}
                title="F1 競速模式"
            >
                <Trophy size={24} />
            </button>
            <button 
                onClick={() => setActiveTab('drone')}
                className={`p-3 rounded-xl transition-all ${activeTab === 'drone' ? 'bg-green-600 text-white shadow-[0_0_15px_#16a34a]' : 'text-gray-500 hover:text-gray-300'}`}
                title="空拍導覽"
            >
                <Aperture size={24} />
            </button>
            <button 
                onClick={() => setActiveTab('hospitality')}
                className={`p-3 rounded-xl transition-all ${activeTab === 'hospitality' ? 'bg-yellow-600 text-white shadow-[0_0_15px_#ca8a04]' : 'text-gray-500 hover:text-gray-300'}`}
                title="最強嚮導認證"
            >
                <Utensils size={24} />
            </button>
            <button 
                onClick={() => setActiveTab('message')}
                className={`p-3 rounded-xl transition-all ${activeTab === 'message' ? 'bg-purple-600 text-white shadow-[0_0_15px_#9333ea]' : 'text-gray-500 hover:text-gray-300'}`}
                title="系統日誌 / 生日訊息"
            >
                <Send size={24} />
            </button>
        </div>

        <div className="hidden md:block mt-auto">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </nav>

      {/* Main Content Area */}
    <main className="flex-1 p-2 md:p-6 h-[calc(100vh-80px)] md:h-screen overflow-hidden flex flex-col min-w-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-2 md:mb-6 shrink-0">
            <div className="min-w-0">
                <h1 className="text-base md:text-2xl font-bold font-mono tracking-tighter truncate">ZHIHAO_OS <span className="text-[9px] md:text-xs text-green-500 bg-green-500/10 px-1 md:px-2 py-0.5 rounded">v6.3</span></h1>
                <p className="hidden md:block text-xs text-gray-500 uppercase tracking-widest">System Nominal</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end text-xs font-mono text-gray-400">
                    <span>TAOYUAN, TW</span>
                    <span className="text-green-400">ONLINE</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
                </div>
            </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 relative bg-gray-900/50 rounded-lg md:rounded-2xl border border-gray-800 overflow-hidden shadow-inner min-h-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
            
            <div className="relative z-10 h-full overflow-y-auto p-1 md:p-3">
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