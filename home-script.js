// ==========================================
// 1. SIDEBAR EXPAND/COLLAPSE CONTROLLER
// ==========================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar-menu');
    const container = document.getElementById('app-container');
    
    sidebar.classList.toggle('minimized');
    
    // Shift layout margins intelligently depending on state
    if (sidebar.classList.contains('minimized')) {
        container.style.marginLeft = "70px";
    } else {
        container.style.marginLeft = "240px";
    }
}

// ==========================================
// 2. FLOATING AI WINDOW CONTROLLER
// ==========================================
function toggleAiChat() {
    const chatBox = document.getElementById('ai-chat-box');
    chatBox.classList.toggle('hidden');
    playSystemSound('beep');
}

// ==========================================
// 3. MEDICINE CHRONO ENGINE (ALARM SCHEDULER)
// ==========================================
let medicineSchedule = [
    { name: "Paracetamol (500mg)", time: "12:05", taken: false }
];
let alarmIntervalId = null;

setInterval(() => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    medicineSchedule.forEach(med => {
        if (med.time === timeStr && !med.taken) triggerActiveAlarm(med);
    });
}, 1000);

function triggerActiveAlarm(med) {
    const modal = document.getElementById('alarm-alert-modal');
    if (modal && !modal.classList.contains('hidden')) return;

    document.getElementById('alarm-med-name').innerText = med.name;
    document.getElementById('alarm-med-time').innerText = `Scheduled Time: ${med.time}`;
    modal.classList.remove('hidden');

    loopAlarmSensors();
    alarmIntervalId = setInterval(loopAlarmSensors, 1500);
}

function loopAlarmSensors() {
    playSystemSound(document.getElementById('settings-sound-select')?.value || 'chime');
    if (document.getElementById('settings-vib')?.checked) triggerSystemVibration('pulse');
}

function dismissAlarm(medName) {
    clearInterval(alarmIntervalId);
    document.getElementById('alarm-alert-modal').classList.add('hidden');
    medicineSchedule.forEach(med => { if (med.name === medName) med.taken = true; });
    alert("Medicine taken logged on Merry profile status!");
}

function snoozeAlarm() {
    clearInterval(alarmIntervalId);
    document.getElementById('alarm-alert-modal').classList.add('hidden');
    let snoozeMin = parseInt(document.getElementById('settings-snooze-select')?.value || 5);
    alert(`Alarm snoozed for ${snoozeMin} minutes.`);
    setTimeout(() => { triggerActiveAlarm({ name: "Snoozed Medication Reminder", time: "Now" }); }, snoozeMin * 60 * 1000);
}

// ==========================================
// 4. GENERAL SYSTEM SENSORY LOGIC
// ==========================================
function playSystemSound(type) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode); gainNode.connect(audioCtx.destination);

    if (type === 'piano') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(329.63, audioCtx.currentTime); 
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 1);
    } else if (type === 'beep') {
        osc.type = 'square'; osc.frequency.setValueAtTime(600, audioCtx.currentTime); 
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else {
        osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    }
}

function triggerSystemVibration(pattern) {
    if ("vibrate" in navigator) {
        if (pattern === 'pulse') navigator.vibrate([200, 100, 200]);
        else navigator.vibrate(100);
    }
}

// ==========================================
// 5. SETTINGS FORM INTERACTION PIPELINES
// ==========================================
function toggleNotifications(event) {
    event.stopPropagation();
    document.getElementById('notification-dropdown').classList.toggle('hidden');
}

function clearNotifications() {
    if (document.getElementById('notif-badge')) document.getElementById('notif-badge').style.display = 'none';
    document.getElementById('notification-dropdown').innerHTML = "<div class='dropdown-item' style='text-align:center;'>No notifications</div>";
}

function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('hidden');
}

function saveSettingsAction() {
    playSystemSound('chime');
    toggleSettings();
}

function applyDarkMode() {
    if (document.getElementById('dark-mode-toggle').checked) document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
}

function toggleAccessibilityClass(feature) {
    const app = document.getElementById('app-container');
    if (feature === 'large') {
        if (document.getElementById('settings-large').checked) app.classList.add('large-font');
        else app.classList.remove('large-font');
    } else if (feature === 'contrast') {
        if (document.getElementById('settings-contrast').checked) app.classList.add('high-contrast-theme');
        else app.classList.remove('high-contrast-theme');
    }
}

function logoutAction() {
    if (confirm("Are you sure you want to log out of Merry?")) {
        window.location.href = "index.html";
    }
}

window.onclick = function(event) {
    const dropdown = document.getElementById('notification-dropdown');
    if (dropdown && !dropdown.classList.contains('hidden')) dropdown.classList.add('hidden');
}