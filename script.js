(function () {
  const logs = [];
  window.addLog = function (message) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    logs.push(`[${timestamp}] ${message}`);
    const logsContent = document.getElementById('logs-content');
    if (logsContent) {
      logsContent.innerText = logs.join('\n');
      logsContent.scrollTop = logsContent.scrollHeight;
    }
  };

  const sounds = {
    click: new Howl({
      src: ['https://cdn.pixabay.com/audio/2022/03/10/audio_4c8cf662d3.mp3'],
      volume: 0.2,
      onloaderror: () => {
        console.error('Failed to load click sound');
        addLog('Error: Failed to load click sound');
      }
    })
  };

  // Boot Sequence
  const bootCanvas = document.getElementById('boot-canvas');
  const bootCtx = bootCanvas.getContext('2d');
  bootCanvas.width = window.innerWidth;
  bootCanvas.height = window.innerHeight;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  const fontSize = 14;
  const columns = Math.floor(bootCanvas.width / fontSize);
  const drops = Array(columns).fill(0);

  function drawMatrix() {
    bootCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    bootCtx.fillRect(0, 0, bootCanvas.width, bootCanvas.height);
    bootCtx.fillStyle = '#00ff00';
    bootCtx.font = `${fontSize}px Courier New`;
    drops.forEach((y, i) => {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      bootCtx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > bootCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  const bootMessages = [
    '[INIT] VihaanOS v1.0.0 Booting...',
    '[OK] Loading Neural Core...',
    '[OK] Mounting Memory Filesystem...',
    '[OK] Initializing Hacker GUI...',
    '[OK] Connecting to Vihaan’s Mind...',
    '[INFO] Noice! System Ready. — Jake Peralta (*Brooklyn Nine-Nine*)'
  ];
  let currentMessage = 0;
  let currentChar = 0;
  const bootText = document.getElementById('boot-text');

  function typeBootMessage() {
    if (currentMessage < bootMessages.length) {
      const message = bootMessages[currentMessage];
      if (currentChar <= message.length) {
        bootText.innerText = bootMessages.slice(0, currentMessage).join('\n') + '\n' + message.slice(0, currentChar);
        currentChar++;
      } else {
        currentMessage++;
        currentChar = 0;
      }
    }
  }

  let bootInterval = setInterval(() => {
    drawMatrix();
    typeBootMessage();
  }, 50);

  setTimeout(() => {
    clearInterval(bootInterval);
    document.getElementById('boot-screen').style.display = 'none';
    document.getElementById('root').style.display = 'block';
    sounds.click.play();
    addLog('System booted');
  }, 6000);

  // Desktop Background Animation
  const canvas = document.getElementById('neural-net');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  let particleCount = 50;

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1
      });
    }
  }
  initParticles();

  let cursor = { x: -100, y: -100 };

  function drawNeuralNet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      const distToCursor = Math.hypot(p.x - cursor.x, p.y - cursor.y);
      if (distToCursor < 100) {
        ctx.strokeStyle = `rgba(0, 255, 0, ${1 - distToCursor / 100})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.stroke();
      }
    });
    particles.forEach((p, i) => {
      particles.forEach((p2, j) => {
        if (i < j) {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${1 - dist / 100})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    });
    requestAnimationFrame(drawNeuralNet);
  }
  drawNeuralNet();

  // Custom Cursor
  const cursorBar = document.createElement('div');
  cursorBar.className = 'cursor-bar';
  document.body.appendChild(cursorBar);
  const trails = [];

  function handlePointerMove(x, y) {
    cursor.x = x;
    cursor.y = y;
    cursorBar.style.left = `${x}px`;
    cursorBar.style.top = `${y - 8}px`;
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${x - 10}px`;
    trail.style.top = `${y}px`;
    document.body.appendChild(trail);
    trails.push(trail);
    if (trails.length > 5) {
      const oldTrail = trails.shift();
      oldTrail.remove();
    }
  }

  document.addEventListener('mousemove', e => {
    handlePointerMove(e.clientX, e.clientY);
  });
  document.addEventListener('touchmove', e => {
    e.preventDefault();
    const touch = e.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  }, { passive: false });
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  });

  // Mind Map Canvas
  const mindMapCanvas = document.getElementById('mind-map-canvas');
  const mindMapCtx = mindMapCanvas ? mindMapCanvas.getContext('2d') : null;
  if (mindMapCanvas) {
    mindMapCanvas.width = 760;
    mindMapCanvas.height = 400;
    const nodes = [
      { id: 'core', label: 'Vihaan', x: 380, y: 200, radius: 40 },
      { id: 'tech', label: 'Tech', x: 200, y: 100, radius: 30 },
      { id: 'law', label: 'Law', x: 200, y: 300, radius: 30 },
      { id: 'env', label: 'Environment', x: 560, y: 100, radius: 30 },
      { id: 'code', label: 'Coding', x: 100, y: 50, radius: 20, parent: 'tech' },
      { id: 'ai', label: 'AI', x: 100, y: 150, radius: 20, parent: 'tech' },
      { id: 'av', label: 'AVs', x: 100, y: 250, radius: 20, parent: 'law' },
      { id: 'ethics', label: 'Ethics', x: 100, y: 350, radius: 20, parent: 'law' },
      { id: 'sustain', label: 'Sustainability', x: 660, y: 50, radius: 20, parent: 'env' }
    ];
    function drawMindMap() {
      mindMapCtx.clearRect(0, 0, mindMapCanvas.width, mindMapCanvas.height);
      nodes.forEach(node => {
        if (node.parent) {
          const parent = nodes.find(n => n.id === node.parent);
          mindMapCtx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
          mindMapCtx.beginPath();
          mindMapCtx.moveTo(node.x, node.y);
          mindMapCtx.lineTo(parent.x, parent.y);
          mindMapCtx.stroke();
        }
      });
      nodes.forEach(node => {
        mindMapCtx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        mindMapCtx.beginPath();
        mindMapCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        mindMapCtx.fill();
        mindMapCtx.fillStyle = '#00ff00';
        mindMapCtx.font = `${node.radius / 2}px Courier New`;
        mindMapCtx.textAlign = 'center';
        mindMapCtx.textBaseline = 'middle';
        mindMapCtx.fillText(node.label, node.x, node.y);
      });
      requestAnimationFrame(drawMindMap);
    }
    drawMindMap();
    mindMapCanvas.addEventListener('click', e => {
      const rect = mindMapCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      nodes.forEach(node => {
        const dist = Math.hypot(x - node.x, y - node.y);
        if (dist < node.radius) {
          addLog(`Clicked mind map node: ${node.label}`);
          sounds.click.play();
          alert(`Node: ${node.label} — Jake Peralta (*Brooklyn Nine-Nine*)`);
        }
      });
    });
  }

  // Settings Panel
  const soundVolume = document.getElementById('sound-volume');
  const particleDensity = document.getElementById('particle-density');
  const terminalFontSize = document.getElementById('terminal-font-size');
  if (soundVolume) {
    soundVolume.addEventListener('input', () => {
      sounds.click.volume(soundVolume.value);
      addLog(`Set sound volume to ${soundVolume.value}`);
    });
  }
  if (particleDensity) {
    particleDensity.addEventListener('input', () => {
      particleCount = parseInt(particleDensity.value);
      initParticles();
      addLog(`Set particle density to ${particleCount}`);
    });
  }
  if (terminalFontSize) {
    terminalFontSize.addEventListener('input', () => {
      document.querySelector('.terminal-panel').style.fontSize = `${terminalFontSize.value}px`;
      addLog(`Set terminal font size to ${terminalFontSize.value}`);
    });
  }

  // Projects Filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.project').forEach(project => {
        const categories = project.getAttribute('data-category').split(' ');
        project.style.display = filter === 'all' || categories.includes(filter) ? 'block' : 'none';
      });
      sounds.click.play();
      addLog(`Filtered projects: ${filter}`);
    });
  });

  // Taskbar Clock
  function updateClock() {
    const now = new Date();
    document.getElementById('taskbar-clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Start Menu
  const startMenuBtn = document.getElementById('start-menu-btn');
  const startMenu = document.getElementById('start-menu');
  if (startMenuBtn) {
    startMenuBtn.addEventListener('click', () => {
      startMenu.classList.toggle('active');
      sounds.click.play();
      addLog('Toggled Start Menu');
    });
  }
  const startSearch = document.getElementById('start-search');
  if (startSearch) {
    startSearch.addEventListener('input', () => {
      const query = startSearch.value.toLowerCase();
      document.querySelectorAll('.start-menu-item').forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(query) ? 'block' : 'none';
      });
    });
  }

  // Window Management
  window.viewWindow = function(id) {
    sounds.click.play();
    const windowEl = document.getElementById(id);
    if (windowEl) {
      windowEl.classList.add('active');
      windowEl.style.zIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex || 10))) + 1;
      addLog(`Opened window: ${id}`);
    }
  }

  window.closeWindow = function(id) {
    sounds.click.play();
    document.getElementById(id).classList.remove('active');
    addLog(`Closed window: ${id}`);
  }

  // Window Dragging
  document.querySelectorAll('.window-header').forEach(header => {
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    
    function dragStart(e) {
        const windowEl = header.parentElement;
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;
        
        currentX = windowEl.offsetLeft;
        currentY = windowEl.offsetTop;

        isDragging = true;
        windowEl.style.zIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex || 10))) + 1;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            const newX = e.clientX || e.touches[0].clientX;
            const newY = e.clientY || e.touches[0].clientY;
            header.parentElement.style.left = `${currentX + newX - initialX}px`;
            header.parentElement.style.top = `${currentY + newY - initialY}px`;
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    header.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);
  });

  // Desktop Icon Click Handler
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const app = icon.id.split('-')[0];
      viewWindow(`${app}-window`);
    });
  });

  // Terminal Logic
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  if (terminalInput) {
    terminalInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        const historyItem = document.createElement('div');
        historyItem.textContent = `> ${cmd}`;
        terminalHistory.appendChild(historyItem);
        let response;
        switch (cmd) {
          case '--help':
            response = `
            VihaanOS CLI Help:
            - open <app>               : Opens an application (apps: projects, about, terminal, vihaancore, settings, logs)
            - run code <project>       : Shows project details (projects: unit-converter, number-guessing, legal-liability, water-sustainability, ai-ip, plastic-waste, ocean-cleanliness)
            - sys reboot              : Restarts the system
            - help                    : Displays basic help
            - --help                  : Shows this detailed command list
            — Patrick Jane (*The Mentalist*)
            `;
            break;
          case 'open projects':
            viewWindow('projects-window');
            response = 'Opening Projects... — Jake Peralta (*Brooklyn Nine-Nine*)';
            break;
          case 'open about':
            viewWindow('about-window');
            response = 'Loading README.md... — Phil Dunphy (*Modern Family*)';
            break;
          case 'open terminal':
            viewWindow('terminal-window');
            response = 'Already here, buddy! — Barney Stinson (*HIMYM*)';
            break;
          case 'open vihaancore':
            viewWindow('vihaancore-window');
            response = 'Accessing VihaanCore mind map... — Patrick Jane (*The Mentalist*)';
            break;
          case 'open settings':
            viewWindow('settings-window');
            response = 'Opening Settings... — Calvin (*Calvin and Hobbes*)';
            break;
          case 'open logs':
            viewWindow('logs-window');
            response = 'Opening System Logs... — Jake Peralta (*Brooklyn Nine-Nine*)';
            break;
          case 'run code unit-converter':
            response = 'Opening file: `unit_converter.py`\nRunning Tech Stack: PyQt5\nStatus: Complete — Calvin (*Calvin and Hobbes*)';
            launchProject('unit-converter');
            break;
          case 'run code number-guessing':
            response = 'Opening file: `number_guessing.py`\nRunning Tech Stack: Tkinter\nStatus: Complete — Jake Peralta (*Brooklyn Nine-Nine*)';
            launchProject('number-guessing');
            break;
          case 'run code legal-liability':
            response = 'Opening file: `legal_liability.md`\nRunning Tech Stack: Medium, Research\nStatus: Published — Patrick Jane (*The Mentalist*)';
            launchProject('legal-liability');
            break;
          case 'run code water-sustainability':
            response = 'Opening file: `water_sustainability.pdf`\nRunning Tech Stack: Research\nStatus: Published — Phil Dunphy (*Modern Family*)';
            launchProject('water-sustainability');
            break;
          case 'run code ai-ip':
            response = 'Opening file: `ai_ip.md`\nRunning Tech Stack: Research\nStatus: Published — Patrick Jane (*The Mentalist*)';
            launchProject('ai-ip');
            break;
          case 'run code plastic-waste':
            response = 'Opening file: `plastic_waste.md`\nRunning Tech Stack: Research\nStatus: Published — Calvin (*Calvin and Hobbes*)';
            launchProject('plastic-waste');
            break;
          case 'run code ocean-cleanliness':
            response = 'Opening file: `ocean_cleanliness.mp4`\nRunning Tech Stack: Video Editing\nStatus: Published — Jake Peralta (*Brooklyn Nine-Nine*)';
            launchProject('ocean-cleanliness');
            break;
          case 'sys reboot':
            currentMessage = 0;
            currentChar = 0;
            document.getElementById('boot-screen').style.display = 'block';
            document.getElementById('root').style.display = 'none';
            bootInterval = setInterval(() => {
              drawMatrix();
              typeBootMessage();
            }, 50);
            setTimeout(() => {
              clearInterval(bootInterval);
              document.getElementById('boot-screen').style.display = 'none';
              document.getElementById('root').style.display = 'block';
              addLog('System rebooted');
            }, 6000);
            response = 'Rebooting system... — Calvin (*Calvin and Hobbes*)';
            break;
          case 'help':
            response = 'Commands: open <app>, run code <project>, sys reboot, help, --help';
            break;
          default:
            response = `Command not found: ${cmd}. Try 'help' or '--help'. — Patrick Jane (*The Mentalist*)`;
            break;
        }
        const responseItem = document.createElement('div');
        responseItem.textContent = response;
        terminalHistory.appendChild(responseItem);
        terminalHistory.scrollTop = terminalHistory.scrollHeight;
        terminalInput.value = '';
        sounds.click.play();
        addLog(`Ran command: ${cmd}`);
      }
    });
  }
  
  function launchProject(project) {
    sounds.click.play();
    const urls = {
      'unit-converter': 'https://github.com/VihaanToTheRescue/Unit-Converter-Application',
      'number-guessing': 'https://github.com/VihaanToTheRescue/number-guessing-game',
      'legal-liability': 'https://medium.com/@vihaanaadira11/the-future-of-legal-liability-in-the-age-of-autonomous-vehicles-whos-really-responsible-5de1079b9cdd',
      'water-sustainability': 'https://www.ijraset.com/research-paper/assessing-the-impact-of-limited-access-on-irula-women-in-thethampakkam-pondicherry',
      'ai-ip': 'https://www.lawaudience.com/navigating-the-intersection-of-artificial-intelligence-and-intellectual-property-challenges-and-opportunities/',
      'plastic-waste': 'https://ijlsa.com/paper/plastic-waste-and-the-law-strengthening-epr-to-combat-indias-growing-crisis/',
      'ocean-cleanliness': 'https://www.youtube.com/watch?v=jhJhrAJoLzs'
    };
    if (urls[project]) {
      window.open(urls[project], '_blank');
      addLog(`Launched project: ${project}`);
    }
  }
})();