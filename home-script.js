// ==========================================================================
// 1. STATE MANAGEMENT DATA MATRIX (EXPANDED SPECTRUM)
// ==========================================================================
let medicineSchedule = [
    { id: 1, name: "Paracetamol", type: "💊 Pill", dose: "500mg", frequency: "Twice a day", time: "12:05", taken: false }
];

let todoItemsArray = [
    { id: 2, text: "Check yesterday's vitals card", context: "past", completed: false }
];

let mealsSchedulePlanArray = [
    { id: 101, category: "🌅 Breakfast", desc: "Oatmeal with Honey & Sliced Berries" },
    { id: 102, category: "☀️ Lunch", desc: "Fresh Green Salad & Grilled Chicken Breast" }
];

let calendarCustomEvents = {};
let targetCalendarYear = 2026;
let targetCalendarMonth = 6; // July (Zero-indexed: 0=Jan, 6=July)

const monthsLabelsMatrix = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

let alarmIntervalId = null;
let currentActiveAlarmMed = null;

// NEW ADDITIONAL STATE MATRICES FOR THE EXERCISE SUITE PIPELINE
let walkingReminderAlarmTime = "";
const extended20FitnessRoutinesArray = [
    { id: 1, name: "Gentle Morning Stretch", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "Mat Optional", notes: "Elongates spine muscles beautifully." },
    { id: 2, name: "Seated Chair Yoga Pose", duration: "3 mins", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "Sturdy Chair", notes: "Improves posture alignment safely." },
    { id: 3, name: "Standing Calf Raises", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 2", gear: "None Required", notes: "Strengthens ankles and lower limbs." },
    { id: 4, name: "Wall Assisted Squats", duration: "4 mins", impact: "Medium Impact", difficulty: "Intermediate Level 3", gear: "Flat Wall Space", notes: "Builds great stability foundation." },
    { id: 5, name: "Shoulder Blade Squeezes", duration: "1 min", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "None Required", notes: "Relieves upper body posture stress." },
    { id: 6, name: "Dynamic Arm Circles", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 2", gear: "None Required", notes: "Increases shoulder joint mobility safely." },
    { id: 7, name: "Standing Balance Taps", duration: "3 mins", impact: "Low Impact", difficulty: "Beginner Level 2", gear: "Wall for Support", notes: "Refines equilibrium precision loops." },
    { id: 8, name: "Light Core Tighteners", duration: "3 mins", impact: "Medium Impact", difficulty: "Intermediate Level 3", gear: "Exercise Mat", notes: "Engages deep abdominal core muscle structures." },
    { id: 9, name: "Hip Joint Rotations", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "None Required", notes: "Opens up modern sedentary tight hips." },
    { id: 10, name: "Gentle Hamstring Reach", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 2", gear: "Mat / Floor", notes: "Stretches deep back thigh muscle channels." },
    { id: 11, name: "Desk Counter Pushups", duration: "3 mins", impact: "Medium Impact", difficulty: "Intermediate Level 3", gear: "Stable Counter", notes: "Lightweight upper body resistance track." },
    { id: 12, name: "Seated Leg Extensions", duration: "4 mins", impact: "Low Impact", difficulty: "Beginner Level 2", gear: "Comfortable Chair", notes: "Activates knee joint quad support." },
    { id: 13, name: "Torso Twist Rotations", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "None Required", notes: "Enhances lateral flexibility parameters." },
    { id: 14, name: "Ankle Alphabet Tracing", duration: "3 mins", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "None Required", notes: "Increases specialized ankle flexibility vectors." },
    { id: 15, name: "Wall Chest Opener Stretches", duration: "2 mins", impact: "Low Impact", difficulty: "Beginner Level 2", gear: "Wall Space", notes: "Counteracts screen leaning slouch postures." },
    { id: 16, name: "Low-Impact Step Jack Cadence", duration: "3 mins", impact: "Medium Impact", difficulty: "Intermediate Level 4", gear: "Running Shoes", notes: "Safely increases active metabolism spikes." },
    { id: 17, name: "Wrist and Forearm Relief", duration: "1 min", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "None Required", notes: "Soothes mouse typing strain factors." },
    { id: 18, name: "Cat-Cow Spine Flexions", duration: "4 mins", impact: "Low Impact", difficulty: "Intermediate Level 3", gear: "Yoga Mat", notes: "Promotes incredible deep spine flexibility." },
    { id: 19, name: "Marching On The Spot Track", duration: "5 mins", impact: "Medium Impact", difficulty: "Intermediate Level 3", gear: "Running Shoes", notes: "Steady cardiovascular baseline standard." },
    { id: 20, name: "Deep Relaxation Cool Down", duration: "3 mins", impact: "Low Impact", difficulty: "Beginner Level 1", gear: "Quiet Room Mat", notes: "Resets heart rate curves optimally." }
];

// ==========================================================================
// 2. MOTIVATIONAL ROLLING DIALECTIC (50 SPEECHES ROTATING AUTOMATICALLY)
// ==========================================================================
const fiveTenMotivationalSpeeches = [
    "Your health is an investment, not an expense. Keep shining today! ✨",
    "Small progress every single day adds up to big, beautiful results. 🌱",
    "Believe you can and you are already halfway there. You matter! 💙",
    "Drink your water, breathe deep, and take this moment one step at a time.",
    "Every day is a fresh calendar canvas to feed your body good energy. 🍎",
    "Your strength is measured by your willingness to keep moving forward.",
    "Be gentle with yourself. You are doing the absolute best you can.",
    "Self-care is how you take your power back. Enjoy your health today! 🧘‍♂️",
    "Your potential is endless. Go conquer your tasks step by step.",
    "A healthy outside starts from the inside. Listen to your body! 🥦",
    "Great things never come from comfort zones. Keep growing! 🚀",
    "Do something today that your future self will thank you for.",
    "One sip of water, one deep breath, one smile. Keep it simple.",
    "You are strong, you are beautiful, you are completely enough. 🌟",
    "Nourish your mind, protect your peace, and honor your routine.",
    "Your life is a beautiful journey. Celebrate your little wins today!",
    "Energy follows focus. Focus on your happiness and health right now.",
    "Happiness is a habit. Cultivate it today with a bright smile! 😄",
    "Everything you need to succeed is already inside you. Tap into it!",
    "Be the reason someone smiles today, starting with looking in the mirror!",
    "Your body deserves good food, clear water, and joyful movement. 🏃‍♂️",
    "The secret of forward progress is simply getting started today.",
    "Pause, reset, and look at how far you have come. Amazing work!",
    "Hydrate your thoughts with positivity and your body with pure water.",
    "There is power in calmness. Breathe in peace, breathe out worry.",
    "Every moment is an opportunity to change your path for the better.",
    "Rest when you need to, but never give up on your beautiful goals.",
    "You are writing an amazing story. Make today a beautiful chapter!",
    "Believe in the power of simple, tiny daily adjustments.",
    "Your mind is a garden. Plant happy, healthy thoughts today. 🌻",
    "Stay hydrated, stay focused, and remain absolutely unstoppable!",
    "A journey of a thousand miles begins with a single step. Keep going!",
    "No matter the weather outside, bring your own sunshine today! ☀️",
    "Your heart is resilient and full of boundless capability.",
    "Listen to your body. Give it movement, peace, and pure fuel.",
    "Focus on progress, never perfection. You are doing fantastic!",
    "May your day be filled with clear targets and calm moments.",
    "Drink some water right now. Your brain will thank you for it! 🥛",
    "You are a rare gem. Keep honoring your health schedules.",
    "Every sunset is an opportunity to reset your wonderful life goals.",
    "Today is yours to shape. Fill it with health, clarity, and smiles.",
    "Keep your face always toward the sunshine and shadows will fall behind.",
    "Your dedication to self-care is a beautiful thing to witness.",
    "An organized routine brings peace to a busy mind. Trust your chart!",
    "There is magic in taking slow, intentional actions today.",
    "You choose your path. Choose health, gratitude, and happiness.",
    "Be proud of every task you check off your master list today! ✔️",
    "The best time to look after your precious health is always right now.",
    "Stay patient. Great transformations happen line by line, day by day.",
    "You are loved, valued, and completely capable of greatness! 🏆"
];

function initializeDailyMotivation() {
    const currentDayOfYear = new Date().getDate();
    const speechIndex = currentDayOfYear % fiveTenMotivationalSpeeches.length;
    document.getElementById('daily-motivation-quote').innerText = `"${fiveTenMotivationalSpeeches[speechIndex]}"`;
}

// ==========================================================================
// 3. SMART HYDRATION ALARM ENGINE (DEDICATED WATER AUDIO SOUND CHIME)
// ==========================================================================
let waterCountdownSeconds = 30 * 60;
let waterTimerIntervalId = null;

function startWaterHydrationEngine() {
    if (waterTimerIntervalId) clearInterval(waterTimerIntervalId);
    
    waterTimerIntervalId = setInterval(() => {
        waterCountdownSeconds--;
        if (waterCountdownSeconds <= 0) {
            document.getElementById('water-animation-emoji').innerText = "💧🔔";
            document.getElementById('water-countdown-label').innerText = "ALERT: Drink Water! 💧";
            
            // Fast double high pitch bubble chime (Totally separate from medicine sounds)
            playGameSound(880.00, 'sine', 0.15);
            setTimeout(() => { playGameSound(1318.51, 'sine', 0.2); }, 120);
        } else {
            let mins = String(Math.floor(waterCountdownSeconds / 60)).padStart(2, '0');
            let secs = String(waterCountdownSeconds % 60).padStart(2, '0');
            document.getElementById('water-countdown-label').innerText = `Next Drink In: ${mins}:${secs}`;
        }
    }, 1000);
}

function logWaterSip() {
    waterCountdownSeconds = 30 * 60;
    document.getElementById('water-animation-emoji').innerText = "💧😋";
    setTimeout(() => { document.getElementById('water-animation-emoji').innerText = "💧"; }, 3000);
    alert("Hydration logged! Your 30-minute automated water reminder chime has reset. 💧");
}

// ==========================================================================
// 4. CUSTOM MEAL ROUTINE PLANNER (DISAPPEARS UPON CLICKING)
// ==========================================================================
function renderMealsSchedulePlan() {
    const bucket = document.getElementById('meals-list-render-bucket');
    if (!bucket) return;
    bucket.innerHTML = "";

    if (mealsSchedulePlanArray.length === 0) {
        bucket.innerHTML = `<p style="text-align:center; font-size:0.8rem; color:#94a3b8; padding:8px;">No meals planned. Type above to add!</p>`;
        return;
    }

    mealsSchedulePlanArray.forEach(item => {
        const mealRow = document.createElement('div');
        mealRow.style.cssText = "background: white; border: 1px solid #bbf7d0; padding: 8px 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;";
        mealRow.title = "Click to remove this meal item";
        
        mealRow.innerHTML = `
            <div style="font-size:0.85rem;">
                <strong style="color:#16a34a; margin-right:6px;">${item.category}:</strong>
                <span style="color:#334155; font-weight:500;">${item.desc}</span>
            </div>
            <span style="font-size:0.75rem; color:#ef4444; font-weight:bold; opacity:0.6;">🗑️ Clear</span>
        `;
        
        mealRow.onclick = () => {
            removeMealElementRecord(item.id);
        };
        
        bucket.appendChild(mealRow);
    });
}

// ==========================================================================
// BACKGROUND AUDIO AUDIO SYNTHESIZER UTILITY FOR INTERACTIVE GAMES & REMINDERS
// ==========================================================================
function playGameSound(frequency, type, duration) {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = frequency || 440;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context playback failed or blocked by user engagement limits:", e);
    }
}

function addNewMealRecord() {
    const selector = document.getElementById('meal-type-selector');
    const inputField = document.getElementById('meal-input-text');
    const descText = inputField.value.trim();

    if (!descText) return;

    mealsSchedulePlanArray.push({
        id: Date.now(),
        category: selector.value,
        desc: descText
    });

    inputField.value = "";
    renderMealsSchedulePlan();
}

function removeMealElementRecord(id) {
    mealsSchedulePlanArray = mealsSchedulePlanArray.filter(item => item.id !== id);
    renderMealsSchedulePlan();
    playGameSound(698.46, 'sine', 0.05);
}

// ==========================================================================
// 5. TO-DO MANAGER MATRIX (VANISHING INTERACTIVE COMPONENT)
// ==========================================================================
function renderTodoMatrix() {
    const bucket = document.getElementById('todo-list-render-bucket');
    if (!bucket) return;
    bucket.innerHTML = "";
    
    // Only pull tasks that are NOT completed yet (makes done items vanish!)
    const activeTasks = todoItemsArray.filter(item => !item.completed);

    if (activeTasks.length === 0) {
        bucket.innerHTML = `<p style="text-align:center; font-size:0.8rem; color:#94a3b8; padding:10px;">All clean! No current tasks listed. 🌟</p>`;
        return;
    }

    activeTasks.forEach(item => {
        let cardBg = item.context === "upcoming" ? "#fffbeb" : "#f1f5f9";
        let borderStroke = item.context === "upcoming" ? "#f59e0b" : "#94a3b8";

        bucket.innerHTML += `
            <div style="background:${cardBg}; border:1px solid ${borderStroke}; padding:10px; border-radius:10px; display:flex; align-items:center; justify-content:space-between; animation: fadeIn 0.2s ease-out;">
                <div style="display:flex; align-items:center; gap:10px; width:80%;">
                    <input type="checkbox" onchange="toggleTodoStatus(${item.id})" style="width:18px; height:18px; cursor:pointer;">
                    <span style="font-size:0.85rem; font-weight:600; color:#1e293b;">${item.text}</span>
                </div>
                <span style="font-size:0.7rem; padding:2px 6px; border-radius:6px; font-weight:bold; background:white; color:${borderStroke}; border:1px solid ${borderStroke};">
                    ${item.context === 'upcoming' ? "UPCOMING 🟡" : "PAST DUE"}
                </span>
            </div>`;
    });
}

function addNewTodoItem() {
    const txt = document.getElementById('todo-input-text').value.trim();
    const context = document.getElementById('todo-time-context').value;
    if(!txt) return;

    todoItemsArray.push({
        id: Date.now(),
        text: txt,
        context: context,
        completed: false
    });
    document.getElementById('todo-input-text').value = "";
    renderTodoMatrix();
}

function toggleTodoStatus(id) {
    todoItemsArray = todoItemsArray.map(item => {
        if(item.id === id) {
            item.completed = true; 
            playGameSound(659.25, 'sine', 0.1); 
        }
        return item;
    });
    renderTodoMatrix(); // Instantly triggers removal from view state
}

// ==========================================================================
// 6. MULTI-YEAR CALENDAR AGENDA SYSTEM (GOOGLE INTERFACE ACCURACY)
// ==========================================================================
function generateCalendarGrid() {
    const wrapper = document.getElementById('calendar-grid-wrapper');
    const labelTitle = document.getElementById('calendar-month-year-title');
    if (!wrapper) return;

    labelTitle.innerText = `${monthsLabelsMatrix[targetCalendarMonth]} ${targetCalendarYear}`;
    document.getElementById('calendar-year-selector').value = targetCalendarYear;

    wrapper.innerHTML = `
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">Su</div>
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">Mo</div>
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">Tu</div>
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">We</div>
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">Th</div>
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">Fr</div>
        <div style="color:#64748b; font-weight:bold; padding-bottom:4px;">Sa</div>
    `;

    let firstDayIndex = new Date(targetCalendarYear, targetCalendarMonth, 1).getDay();
    let totalDaysInMonth = new Date(targetCalendarYear, targetCalendarMonth + 1, 0).getDate();

    for (let b = 0; b < firstDayIndex; b++) {
        const structuralBlankNode = document.createElement('div');
        structuralBlankNode.style.cssText = "background:#f8fafc; border:1px solid #f1f5f9; min-height:55px; border-radius:4px;";
        wrapper.appendChild(structuralBlankNode);
    }

    for (let d = 1; d <= totalDaysInMonth; d++) {
        const dayBox = document.createElement('div');
        dayBox.style.cssText = "background:white; border:1px solid #e2e8f0; min-height:55px; border-radius:4px; padding:4px; text-align:left; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; transition:all 0.15s;";
        
        let compoundStorageKey = `${targetCalendarYear}-${targetCalendarMonth}-${d}`;
        let savedText = calendarCustomEvents[compoundStorageKey] || "";

        dayBox.innerHTML = `<span style="font-weight:700; color:#475569; font-size:0.75rem;">${d}</span>`;
        
        if (savedText) {
            dayBox.style.background = "#e0f2fe";
            dayBox.style.borderColor = "#0284c7";
            dayBox.innerHTML += `<div style="font-size:0.55rem; font-weight:bold; background:#0284c7; color:white; padding:2px; border-radius:3px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; margin-top:2px;">📌 ${savedText}</div>`;
        }

        dayBox.onmouseenter = () => { dayBox.style.borderColor = "#0284c7"; };
        dayBox.onmouseleave = () => { if(!savedText) dayBox.style.borderColor = "#e2e8f0"; };

        dayBox.onclick = () => {
            let note = prompt(`Enter highlight description event for day entry [ ${d} ${monthsLabelsMatrix[targetCalendarMonth]} ] (e.g. My Exam, Granddaughter Birthday):`, savedText);
            if (note !== null) {
                calendarCustomEvents[compoundStorageKey] = note.trim();
                generateCalendarGrid();
            }
        };

        wrapper.appendChild(dayBox);
    }
}

function changeCalendarTimelineContext() {
    targetCalendarYear = parseInt(document.getElementById('calendar-year-selector').value);
    generateCalendarGrid();
}

function navigateCalendarMonth(directionDelta) {
    targetCalendarMonth += directionDelta;
    if (targetCalendarMonth > 11) {
        targetCalendarMonth = 0;
        targetCalendarYear++;
    } else if (targetCalendarMonth < 0) {
        targetCalendarMonth = 11;
        targetCalendarYear--;
    }
    
    if (targetCalendarYear > 2030) targetCalendarYear = 2030;
    if (targetCalendarYear < 2026) targetCalendarYear = 2026;

    generateCalendarGrid();
}

// ==========================================================================
// 7. CORE MODAL INTERFACE TOGGLE MANAGEMENT NAVIGATION HOOKS
// ==========================================================================
function openScheduleCompanion() {
    document.getElementById('schedule-modal').classList.remove('hidden');
    renderTodoMatrix();
    renderMealsSchedulePlan();
    generateCalendarGrid();
}
function closeScheduleCompanion() { document.getElementById('schedule-modal').classList.add('hidden'); }

function openMoodTracker() { document.getElementById('mood-modal').classList.remove('hidden'); }
function closeMoodTracker() { document.getElementById('mood-modal').classList.add('hidden'); }

function logMood(moodLabel, emoji) {
    document.getElementById('current-mood-text').innerHTML = `Today's Entry: <span style="font-size:1.3rem;">${emoji}</span> <strong>${moodLabel}</strong> <br><span style='font-size:0.75rem; color:#64748b;'>Logged just now</span>`;
    triggerSystemVibration('short');
}

// ==========================================================================
// 8. MEDICINE REMINDER MANAGER ALARMS TRACKER
// ==========================================================================
function openMedicineManager() {
    document.getElementById('medicine-modal').classList.remove('hidden');
    renderMedicineList();
}
function closeMedicineManager() { document.getElementById('medicine-modal').classList.add('hidden'); }

function renderMedicineList() {
    const container = document.getElementById('active-med-list');
    if (!container) return;
    if (medicineSchedule.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#94a3b8; padding:10px; font-size:0.85rem;'>No active alarms scheduled.</p>";
        return;
    }
    container.innerHTML = "";
    medicineSchedule.forEach(med => {
        container.innerHTML += `
            <div class="med-schedule-item">
                <div class="med-item-details">
                    <h5 style="font-weight:bold; font-size:0.9rem;">${med.name} (${med.type})</h5>
                    <p style="font-size:0.75rem; color:#64748b;">${med.dose} • ${med.frequency}</p>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span class="med-item-time">⏰ ${med.time}</span>
                    <button class="delete-med-btn" onclick="deleteMedicine(${med.id})">🗑️</button>
                </div>
            </div>`;
    });
}

function addNewMedicine() {
    const name = document.getElementById('med-name').value.trim();
    const type = document.getElementById('med-type').value;
    const dose = document.getElementById('med-dose').value.trim();
    const frequency = document.getElementById('med-frequency').value;
    const time = document.getElementById('med-alarm-time').value;

    if (!name || !dose || !time) {
        alert("Please fill out all fields!");
        return;
    }
    medicineSchedule.push({ id: Date.now(), name, type, dose, frequency, time, taken: false });
    document.getElementById('med-name').value = "";
    document.getElementById('med-dose').value = "";
    document.getElementById('med-alarm-time').value = "";
    renderMedicineList();
}

function deleteMedicine(id) {
    medicineSchedule = medicineSchedule.filter(med => med.id !== id);
    renderMedicineList();
    triggerSystemVibration('short');
}

// ==========================================
// 9. RELAXATION DEEP BREATHING CONTROLLER
// ==========================================
let breathIntervalId = null;
let breathingActive = false;
let ambientAudioCtx = null;
let ambientWhiteNoiseNode = null;
let ambientSoundPlaying = false;

function openRelaxationCenter() { document.getElementById('relaxation-modal').classList.remove('hidden'); }
function closeRelaxationCenter() {
    document.getElementById('relaxation-modal').classList.add('hidden');
    if (breathingActive) toggleBreathingGuide();
    if (ambientSoundPlaying) toggleRelaxationSound();
}

function toggleBreathingGuide() {
    const bubble = document.getElementById('breathing-bubble');
    const label = document.getElementById('breath-text');
    const btn = document.getElementById('breath-btn');
    breathingActive = !breathingActive;

    if (breathingActive) {
        btn.innerText = "Stop Exercise"; btn.style.background = "#ef4444";
        let cycle = 0;
        function step() {
            if (!breathingActive) return;
            if (cycle % 2 === 0) {
                bubble.classList.add('inhale'); label.innerText = "Inhale Slowly... 🌬️";
            } else {
                bubble.classList.remove('inhale'); label.innerText = "Exhale Slowly... 🍃";
            }
            cycle++;
        }
        step(); breathIntervalId = setInterval(step, 4000);
    } else {
        clearInterval(breathIntervalId); bubble.classList.remove('inhale');
        label.innerText = "Ready when you are!"; btn.innerText = "Start Breathing Exercise"; btn.style.background = "#2563eb";
    }
}

function toggleRelaxationSound() {
    const btn = document.getElementById('relax-sound-btn');
    ambientSoundPlaying = !ambientSoundPlaying;
    if (ambientSoundPlaying) {
        btn.innerText = "Mute Sound"; startNatureAudioStream();
    } else {
        btn.innerText = "Play Ambient Sound"; stopNatureAudioStream();
    }
}

function startNatureAudioStream() {
    ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = 2 * ambientAudioCtx.sampleRate;
    const noiseBuffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; }

    ambientWhiteNoiseNode = ambientAudioCtx.createBufferSource();
    ambientWhiteNoiseNode.buffer = noiseBuffer; ambientWhiteNoiseNode.loop = true;

    const filterNode = ambientAudioCtx.createBiquadFilter();
    const soundType = document.getElementById('relax-sound-select').value;
    filterNode.type = (soundType === 'waves') ? 'bandpass' : 'lowpass';
    filterNode.frequency.setValueAtTime(soundType === 'rain' ? 400 : (soundType === 'waves' ? 300 : 150), ambientAudioCtx.currentTime);

    const gainNode = ambientAudioCtx.createGain(); gainNode.gain.setValueAtTime(0.12, ambientAudioCtx.currentTime);
    ambientWhiteNoiseNode.connect(filterNode); filterNode.connect(gainNode); gainNode.connect(ambientAudioCtx.destination);
    ambientWhiteNoiseNode.start();
}

function stopNatureAudioStream() {
    if (ambientWhiteNoiseNode) { try { ambientWhiteNoiseNode.stop(); } catch(e){} }
    if (ambientAudioCtx) { ambientAudioCtx.close(); }
}

function updateRelaxationSound() { if (ambientSoundPlaying) { stopNatureAudioStream(); startNatureAudioStream(); } }

// ==========================================================================
// 10. EXERCISE TRACKER CORE ACTIONS + EXTRA 20 ROUTINES MATRIX INTERFACES
// ==========================================================================
let workoutTimerId = null;
let workoutSecondsLeft = 120;
let workoutActive = false;

function openExerciseTracker() { 
    document.getElementById('exercise-modal').classList.remove('hidden'); 
    render20ExtendedExerciseGrid();
}
function closeExerciseTracker() { 
    document.getElementById('exercise-modal').classList.add('hidden'); 
    if(workoutActive) toggleWorkoutTimer();
}

function addSteps() {
    const countEl = document.getElementById('step-count');
    let current = parseInt(countEl.innerText.replace(',', ''));
    current += 500;
    countEl.innerText = current.toLocaleString();
    triggerSystemVibration('short');
}

function toggleWorkoutTimer() {
    const btn = document.getElementById('workout-btn');
    const label = document.getElementById('workout-timer-label');
    workoutActive = !workoutActive;

    if (workoutActive) {
        btn.innerText = "Pause"; btn.style.background = "#ef4444";
        workoutTimerId = setInterval(() => {
            workoutSecondsLeft--;
            let mins = String(Math.floor(workoutSecondsLeft / 60)).padStart(2, '0');
            let secs = String(workoutSecondsLeft % 60).padStart(2, '0');
            label.innerText = `Time Remaining: ${mins}:${secs}`;

            if (workoutSecondsLeft <= 0) {
                clearInterval(workoutTimerId);
                playGameSound(523.25, 'sine', 0.5);
                alert("Great job! Quick stretching exercise completed! 🏃‍♂️🎉");
                workoutSecondsLeft = 120;
                toggleWorkoutTimer();
            }
        }, 1000);
    } else {
        clearInterval(workoutTimerId);
        btn.innerText = "Start Stretch"; btn.style.background = "#2563eb";
    }
}

// EXTRA RENDER HOOKS FOR NEW INFRASTRUCTURE
function render20ExtendedExerciseGrid() {
    const gridContainer = document.getElementById('extended-20-exercise-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    extended20FitnessRoutinesArray.forEach((exercise) => {
        const itemCard = document.createElement('div');
        itemCard.style.cssText = "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px; transition: all 0.2s;";
        
        itemCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <h5 style="margin: 0; font-size: 0.85rem; font-weight: 700; color: #1e293b;">${exercise.id}. ${exercise.name}</h5>
                <span style="font-size: 0.7rem; background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-weight: 600; white-space: nowrap;">${exercise.duration}</span>
            </div>
            <p style="margin: 2px 0; font-size: 0.75rem; color: #64748b; line-height: 1.3;">${exercise.notes}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #e2e8f0;">
                <span style="font-size: 0.7rem; color: #475569; font-weight: 500;">⚙️ ${exercise.gear}</span>
                <button onclick="previewExerciseAssetPipeline(${exercise.id})" style="background: #f97316; color: white; border: none; padding: 3px 8px; font-size: 0.7rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Watch Guide</button>
            </div>
        `;
        gridContainer.appendChild(itemCard);
    });
}

function previewExerciseAssetPipeline(id) {
    const selected = extended20FitnessRoutinesArray.find(item => item.id === id);
    const videoPreviewZone = document.getElementById('addon-video-preview-zone');
    if (!selected || !videoPreviewZone) return;

    videoPreviewZone.classList.remove('hidden');
    videoPreviewZone.style.cssText = "background: #1e293b; color: white; padding: 12px; border-radius: 8px; margin-bottom: 12px; position: relative; border-left: 4px solid #f97316;";
    
    videoPreviewZone.innerHTML = `
        <span onclick="this.parentElement.classList.add('hidden')" style="position: absolute; top: 6px; right: 10px; cursor: pointer; font-size: 1.1rem; color: #94a3b8;">&times;</span>
        <h6 style="margin: 0 0 4px 0; font-size: 0.85rem; color: #f97316;">▶️ Streaming Exercise Demonstration Guide</h6>
        <p style="margin: 0; font-size: 0.8rem; font-weight: 600;">Currently Playing: ${selected.name}</p>
        <p style="margin: 2px 0 0 0; font-size: 0.7rem; color: #94a3b8;">Metrics Track: ${selected.impact} • ${selected.difficulty} • Setup: ${selected.gear}</p>
        <div style="margin-top: 8px; font-size: 0.75rem; color: #fed7aa; background: #2d3748; padding: 6px; border-radius: 4px; text-align: center; font-style: italic;">
            ✨ [Simulated Instructional Frame Loop Running Safely] ✨
        </div>
    `;
    playGameSound(783.99, 'triangle', 0.12);
}

function saveWalkingAlarmPipeline() {
    const timeValue = document.getElementById('walk-alarm-time').value;
    if (!timeValue) {
        alert("Please specify a valid time entry!");
        return;
    }
    walkingReminderAlarmTime = timeValue;
    alert(`Smooth walk reminder logged context! You will receive a system alert at exactly ${walkingReminderAlarmTime} daily. 🌆`);
    playGameSound(523.25, 'sine', 0.15);
}

// SYSTEM HARDWARE VIBRATION HARNESS WRAPPER
function triggerSystemVibration(pattern) {
    const allowed = document.getElementById('settings-vib') ? document.getElementById('settings-vib').checked : true;
    if (!allowed || !navigator.vibrate) return;
    if (pattern === 'short') navigator.vibrate(15);
    else if (pattern === 'long') navigator.vibrate([100, 50, 100]);
}

// ==========================================================================
// 11. FIVE LEVEL ARC MINI GAME CORE SANDBOX ENGINE (50 LEVELS TOTAL)
// ==========================================================================
let currentGameKey = '';
let currentGameLevel = 1;
let gameBalloonTimer = null;
let reflexSpawnTimer = null;

function openGamesZone() {
    document.getElementById('games-modal').classList.remove('hidden');
    exitToGamesMenu();
}
function closeGamesZone() {
    document.getElementById('games-modal').classList.add('hidden');
    clearGameTimers();
}
function exitToGamesMenu() {
    clearGameTimers();
    document.getElementById('games-menu-list').classList.remove('hidden');
    document.getElementById('active-game-viewport').classList.add('hidden');
}

function clearGameTimers() {
    if (gameBalloonTimer) clearInterval(gameBalloonTimer);
    if (reflexSpawnTimer) clearTimeout(reflexSpawnTimer);
    const stage = document.getElementById('game-sandbox-stage');
    if(stage) stage.innerHTML = "";
}

function updateLevelBadge() {
    document.getElementById('game-level-indicator').innerText = `Level ${currentGameLevel} / 50`;
}

function advanceGameLevel(scoreText, actionCallback) {
    playGameSound(587.33, 'triangle', 0.3);
    if (currentGameLevel < 50) {
        currentGameLevel++;
        updateLevelBadge();
        actionCallback();
    } else {
        alert("Incredible! You have conquered all 50 levels of this game! 🏆");
        exitToGamesMenu();
    }
}

function launchGame(gameKey) {
    currentGameKey = gameKey;
    currentGameLevel = 1;
    document.getElementById('games-menu-list').classList.add('hidden');
    document.getElementById('active-game-viewport').classList.remove('hidden');
    updateLevelBadge();
    runGameBootstrap();
}

function runGameBootstrap() {
    clearGameTimers();
    const title = document.getElementById('active-game-title');
    const scoreCounter = document.getElementById('active-game-score');
    const sandbox = document.getElementById('game-sandbox-stage');

    if (currentGameKey === 'memory') {
        title.innerText = "Memory Card Match";
        scoreCounter.innerText = "Find matching cards to level up.";
        initGameMemory(sandbox, scoreCounter);
    } else if (currentGameKey === 'breathing') {
        title.innerText = "Balloon Popper";
        scoreCounter.innerText = "Pop the target balloon!";
        initGameBalloons(sandbox, scoreCounter);
    } else if (currentGameKey === 'focus') {
        title.innerText = "Math Focus Sharpener";
        scoreCounter.innerText = "Solve the equation card.";
        initGameMath(sandbox, scoreCounter);
    } else if (currentGameKey === 'reflex') {
        title.innerText = "Reaction Clicker";
        scoreCounter.innerText = "Click only when button turns GREEN!";
        initGameReflex(sandbox, scoreCounter);
    } else if (currentGameKey === 'wordle') {
        title.innerText = "Wellness Word Guesser";
        scoreCounter.innerText = "Guess the healthy keyword.";
        initGameWordle(sandbox, scoreCounter);
    }
}

function initGameMemory(sandbox, scoreCounter) {
    let pairsCount = (currentGameLevel % 2 === 0) ? 4 : 2; 
    let baseEmojis = ['🍎', '💊', '💧', '🧘‍♂️', '🏃‍♂️', '🥦', '❤️', '🥑'];
    let selection = baseEmojis.slice(0, pairsCount);
    let pool = [...selection, ...selection].sort(() => Math.random() - 0.5);

    sandbox.innerHTML = `<div class="memory-game-grid" id="mem-grid"></div>`;
    const grid = document.getElementById('mem-grid');
    grid.style.gridTemplateColumns = `repeat(${pairsCount}, 1fr)`;

    let opened = [];
    let complete = 0;

    pool.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerText = "?";
        card.onclick = () => {
            if (card.classList.contains('flipped') || opened.length >= 2) return;
            card.classList.add('flipped');
            card.innerText = emoji;
            opened.push(card);

            if (opened.length === 2) {
                if (opened[0].innerText === opened[1].innerText) {
                    opened[0].classList.add('matched');
                    opened[1].classList.add('matched');
                    opened = [];
                    complete++;
                    if (complete === pairsCount) {
                        setTimeout(() => advanceGameLevel(scoreCounter, runGameBootstrap), 600);
                    }
                } else {
                    setTimeout(() => {
                        opened[0].classList.remove('flipped'); opened[0].innerText = "?";
                        opened[1].classList.remove('flipped'); opened[1].innerText = "?";
                        opened = [];
                    }, 800);
                }
            }
        };
        grid.appendChild(card);
    });
}

function initGameBalloons(sandbox, scoreCounter) {
    sandbox.innerHTML = `<div class="balloon-stage" id="b-stage"></div>`;
    const stage = document.getElementById('b-stage');
    let speed = Math.max(1000 - (currentGameLevel * 15), 250);

    function spawn() {
        if (currentGameKey !== 'breathing') return;
        stage.innerHTML = "";
        const b = document.createElement('div');
        b.classList.add('game-balloon');
        b.innerText = "🎈";
        b.style.left = Math.floor(Math.random() * (stage.clientWidth - 50)) + "px";
        b.onclick = () => {
            clearInterval(gameBalloonTimer);
            advanceGameLevel(scoreCounter, runGameBootstrap);
        };
        stage.appendChild(b);
    }
    spawn();
    gameBalloonTimer = setInterval(spawn, speed);
}

function initGameMath(sandbox, scoreCounter) {
    let num1 = Math.floor(Math.random() * (5 + currentGameLevel)) + 1;
    let num2 = Math.floor(Math.random() * (5 + currentGameLevel)) + 1;
    let sol = num1 + num2;

    sandbox.innerHTML = `
        <div class="math-card">
            <div class="math-question">${num1} + ${num2}</div>
            <input type="text" class="math-input" id="m-ans" autofocus><br>
            <button class="play-small-btn" id="m-btn">Submit</button>
        </div>`;

    const input = document.getElementById('m-ans');
    document.getElementById('m-btn').onclick = () => {
        if (parseInt(input.value) === sol) {
            advanceGameLevel(scoreCounter, runGameBootstrap);
        } else {
            playGameSound(220, 'sawtooth', 0.2);
            input.value = "";
            alert("Try again!");
        }
    };
}

function initGameReflex(sandbox, scoreCounter) {
    sandbox.innerHTML = `<button class="reflex-target-btn" id="r-target">Wait...</button>`;
    const btn = document.getElementById('r-target');
    let active = false;
    let delay = Math.random() * 2000 + 1000;

    reflexSpawnTimer = setTimeout(() => {
        if (currentGameKey !== 'reflex') return;
        active = true;
        btn.classList.add('active-green');
        btn.innerText = "TAP!";
    }, delay);

    btn.onclick = () => {
        if (active) {
            advanceGameLevel(scoreCounter, runGameBootstrap);
        } else {
            clearTimeout(reflexSpawnTimer);
            alert("Too early! Resetting level.");
            runGameBootstrap();
        }
    };
}

function initGameWordle(sandbox, scoreCounter) {
    let vocabulary = ['HEAL', 'MIND', 'CALM', 'WALK', 'FOOD', 'CARE', 'REST', 'BODY'];
    let targetWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    
    sandbox.innerHTML = `
        <div class="wordle-box-container">
            <div class="wordle-clue">Clue: Healthy living keyword token context.</div>
            <div class="wordle-row">
                <div class="wordle-letter" id="w0">?</div>
                <div class="wordle-letter" id="w1">?</div>
                <div class="wordle-letter" id="w2">?</div>
                <div class="wordle-letter" id="w3">?</div>
            </div>
            <input type="text" maxlength="4" id="w-input" style="width:120px; text-transform:uppercase; margin-top:10px; text-align:center;"><br>
            <button class="play-small-btn" id="w-btn" style="margin-top:8px;">Check</button>
        </div>`;

    const input = document.getElementById('w-input');
    document.getElementById('w-btn').onclick = () => {
        let guess = input.value.toUpperCase().trim();
        if (guess.length !== 4) return;

        for (let i = 0; i < 4; i++) {
            let el = document.getElementById(`w${i}`);
            if (guess[i] === targetWord[i]) {
                el.innerText = guess[i]; el.style.background = "#22c55e"; el.style.color = "white";
            } else if (targetWord.includes(guess[i])) {
                el.innerText = guess[i]; el.style.background = "#eab308"; el.style.color = "white";
            } else {
                el.innerText = guess[i]; el.style.background = "#ef4444"; el.style.color = "white";
            }
        }

        if (guess === targetWord) {
            setTimeout(() => advanceGameLevel(scoreCounter, runGameBootstrap), 1000);
        } else {
            input.value = "";
        }
    };
}

// ==========================================================================
// 12. FLOATING REALTIME CLOCK ENGINE FOR TIME-SENSITIVE METRIC VERIFICATIONS
// ==========================================================================
function startGlobalDashboardDaemon() {
    setInterval(() => {
        const now = new Date();
        let currentHrs = String(now.getHours()).padStart(2, '0');
        let currentMins = String(now.getMinutes()).padStart(2, '0');
        let compoundTimeStr = `${currentHrs}:${currentMins}`;

        // MEDICINE CHECKER
        medicineSchedule.forEach(med => {
            if (med.time === compoundTimeStr && !med.taken && currentActiveAlarmMed !== med.id) {
                triggerActiveAlarmNotificationModal(med);
            }
        });

        // INTEGRATED ADDITIONAL REMINDER FOR WALKING PIPELINE TIME
        if (walkingReminderAlarmTime === compoundTimeStr) {
            walkingReminderAlarmTime = ""; // Reset to avoid looping alert triggers in the same minute
            playGameSound(660.00, 'triangle', 0.4);
            alert("🌆 Smooth Walk Reminder! Step out, stretch your joints, and keep moving.");
        }
    }, 1000);
}

function triggerActiveAlarmNotificationModal(med) {
    currentActiveAlarmMed = med.id;
    document.getElementById('alarm-med-name').innerText = med.name;
    document.getElementById('alarm-med-details').innerText = `${med.type} • ${med.dose} (${med.frequency})`;
    document.getElementById('alarm-med-time').innerText = `Scheduled Time: ${med.time}`;
    document.getElementById('alarm-alert-modal').classList.remove('hidden');
    triggerSystemVibration('long');

    if (alarmIntervalId) clearInterval(alarmIntervalId);
    alarmIntervalId = setInterval(() => {
        playGameSound(440.00, 'sawtooth', 0.3);
        setTimeout(() => { playGameSound(554.37, 'sawtooth', 0.3); }, 350);
    }, 1200);
}

function dismissAlarm() {
    document.getElementById('alarm-alert-modal').classList.add('hidden');
    if (alarmIntervalId) clearInterval(alarmIntervalId);
    medicineSchedule = medicineSchedule.map(med => {
        if (med.id === currentActiveAlarmMed) med.taken = true;
        return med;
    });
    currentActiveAlarmMed = null;
    alert("Excellent job! Intake recorded safely. 💊");
}

function snoozeAlarm() {
    document.getElementById('alarm-alert-modal').classList.add('hidden');
    if (alarmIntervalId) clearInterval(alarmIntervalId);
    currentActiveAlarmMed = null;
    alert("Alarm snoozed for structural background parameters.");
}

// MISCELLANEOUS COMPONENT SHELLS
function toggleNotifications(e) {
    if(e) e.stopPropagation();
    document.getElementById('notification-dropdown').classList.toggle('hidden');
}
function clearNotifications() {
    document.getElementById('notif-badge').style.display = 'none';
    document.getElementById('notification-dropdown').innerHTML = "<p style='padding:10px; font-size:0.75rem; text-align:center; color:#94a3b8;'>No updates active</p>";
}
function toggleSettings() { document.getElementById('settings-modal').classList.toggle('hidden'); }
function applyDarkMode() {
    const isDark = document.getElementById('dark-mode-toggle').checked;
    document.getElementById('app-container').style.filter = isDark ? 'invert(0.9) hue-rotate(180deg)' : 'none';
}
function toggleAiChat() { document.getElementById('ai-chat-box').classList.toggle('hidden'); }

// ==========================================
// BOOTSTRAP APP LIFECYCLE ON WINDOW LOAD
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    initializeDailyMotivation();
    startWaterHydrationEngine();
    startGlobalDashboardDaemon();
    
    // Safety close click triggers for overlay accessibility options
    window.onclick = function(e) {
        if(!e.target.closest('.icon-badge')) {
            const el = document.getElementById('notification-dropdown');
            if(el && !el.classList.contains('hidden')) el.classList.add('hidden');
        }
    };
});