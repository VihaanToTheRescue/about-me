(function() {
    const splashDuration = 5000;
    const correctPassword = "vihaan2025";
    const messages = [
        "Techie. Law Enthusiast. Environmentalist.",
        "CLAT Aspirant and Coding Geek",
        "Saving the planet one byte at a time.",
        "Matrix Mind In A Legal World",
        "Digital Defender of Nature"
    ];
    const nameText = "Vihaan Sriram";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    let messageIndex = 0, messageCharIndex = 0, isTyping = true;
    let nameCharIndex = 0, isNameTyping = true;
    const typingElement = document.getElementById("typing");
    const headerName = document.getElementById("header-name");
    const passwordPrompt = document.getElementById("password-prompt");
    const passwordText = document.getElementById("password-text");
    const passwordInput = document.getElementById("password-input");
    const passwordStatus = document.getElementById("password-status");
    const hackingCode = document.getElementById("hacking-code");
    let isAuthenticated = false;
    const html = document.documentElement;

    // --- THEME INITIALIZATION (Defaults to dark, forces on each load) ---
    const FORCED_INITIAL_THEME = "dark";
    html.setAttribute("data-theme", FORCED_INITIAL_THEME);
    localStorage.setItem("theme", FORCED_INITIAL_THEME);
    const initialAppTheme = FORCED_INITIAL_THEME;

    // Hide main content initially
    const mainContentElements = document.querySelectorAll('.header, .section, .footer');
    mainContentElements.forEach(el => el.style.display = 'none');

    // Style password input to be functionally present but visually replaced by passwordText
    if (passwordInput) {
        passwordInput.style.color = 'transparent'; // Hides the typed text in the input field itself
        passwordInput.style.backgroundColor = 'transparent'; // Ensure its background is transparent
        passwordInput.style.border = 'none'; // Remove any border
        passwordInput.style.outline = 'none'; // Remove outline on focus
        passwordInput.style.caretColor = 'transparent'; // Hide the native caret
        // Adjust width/padding if necessary, or position it absolutely if passwordText is styled as the input box
        // For simplicity, assuming it's a sibling and these styles are enough.
        // You might need to wrap passwordText and passwordInput in a container and use absolute positioning
        // for passwordInput to sit "under" a styled passwordText if passwordText becomes the visual input box.
        // However, the current approach where passwordText includes "Enter Password: " label might work fine.
    }
    // Set initial state for passwordText
    if (passwordText) {
        passwordText.textContent = "Enter Password: ";
        passwordText.innerHTML += '<span class="cursor">_</span>';
    }


    function getRandomChar() {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function typePasswordGuess(element, targetText, currentIndex, callback) {
        const maxAttempts = 8;
        let attempts = 0;
        const fixedText = targetText.substring(0, currentIndex - 1);
        const currentChar = targetText[currentIndex - 1];

        function updateChar() {
            let displayChar = getRandomChar();
            if (attempts >= maxAttempts) displayChar = currentChar;
            try {
                if (element) {
                    element.innerHTML = fixedText + displayChar + `<span class="cursor">_</span>`;
                    element.setAttribute("data-text", fixedText + displayChar);
                }
            } catch (e) {
                console.error("DOM update error:", e);
            }
            if (attempts >= maxAttempts) {
                if (callback) callback();
            } else {
                attempts++;
                setTimeout(updateChar, 50);
            }
        }
        updateChar();
    }

    function deleteText(element, targetText, currentIndex, callback) {
        try {
            if (element) {
                element.innerHTML = targetText.substring(0, currentIndex) + `<span class="cursor">_</span>`;
                element.setAttribute("data-text", targetText.substring(0, currentIndex));
            }
        } catch (e) {
            console.error("DOM update error:", e);
        }
        if (callback) callback();
    }

    function typeWaveReveal(elementId, targetText, callback) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const charsArray = targetText.split("");
        element.innerHTML = charsArray.map(char => `<span style="opacity: 0">${char === ' ' ? ' ' : char}</span>`).join("");
        element.setAttribute("data-text", targetText);

        let index = 0;
        function revealChar() {
            if (index < charsArray.length) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) {
                    spans[index].style.animation = "rippleWave 0.5s ease forwards";
                    spans[index].style.opacity = "1";
                    index++;
                    setTimeout(revealChar, 100);
                }
            } else {
                if (callback) callback();
            }
        }
        revealChar();
    }

    function deleteWaveReveal(elementId, targetText, callback) {
        const element = document.getElementById(elementId);
        if (!element) return;
        let index = targetText.length - 1;

        function hideChar() {
            if (index >= 0) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) {
                    spans[index].style.animation = "";
                    spans[index].style.opacity = 0;
                    spans[index].style.transform = "translateY(20px) scale(0.8)";
                    index--;
                    setTimeout(hideChar, 100);
                }
            } else {
                if (element) {
                    element.innerHTML = "";
                    element.setAttribute("data-text", "");
                }
                if (callback) callback();
            }
        }
        hideChar();
    }

    function typeWaveFlow(elementId, targetText, callback) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const charsArray = targetText.split("");
        element.innerHTML = charsArray.map(char => `<span style="opacity: 0">${char === ' ' ? ' ' : char}</span>`).join("");
        element.setAttribute("data-text", targetText);

        let index = 0;
        function revealChar() {
            if (index < charsArray.length) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) {
                    spans[index].style.animation = "waveFlow 0.5s ease forwards";
                    spans[index].style.opacity = 1;
                    index++;
                    setTimeout(revealChar, 50);
                }
            } else {
                if (callback) callback();
            }
        }
        revealChar();
    }

    function deleteWaveFlow(elementId, targetText, callback) {
        const element = document.getElementById(elementId);
        if (!element) return;
        let index = targetText.length - 1;

        function hideChar() {
            if (index >= 0) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) {
                    spans[index].style.animation = "";
                    spans[index].style.opacity = 0;
                    spans[index].style.transform = "translateX(-100px) rotate(-45deg)";
                    index--;
                    setTimeout(hideChar, 50);
                }
            } else {
                if (element) {
                    element.innerHTML = "";
                    element.setAttribute("data-text", "");
                }
                if (callback) callback();
            }
        }
        hideChar();
    }

    function typeName() {
        if (!isAuthenticated || !headerName) return;
        const currentTheme = html.getAttribute("data-theme");
        if (currentTheme === "light") {
            typeWaveReveal("header-name", nameText, () => {
                setTimeout(() => {
                    deleteWaveReveal("header-name", nameText, () => {
                        setTimeout(typeName, 2000);
                    });
                }, 2000);
            });
        } else {
            if (isNameTyping && nameCharIndex < nameText.length) {
                nameCharIndex++;
                typePasswordGuess(headerName, nameText, nameCharIndex, () => {
                    if (nameCharIndex === nameText.length) {
                        isNameTyping = false;
                        setTimeout(typeName, 1000);
                    } else {
                        setTimeout(typeName, 100);
                    }
                });
            } else if (!isNameTyping && nameCharIndex > 0) {
                nameCharIndex--;
                deleteText(headerName, nameText, nameCharIndex, () => {
                    if (nameCharIndex === 0) {
                        isNameTyping = true;
                        setTimeout(typeName, 1000);
                    } else {
                        setTimeout(typeName, 150);
                    }
                });
            } else {
                isNameTyping = true;
                nameCharIndex = 0;
                setTimeout(typeName, 1000);
            }
        }
    }

    function typeMessage() {
        if (!isAuthenticated || !typingElement) return;
        const currentTheme = html.getAttribute("data-theme");
        const currentMessage = messages[messageIndex];
        if (currentTheme === "light") {
            typeWaveFlow("typing", currentMessage, () => {
                setTimeout(() => {
                    deleteWaveFlow("typing", currentMessage, () => {
                        messageIndex = (messageIndex + 1) % messages.length;
                        setTimeout(typeMessage, 2000);
                    });
                }, 4000);
            });
        } else {
            if (isTyping && messageCharIndex < currentMessage.length) {
                messageCharIndex++;
                typePasswordGuess(typingElement, currentMessage, messageCharIndex, () => {
                    if (messageCharIndex === currentMessage.length) {
                        isTyping = false;
                        setTimeout(typeMessage, 1000);
                    } else {
                        typeMessage();
                    }
                });
            } else if (!isTyping && messageCharIndex > 0) {
                messageCharIndex--;
                deleteText(typingElement, currentMessage, messageCharIndex, () => {
                    if (messageCharIndex === 0) {
                        isTyping = true;
                        messageIndex = (messageIndex + 1) % messages.length;
                        setTimeout(typeMessage, 1000);
                    } else {
                        setTimeout(typeMessage, 150);
                    }
                });
            } else {
                isTyping = true;
                messageIndex = (messageIndex + 1) % messages.length;
                messageCharIndex = 0;
                setTimeout(typeMessage, 1000);
            }
        }
    }

    function startMainContent() {
        document.body.style.overflow = "auto";
        mainContentElements.forEach(el => el.style.display = '');
        if (headerName) {
            headerName.innerHTML = Array(nameText.length).fill(0).map(() => `<span style="opacity: 1">${getRandomChar()}</span>`).join('');
            setTimeout(typeName, 500);
        }
        if (typingElement) {
            setTimeout(typeMessage, 750);
        }
    }

    function createMatrixEffect(canvasId, isSplash = false) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let animationFrameId;

        function resizeCanvas() {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            columns = Math.floor(canvas.width / fontSize / (isMobile ? 1.5 : 1));
            drops = Array(columns).fill(0);
        }

        const isMobile = window.innerWidth <= 768;
        const fontSize = isMobile ? 12 : 14;
        let columns, drops;
        resizeCanvas();

        function draw() {
            ctx.fillStyle = isSplash ? "rgba(26, 26, 26, 0.05)" : "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const currentTheme = html.getAttribute("data-theme");
            const tempTheme = html.getAttribute("data-theme-temp");
            let accentColor = "#4ade80";
            if (currentTheme === "red" || tempTheme === "dark-to-red") accentColor = "#ff0000";
            else if (currentTheme === "light" && tempTheme === "light") accentColor = "#ff9999";
            else if (currentTheme === "light") accentColor = "#8e24aa";

            ctx.fillStyle = accentColor;
            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * fontSize * (isMobile ? 1.5 : 1);
                const y = drops[i] * fontSize;
                ctx.fillText(text, x, y);
                if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        }

        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        draw();
        window.addEventListener("resize", resizeCanvas);
    }

    function createWaveEffect(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let animationFrameId;

        let time = 0;
        const waveSpeed = 0.02; // Slower wave speed
        let waveHeight, waveLength;

        function resizeCanvas() {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            waveHeight = canvas.height / 4;
            waveLength = canvas.width / 4;
        }
        resizeCanvas();

        function drawWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const currentTheme = html.getAttribute("data-theme");
            let accentRGB = getComputedStyle(html).getPropertyValue('--accent-rgb').trim();
            if (currentTheme === "red") accentRGB = "255, 0, 0";
            ctx.fillStyle = `rgba(${accentRGB}, 0.3)`;
            ctx.beginPath();

            for (let x = 0; x <= canvas.width; x += 5) {
                const y = canvas.height * 0.7 + Math.sin((x / waveLength + time)) * waveHeight;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();

            time += waveSpeed;
            animationFrameId = requestAnimationFrame(drawWave);
        }
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        drawWave();
        window.addEventListener("resize", resizeCanvas);
    }

    function createWaveTransition(canvasId, callback) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        let progress = 0;
        const duration = 1.5;
        canvas.startTime = null;

        function drawTransition(currentTime) {
            if (!canvas.startTime) canvas.startTime = currentTime;
            const elapsed = (currentTime - canvas.startTime) / 1000;
            progress = Math.min(elapsed / duration, 1);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = `rgba(${getComputedStyle(html).getPropertyValue('--accent-rgb').trim()}, 0.8)`;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 5) {
                const y = canvas.height * (1 - progress) + Math.sin((x / (canvas.width / 5)) + progress * 5) * (canvas.height / 4);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();

            if (progress < 1) {
                requestAnimationFrame(drawTransition);
            } else {
                canvas.style.display = "none";
                canvas.startTime = null;
                if (callback) callback();
            }
        }
        requestAnimationFrame(drawTransition);
        window.addEventListener("resize", () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        });
    }

    function createMatrixPasswordTransition(canvasId, callback) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        let progress = 0;
        const duration = 1.5;
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(0);
        canvas.startTime = null;

        function drawTransition(currentTime) {
            if (!canvas.startTime) canvas.startTime = currentTime;
            const elapsed = (currentTime - canvas.startTime) / 1000;
            progress = Math.min(elapsed, duration) / duration;

            ctx.fillStyle = `rgba(26, 26, 26, ${progress})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = `rgba(74, 222, 128, ${progress})`;
            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < columns; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                ctx.fillText(text, x, y);
                if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }

            if (progress < 1) {
                requestAnimationFrame(drawTransition);
            } else {
                canvas.style.display = "none";
                canvas.startTime = null;
                if (callback) callback();
            }
        }
        requestAnimationFrame(drawTransition);
        window.addEventListener("resize", () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(0);
        });
    }

    // NEW: Password cracking reveal animation
    function revealPasswordCharByChar(displayElement, actualInputElement, targetPassword, finalCallback) {
        if (!displayElement || !actualInputElement) return;
        let currentRevealedPassword = "";
        let charRevealIndex = 0;
        const maxAttemptsPerChar = 8; // How many random chars before settling on the correct one
        const randomCharCycleSpeed = 50; // ms per random character
        const interCharRevealDelay = 100; // ms between revealing one char and starting the next

        displayElement.textContent = "Enter Password: "; // Initial clear

        function revealNextChar() {
            if (charRevealIndex < targetPassword.length) {
                const targetChar = targetPassword[charRevealIndex];
                let attempts = 0;

                function animateCharReveal() {
                    if (attempts < maxAttemptsPerChar) {
                        const randomChar = getRandomChar();
                        displayElement.innerHTML = `Enter Password: ${currentRevealedPassword}${randomChar}<span class="cursor">_</span>`;
                        attempts++;
                        setTimeout(animateCharReveal, randomCharCycleSpeed);
                    } else {
                        currentRevealedPassword += targetChar;
                        displayElement.innerHTML = `Enter Password: ${currentRevealedPassword}<span class="cursor">_</span>`;
                        actualInputElement.value = currentRevealedPassword; // Update the actual input field progressively

                        charRevealIndex++;
                        setTimeout(revealNextChar, interCharRevealDelay);
                    }
                }
                animateCharReveal();
            } else {
                // All characters revealed
                displayElement.innerHTML = `Enter Password: ${currentRevealedPassword}<span class="cursor">_</span>`;
                actualInputElement.value = targetPassword; // Ensure full password is set
                if (finalCallback) finalCallback();
            }
        }
        revealNextChar();
    }


    function createHackingShow() {
        if (!hackingCode || !passwordText || !passwordInput || !passwordStatus || !passwordPrompt) return;

        const originalThemeBeforeHack = localStorage.getItem("theme") || FORCED_INITIAL_THEME;
        html.setAttribute("data-theme", "red"); // Temporary red theme for hacking

        const codeLines = [
            "SYSTEM ALERT: UNAUTHORIZED ACCESS ATTEMPT!",
            "INITIATING SECURITY PROTOCOL OMEGA...",
            "TARGETING INTRUSION VECTOR...",
            "ANALYZING PACKET DATA...",
            "[####----------] 20% Anomaly Detected",
            "[##########----------] 40% Tracing Origin...",
            "[############----------] 60% WARNING: Rootkit Injection!",
            "[##################----------] 80% Counter-exploit Deployed!",
            "DECRYPTING MASTER KEY...",
            `KEY FOUND: ${correctPassword}`, // This line will trigger the new reveal
            "OVERRIDING AUTHENTICATION MODULES...",
            "SYSTEM COMPROMISED. ACCESS GRANTED."
        ];
        let lineIndex = 0;
        hackingCode.textContent = '';
        hackingCode.classList.remove("hidden");
        hackingCode.classList.add("visible");
        passwordInput.disabled = true; // Disable direct input during hacking

        function displayCode() {
            if (lineIndex < codeLines.length) {
                const line = codeLines[lineIndex];
                hackingCode.textContent += (hackingCode.textContent ? "\n" : "") + line;
                hackingCode.scrollTop = hackingCode.scrollHeight;
                lineIndex++; // Prepare for the next line

                if (line.startsWith("KEY FOUND:")) {
                    // Initiate password cracking animation
                    // The next line of hacking code will only display after this animation completes
                    revealPasswordCharByChar(passwordText, passwordInput, correctPassword, () => {
                        // Animation finished, determine delay for the *next* hacking code line
                        let nextLineDelay = 300;
                        if (lineIndex < codeLines.length && codeLines[lineIndex].match(/\[.*?\]/)) {
                            nextLineDelay = 500;
                        }
                        setTimeout(displayCode, nextLineDelay);
                    });
                } else {
                    // Standard delay for other lines
                    let currentLineDisplayDuration = line.match(/\[.*?\]/) ? 500 : 300;
                    setTimeout(displayCode, currentLineDisplayDuration);
                }
            } else {
                // All hacking lines displayed
                passwordInput.value = correctPassword; // Ensure correct password is set in the input field
                passwordStatus.textContent = "Access Granted";
                setTimeout(() => {
                    hackingCode.classList.remove("visible");
                    hackingCode.classList.add("hidden");
                    passwordPrompt.classList.remove("visible");
                    html.setAttribute("data-theme", originalThemeBeforeHack); // Restore theme
                    isAuthenticated = true;
                    passwordInput.disabled = false; // Re-enable input (though not strictly necessary here)
                    // passwordInput.value = ""; // Clear if user should re-type after a manual override, but here access is granted
                    // passwordText.textContent = "Enter Password: "; // Reset visual
                    // passwordText.innerHTML += '<span class="cursor">_</span>';
                    // passwordStatus.textContent = "";
                    startMainContent();
                }, 1500);
            }
        }
        displayCode(); // Start displaying hacking lines
    }

    function handlePasswordInput() {
        if (!passwordInput || !passwordText || !passwordStatus || !passwordPrompt) return;

        passwordInput.addEventListener("input", () => {
            if (isAuthenticated || passwordInput.disabled) return; // Don't process if already authed or disabled

            const currentInput = passwordInput.value;
            // Update passwordText to show the label + current input (or dots if correct)
            // If input matches correctPassword, show dots. Otherwise, show the input itself.
            let displayValue = currentInput;
            if (currentInput === correctPassword) {
                 // If you want to show dots even for correct manual entry before pressing Enter:
                 // displayValue = "•".repeat(currentInput.length);
            }

            passwordText.innerHTML = `Enter Password: ${displayValue}<span class="cursor">_</span>`;
        });

        passwordInput.addEventListener("keypress", (e) => {
            if (isAuthenticated || passwordInput.disabled) return;

            if (e.key === "Enter") {
                const enteredValue = passwordInput.value;
                if (enteredValue === correctPassword) {
                    passwordStatus.textContent = "Access Granted";
                    // Visually confirm with all dots
                    passwordText.innerHTML = `Enter Password: ${"•".repeat(enteredValue.length)}<span class="cursor">_</span>`;
                    setTimeout(() => {
                        passwordPrompt.classList.remove("visible");
                        isAuthenticated = true;
                        // passwordInput.value = ""; // Clear for next time if needed
                        // passwordStatus.textContent = "";
                        // passwordText.innerHTML = 'Enter Password: <span class="cursor">_</span>';
                        startMainContent();
                    }, 1000);
                } else {
                    passwordStatus.textContent = "Access Denied";
                    // Clear the input field and visual display on incorrect attempt before hacking show
                    passwordInput.value = "";
                    passwordText.innerHTML = 'Enter Password: <span class="cursor">_</span>';
                    setTimeout(() => {
                        createHackingShow(); // This will now include the cracking animation
                    }, 500);
                }
            }
        });
    }

    // Initialize backgrounds
    const waveBgCanvas = document.getElementById("wave-bg");
    const matrixBgCanvas = document.getElementById("matrix-bg");
    const splash = document.getElementById("matrix-splash");

    if (initialAppTheme === "light") {
        if (waveBgCanvas) {
            waveBgCanvas.style.display = "block";
            waveBgCanvas.style.zIndex = "0";
            createWaveEffect("wave-bg");
        }
        if (matrixBgCanvas) matrixBgCanvas.style.display = "none";
    } else { // dark
        if (waveBgCanvas) waveBgCanvas.style.display = "none";
        if (matrixBgCanvas) {
            matrixBgCanvas.style.display = "block";
            matrixBgCanvas.style.zIndex = "0";
            createMatrixEffect("matrix-bg");
        }
    }

    if (splash) {
        createMatrixEffect("matrix-splash", true);
        setTimeout(() => {
            splash.classList.add("hidden");
            if (passwordPrompt) {
                passwordPrompt.classList.add("visible");
                document.body.style.overflow = "hidden";
                if (passwordInput) passwordInput.focus();
            }
        }, splashDuration);
    } else {
        if (passwordPrompt) {
            passwordPrompt.classList.add("visible");
            document.body.style.overflow = "hidden";
            if (passwordInput) passwordInput.focus();
        }
    }

    handlePasswordInput();

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            const filter = button.dataset.filter;
            projects.forEach(project => {
                const category = project.dataset.category;
                project.classList.toggle("hidden", !(filter === "all" || category === filter));
            });
        });

        button.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                button.click();
            }
        });
    });

    const isTouchDevice = () => 'ontouchstart' in window;
    projects.forEach(project => {
        if (isTouchDevice() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            project.addEventListener("touchstart", () => {
                project.style.transform = "scale(1.05)";
                project.style.setProperty("box-shadow", "0 0 8px var(--accent)");
            }, { passive: true });
            project.addEventListener("touchend", () => {
                project.style.transform = "scale(1)";
                project.style.setProperty("box-shadow", "none");
            }, { passive: true });
        }

        project.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
            const themeAnnouncer = document.getElementById("theme-announcer");

            if (currentTheme === "dark") {
                if (themeAnnouncer) themeAnnouncer.textContent = "Activating temporary red theme.";
                html.setAttribute("data-theme", "red");
                html.dataset.themeTemp = "dark-to-red";
                setTimeout(() => {
                    if (themeAnnouncer) themeAnnouncer.textContent = "Reverting to dark theme.";
                    html.setAttribute("data-theme", localStorage.getItem("theme") || FORCED_INITIAL_THEME);
                    html.removeAttribute("data-theme-temp");
                    if (themeAnnouncer) setTimeout(() => themeAnnouncer.textContent = "", 1000);
                }, 5000);
            } else if (currentTheme === "light") {
                if (themeAnnouncer) themeAnnouncer.textContent = "Activating temporary complementary theme.";
                html.setAttribute("data-theme-temp", "light");
                setTimeout(() => {
                    if (themeAnnouncer) themeAnnouncer.textContent = "Reverting to light theme.";
                    html.removeAttribute("data-theme-temp");
                    if (themeAnnouncer) setTimeout(() => themeAnnouncer.textContent = "", 1000);
                }, 5000);
            }
        });
    });

    const matrixBg = document.getElementById("matrix-bg");
    if (matrixBg) {
        let lastClickTime = 0;
        matrixBg.addEventListener("click", (e) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const now = Date.now();
            if (now - lastClickTime < 500) return;
            lastClickTime = now;

            const tempCanvas = document.createElement("canvas");
            tempCanvas.style.setProperty("position", "fixed");
            tempCanvas.style.setProperty("z-index", "0"); // Should be behind interactive elements
            tempCanvas.width = 200;
            tempCanvas.height = 200;
            tempCanvas.style.setProperty("left", `${e.clientX - tempCanvas.width / 2}px`);
            tempCanvas.style.setProperty("top", `${e.clientY - tempCanvas.height / 2}px`);
            document.body.appendChild(tempCanvas);

            const ctx = tempCanvas.getContext("2d");
            const particles = Array.from({ length: 100 }, () => ({
                x: tempCanvas.width / 2,
                y: tempCanvas.height / 2,
                angle: Math.random() * Math.PI * 2,
                speed: 60 + Math.random() * 60,
                char: Math.random() > 0.5 ? "1" : "0",
                opacity: 1,
                scale: 1
            }));

            let startTime = null;
            let lastFrameTime = 0;
            const animationDuration = 1; // seconds

            function animateParticles(currentTime) {
                if (!startTime) {
                    startTime = currentTime;
                    lastFrameTime = currentTime;
                }

                const totalElapsed = (currentTime - startTime) / 1000;
                const deltaTime = (currentTime - lastFrameTime) / 1000;
                lastFrameTime = currentTime;

                ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

                const currentTheme = html.getAttribute("data-theme");
                const tempThemeState = html.getAttribute("data-theme-temp");
                let particleColor = getComputedStyle(html).getPropertyValue('--accent').trim();

                if (currentTheme === "red" || tempThemeState === "dark-to-red") particleColor = "#ff0000";
                else if (currentTheme === "light" && tempThemeState === "light") particleColor = "#ff9999"; // temp light on light
                else if (currentTheme === "light") particleColor = "#8e24aa"; // base light

                particles.forEach(p => {
                    p.x += Math.cos(p.angle) * p.speed * deltaTime;
                    p.y += Math.sin(p.angle) * p.speed * deltaTime;
                    p.opacity = Math.max(0, 1 - totalElapsed / animationDuration);
                    p.scale = 1 + (totalElapsed / animationDuration) * 0.8;

                    ctx.globalAlpha = p.opacity;
                    ctx.fillStyle = particleColor;
                    ctx.font = `${12 * p.scale}px 'Fira Code', monospace`;
                    ctx.fillText(p.char, p.x, p.y);
                });

                if (totalElapsed < animationDuration) {
                    requestAnimationFrame(animateParticles);
                } else {
                    if (tempCanvas.parentNode) document.body.removeChild(tempCanvas);
                }
            }
            requestAnimationFrame(animateParticles);
        });
    }

    const themeToggle = document.querySelector(".theme-toggle");
    const themeIconElement = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
    const themeAnnouncer = document.getElementById("theme-announcer");
    const sunIconPath = "M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.422l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z";
    const moonIconPath = "M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35c-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.441 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z";


    if (themeIconElement) {
        themeIconElement.innerHTML = `<path d="${initialAppTheme === "dark" ? sunIconPath : moonIconPath}"/>`;
    }

    function updateThemeUI(theme) {
        html.setAttribute("data-theme", theme);
        html.removeAttribute("data-theme-temp");
        localStorage.setItem("theme", theme); // User's choice saved, will be overridden on next load by FORCED_INITIAL_THEME

        if (themeIconElement) {
            themeIconElement.innerHTML = `<path d="${theme === "dark" ? sunIconPath : moonIconPath}" />`;
        }
        if (themeAnnouncer) {
            themeAnnouncer.textContent = `Theme set to ${theme} mode.`;
        }

        const waveBg = document.getElementById("wave-bg");
        const matrixBg = document.getElementById("matrix-bg");
        if (theme === "light") {
            if (matrixBg) matrixBg.style.display = "none";
            if (waveBg) {
                waveBg.style.display = "block";
                waveBg.style.zIndex = "0";
                createWaveEffect("wave-bg");
            }
        } else { // dark or red
            if (waveBg) waveBg.style.display = "none";
            if (matrixBg) {
                matrixBg.style.display = "block";
                matrixBg.style.zIndex = "0";
                createMatrixEffect("matrix-bg");
            }
        }
    }

    function updateTheme(theme) {
        const waveTransition = document.getElementById("wave-transition");
        if (!waveTransition) {
            updateThemeUI(theme);
            return;
        }

        const currentTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
        if (theme === currentTheme) return;

        waveTransition.style.display = "block";
        if (theme === "light") {
            createWaveTransition("wave-transition", () => updateThemeUI("light"));
        } else {
            createMatrixPasswordTransition("wave-transition", () => updateThemeUI("dark"));
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
            updateTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

})();