// ===== Designer Application =====

// LocalStorage Keys
const STORAGE_KEY = 'lesplanner-designer-state';

// State
const state = {
    config: {
        id: 'leeg-sjabloon',
        title: 'Lesonderwerp Hier',
        description: 'Typ hier een korte beschrijving van je les of de belangrijkste leerdoelen.',
        subject: 'physics',
        showMascot: true,
        cursusLink: '',
        presentationUrl: '',
        exitTicketUrl: '',
        labUrl: '',
        workbook: {
            title: 'Werkboek Oplossingen',
            subtitle: 'Subtitel (bijv. Pagina\'s)',
            instructions: 'Hier kun je tips of instructies plaatsen voor de leerlingen.',
            password: '',
            passwordHint: 'Wachtwoord nodig?',
            solutionContent: 'Plaats hier de tekstuele oplossingen...',
            solutionLink: '',
            solutionLinkText: 'Open Oplossingen'
        },
        goals: ['Ik kan...', 'Ik weet...'],
        prerequisites: ['Basiskennis over...'],
        equipment: [],
        textbook: '',
        students: [],
        breakEnabled: true,
        breakAfterStep: 2,
        timeline: [
            {
                step: 'A',
                title: 'Introductie',
                subtitle: 'Klassikaal',
                time: '10 min',
                card: {
                    type: 'class',
                    meta: 'PowerPoint',
                    title: 'Klassikale Start',
                    description: 'Typ hier wat je gaat doen tijdens de introductie van de les.',
                    actionText: 'Open Presentatie',
                    actionType: 'external_url',
                    url: 'presentationUrl'
                }
            },
            {
                step: 'B',
                title: 'Interactie',
                subtitle: 'Digitaal',
                time: '15 min',
                card: {
                    type: 'digital',
                    meta: 'Interactieve Tool',
                    title: 'Naam van de Webapp',
                    description: 'Gebruik hier een van je eigen webapps (bijv. molcalculator of elektronenconfigurator).',
                    actionText: 'Open App',
                    actionType: 'external_url',
                    url: 'labUrl'
                }
            },
            {
                step: 'C',
                title: 'Verwerking',
                subtitle: 'Zelfstandig',
                time: '20 min',
                card: {
                    type: 'paper',
                    meta: 'Pagina ...',
                    title: 'Zelfstandig Aan de Slag',
                    description: 'Leerlingen werken aan opdrachten in het werkboek of op papier.',
                    actionText: 'Bekijk Oplossingen',
                    actionType: 'workbook',
                    url: ''
                }
            },
            {
                step: 'D',
                title: 'Afsluiting',
                subtitle: 'Evaluatie',
                time: '5 min',
                card: {
                    type: 'digital',
                    meta: 'Exit Ticket',
                    title: 'Les Afsluiten',
                    description: 'Een korte check om te kijken of de doelen zijn behaald.',
                    actionText: 'Start Exit Ticket',
                    actionType: 'external_url',
                    url: 'exitTicketUrl'
                }
            }
        ]
    },
    editingActivityIndex: null
};

// DOM Elements
const elements = {
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    sections: document.querySelectorAll('.section'),

    // Basic inputs
    inputTitle: document.getElementById('input-title'),
    inputDescription: document.getElementById('input-description'),
    inputSubject: document.getElementById('input-subject'),
    inputId: document.getElementById('input-id'),
    inputPresentation: document.getElementById('input-presentation'),
    inputCursus: document.getElementById('input-cursus'),
    inputLab: document.getElementById('input-lab'),
    inputExit: document.getElementById('input-exit'),

    // Mission Briefing
    goalsList: document.getElementById('goals-list'),
    btnAddGoal: document.getElementById('btn-add-goal'),
    prerequisitesList: document.getElementById('prerequisites-list'),
    btnAddPrereq: document.getElementById('btn-add-prereq'),
    inputTextbook: document.getElementById('input-textbook'),
    equipmentList: document.getElementById('equipment-list'),
    btnAddEquip: document.getElementById('btn-add-equip'),

    // Workbook
    inputWorkbookTitle: document.getElementById('input-workbook-title'),
    inputWorkbookSubtitle: document.getElementById('input-workbook-subtitle'),
    inputWorkbookInstructions: document.getElementById('input-workbook-instructions'),
    inputWorkbookPassword: document.getElementById('input-workbook-password'),
    inputWorkbookPasswordHint: document.getElementById('input-workbook-password-hint'),
    inputWorkbookSolutions: document.getElementById('input-workbook-solutions'),
    inputWorkbookLink: document.getElementById('input-workbook-link'),
    inputWorkbookLinkText: document.getElementById('input-workbook-link-text'),

    // Timeline
    timelineList: document.getElementById('timeline-list'),
    btnAddActivity: document.getElementById('btn-add-activity'),
    inputBreakEnabled: document.getElementById('input-break-enabled'),
    breakPositionGroup: document.getElementById('break-position-group'),
    inputBreakAfter: document.getElementById('input-break-after'),

    // Students
    inputStudents: document.getElementById('input-students'),

    // Settings
    inputMascot: document.getElementById('input-mascot'),

    // Main actions
    btnAiPrompt: document.getElementById('btn-ai-prompt'),
    btnPreview: document.getElementById('btn-preview'),
    btnExport: document.getElementById('btn-export'),

    // Export Modal
    exportModal: document.getElementById('export-modal'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    exportJson: document.getElementById('export-json'),
    btnCopyJson: document.getElementById('btn-copy-json'),
    btnDownloadJson: document.getElementById('btn-download-json'),
    gistUrl: document.getElementById('gist-url'),
    plannerUrlPreview: document.getElementById('planner-url-preview'),
    btnCopyUrl: document.getElementById('btn-copy-url'),

    // Activity Modal
    activityModal: document.getElementById('activity-modal'),
    activityModalTitle: document.getElementById('activity-modal-title'),
    btnCloseActivityModal: document.getElementById('btn-close-activity-modal'),
    btnDeleteActivity: document.getElementById('btn-delete-activity'),
    btnSaveActivity: document.getElementById('btn-save-activity'),
    activityStep: document.getElementById('activity-step'),
    activityTime: document.getElementById('activity-time'),
    activityTitle: document.getElementById('activity-title'),
    activitySubtitle: document.getElementById('activity-subtitle'),
    activityCardType: document.getElementById('activity-card-type'),
    activityCardMeta: document.getElementById('activity-card-meta'),
    activityCardTitle: document.getElementById('activity-card-title'),
    activityCardDescription: document.getElementById('activity-card-description'),
    activityCardAction: document.getElementById('activity-card-action'),
    activityUrlGroup: document.getElementById('activity-url-group'),
    activityCardUrl: document.getElementById('activity-card-url'),
    activityCardActionText: document.getElementById('activity-card-action-text'),

    // Settings
    btnResetTemplate: document.getElementById('btn-reset-template')
};

// ===== Persistence =====
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.config));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.config = { ...state.config, ...parsed };
            syncUIFromConfig();
        } catch (e) {
            console.error('Kon opgeslagen staat niet laden:', e);
        }
    } else {
        syncUIFromConfig();
    }
}

// ===== Navigation =====
elements.navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;

        // Update nav
        elements.navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Update sections
        elements.sections.forEach(s => s.classList.remove('active'));
        document.getElementById(`section-${section}`).classList.add('active');
    });
});

// ===== Dynamic List Helpers =====
function createListItem(value = '', listType) {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
        <input type="text" value="${escapeHtml(value)}" placeholder="Typ hier...">
        <button class="btn-remove" title="Verwijderen">&times;</button>
    `;

    div.querySelector('input').addEventListener('input', () => syncConfigFromUI());
    div.querySelector('.btn-remove').addEventListener('click', () => {
        div.remove();
        syncConfigFromUI();
    });

    return div;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addListItem(listElement, listType, value = '') {
    listElement.appendChild(createListItem(value, listType));
}

function getListValues(listElement) {
    return Array.from(listElement.querySelectorAll('input'))
        .map(input => input.value.trim())
        .filter(val => val.length > 0);
}

// ===== Event Listeners =====

// AI Prompt - Download instruction file
elements.btnAiPrompt.addEventListener('click', () => {
    const promptText = `╔══════════════════════════════════════════════════════════════════╗
║              INTERACTIEVE LESPLANNER - AI INSTRUCTIES           ║
║                      Project Context Document                    ║
╚══════════════════════════════════════════════════════════════════╝

📚 WAT IS DE LESPLANNER?
─────────────────────────────────────────────────────────────────────
De Interactieve Lesplanner is een Vue.js-based educatief platform voor 
natuurkunde en scheikunde docenten. Het biedt:

• Een visuele tijdlijn voor lesactiviteiten
• Interactieve widgets (timer, rekenmachine, namenroller)
• Workbook management met wachtwoordbeveiliging
• Preview en share functionaliteit via JSON configuraties

De planner scheidt STRUCTUUR (Vue app) van INHOUD (JSON config).
Dit bestand helpt je om een JSON configuratie te genereren.

═════════════════════════════════════════════════════════════════════

📋 VOLLEDIGE JSON SCHEMA
─────────────────────────────────────────────────────────────────────

{
  "id": "string (unieke-id-kebab-case)",
  "title": "string (titel van de les)",
  "description": "string (1-2 zinnen korte beschrijving)",
  "subject": "physics | chemistry",
  "showMascot": boolean,
  
  "cursusLink": "string (URL naar cursus PDF)",
  "presentationUrl": "string (URL naar PowerPoint/slides)",
  "exitTicketUrl": "string (URL naar exit ticket/quiz)",
  "labUrl": "string (URL naar interactieve tool/webapp)",
  
  "workbook": {
    "title": "string",
    "subtitle": "string (bijv. 'Pagina 10-14')",
    "instructions": "string (Markdown supported)",
    "password": "string (optioneel wachtwoord)",
    "passwordHint": "string",
    "solutionContent": "string (Markdown supported)",
    "solutionLink": "string (optionele PDF URL)",
    "solutionLinkText": "string"
  },
  
  "goals": [
    "string (begin met 'Ik kan...' of 'Ik weet...')"
  ],
  
  "prerequisites": [
    "string (vereiste voorkennis)"
  ],
  
  "equipment": [
    "string (benodigdheden, bijv. 'Rekenmachine')"
  ],
  
  "textbook": "string (hoofdstuk referentie)",
  
  "students": [
    "string (namen voor Name Picker widget)"
  ],
  
  "breakEnabled": boolean,
  "breakAfterStep": integer (0-based index, bijv. 1 = pauze na stap B),
  
  "timeline": [
    {
      "step": "string (A, B, C, D, ...)",
      "title": "string",
      "subtitle": "string",
      "time": "string (bijv. '10 min', '15 min')",
      "card": {
        "type": "class | digital | paper",
        "meta": "string (extra label, bijv. 'PowerPoint', 'Pagina 12')",
        "title": "string",
        "description": "string",
        "actionType": "external_url | workbook",
        "url": "string | presentationUrl | labUrl | exitTicketUrl",
        "actionText": "string (knop tekst)"
      }
    }
  ]
}

═════════════════════════════════════════════════════════════════════

⚙️ BELANGRIJKE REGELS & CONSTRAINTS
─────────────────────────────────────────────────────────────────────

1. CARD TYPES:
   • "class" = Klassikale activiteit (docent-gedreven)
   • "digital" = Digitale tool/webapp (leerling op device)
   • "paper" = Werkboek/papier oefeningen

2. ACTION TYPES:
   • "external_url" = Opent een URL in nieuw tabblad
   • "workbook" = Opent de workbook modal met oplossingen

3. URL SHORTCUTS (legacy support):
   Je kunt 'presentationUrl', 'labUrl', 'exitTicketUrl' als waarde 
   gebruiken in card.url - deze worden automatisch vervangen door 
   de échte URLs uit de root config.

4. TIMELINE STEPS:
   • Gebruik altijd letters: A, B, C, D, ...
   • Minimum 3 stappen, maximum ~10 (voor leesbaarheid)
   • Mix verschillende card types voor afwisseling

5. BREAK POSITION:
   • breakAfterStep is 0-based (0 = na A, 1 = na B, etc.)
   • Typisch na stap 2 (na C) voor 50-minuten les

═════════════════════════════════════════════════════════════════════

✨ BEST PRACTICES
─────────────────────────────────────────────────────────────────────

✓ Gebruik concrete, actieve taal in descriptions
✓ Houd titles kort (3-5 woorden)
✓ Varieer card types (niet alleen digital)
✓ Geef realistische tijdsinschattingen
✓ Maak goals SMART en leerling-gecentreerd
✓ Gebruik Markdown in workbook content (**bold**, *italic*, lijsten)
✓ Zorg dat de totale tijd past in een lesuur (~50 min)

═════════════════════════════════════════════════════════════════════

🎯 VOORBEELD: VOLLEDIGE CONFIGURATIE
─────────────────────────────────────────────────────────────────────

{
  "id": "newton-beweging",
  "title": "Beweging en Kracht",
  "description": "In deze les leren leerlingen de basisprincipes van Newton's wetten en passen ze deze toe op bewegingssituaties.",
  "subject": "physics",
  "showMascot": true,
  
  "cursusLink": "https://example.com/cursus.pdf",
  "presentationUrl": "https://example.com/slides",
  "exitTicketUrl": "https://forms.google.com/exit",
  "labUrl": "https://example.com/simulator",
  
  "workbook": {
    "title": "Oefeningen Newton",
    "subtitle": "Pagina 24-27",
    "instructions": "**Let op:** Werk altijd in SI-eenheden (m, kg, s)",
    "password": "F=ma",
    "passwordHint": "De tweede wet van Newton",
    "solutionContent": "**Opgave 1:** F = 10 N\\n**Opgave 2:** a = 5 m/s²",
    "solutionLink": "",
    "solutionLinkText": "Open PDF Oplossingen"
  },
  
  "goals": [
    "Ik kan de drie wetten van Newton uitleggen",
    "Ik weet hoe ik kracht bereken met F = m × a",
    "Ik kan bewegingsdiagrammen interpreteren"
  ],
  
  "prerequisites": [
    "Basiskennis van eenheden (m, s, kg)",
    "Kunnen werken met formules"
  ],
  
  "equipment": [
    "Rekenmachine",
    "Geodriehoek"
  ],
  
  "textbook": "Focus Fysica - Hoofdstuk 4",
  
  "students": [],
  
  "breakEnabled": true,
  "breakAfterStep": 1,
  
  "timeline": [
    {
      "step": "A",
      "title": "Introductie",
      "subtitle": "Klassikaal",
      "time": "10 min",
      "card": {
        "type": "class",
        "meta": "PowerPoint",
        "title": "Newton's Wetten",
        "description": "We bespreken de drie bewegingswetten en bekijken filmpjes van experimenten.",
        "actionType": "external_url",
        "url": "presentationUrl",
        "actionText": "Open Presentatie"
      }
    },
    {
      "step": "B",
      "title": "Simulatie",
      "subtitle": "Digitaal",
      "time": "15 min",
      "card": {
        "type": "digital",
        "meta": "PhET Simulator",
        "title": "Kracht en Beweging",
        "description": "Experimenteer met verschillende massa's en krachten in de simulator.",
        "actionType": "external_url",
        "url": "labUrl",
        "actionText": "Start Simulator"
      }
    },
    {
      "step": "C",
      "title": "Oefeningen",
      "subtitle": "Zelfstandig",
      "time": "20 min",
      "card": {
        "type": "paper",
        "meta": "Pagina 24-27",
        "title": "Rekenen met F = m × a",
        "description": "Maak de opgaven in je werkboek. Controleer je antwoorden met het wachtwoord.",
        "actionType": "workbook",
        "url": "",
        "actionText": "Bekijk Oplossingen"
      }
    },
    {
      "step": "D",
      "title": "Afsluiting",
      "subtitle": "Check-out",
      "time": "5 min",
      "card": {
        "type": "digital",
        "meta": "Google Forms",
        "title": "Exit Ticket",
        "description": "Beantwoord 3 korte vragen om te checken of je de doelen hebt behaald.",
        "actionType": "external_url",
        "url": "exitTicketUrl",
        "actionText": "Start Exit Ticket"
      }
    }
  ]
}

═════════════════════════════════════════════════════════════════════

🤖 HOE DIT BESTAND TE GEBRUIKEN
─────────────────────────────────────────────────────────────────────

STAP 1: Kopieer dit HELE bestand naar je AI assistent (ChatGPT, Gemini, 
        Copilot, of andere)

STAP 2: Voeg je eigen prompt toe, bijvoorbeeld:

        "Op basis van bovenstaande schema, genereer een volledige
        JSON configuratie voor een les over:
        
        Onderwerp: [JE ONDERWERP HIER]
        Doelgroep: [LEERJAAR EN NIVEAU]
        Duur: [50 min / 100 min]
        Belangrijke toepassingen: [SPECIFIEKE OEFENINGEN/APPS]
        
        Geef me alleen de JSON terug in een codeblok."

STAP 3: Kopieer de gegenereerde JSON naar de Designer en paste verder aan!

═════════════════════════════════════════════════════════════════════

📝 TIPS VOOR BETERE AI RESULTATEN
─────────────────────────────────────────────────────────────────────

• Wees specifiek over het onderwerp (niet "elektriciteit" maar "Wet van Ohm")
• Geef context: leerjaar, voorkennis, beschikbare tools
• Noem specifieke apps/URLs als je die hebt
• Vraag de AI om verschillende card types te mixen
• Laat de AI realistische tijdsinschattingen maken
• Vraag om concrete, meetbare leerdoelen

═════════════════════════════════════════════════════════════════════

Veel succes met je lesontwerp! 🚀

─────────────────────────────────────────────────────────────────────
Gegenereerd door de Interactieve Lesplanner Designer
Voor meer info: https://github.com/[je-repo]
═════════════════════════════════════════════════════════════════════`;

    const blob = new Blob([promptText], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LESPLANNER_AI_INSTRUCTIES.txt';
    a.click();
    URL.revokeObjectURL(url);

    elements.btnAiPrompt.textContent = '✅ Instructies Gedownload!';
    setTimeout(() => elements.btnAiPrompt.textContent = '🤖 AI Prompt', 2000);
});

// Reset Template
elements.btnResetTemplate.addEventListener('click', () => {
    if (confirm('Weet je zeker dat je alle gegevens wilt wissen en het standaard sjabloon wilt herstellen?')) {
        // Clear storage
        localStorage.removeItem(STORAGE_KEY);

        // Reload page to get clean state (easiest way to reset all complex objects)
        window.location.reload();
    }
});

// Goals
elements.btnAddGoal.addEventListener('click', () => addListItem(elements.goalsList, 'goals'));

// Prerequisites
elements.btnAddPrereq.addEventListener('click', () => addListItem(elements.prerequisitesList, 'prerequisites'));

// Equipment
elements.btnAddEquip.addEventListener('click', () => addListItem(elements.equipmentList, 'equipment'));

// Break toggle
elements.inputBreakEnabled.addEventListener('change', () => {
    elements.breakPositionGroup.style.display = elements.inputBreakEnabled.checked ? 'block' : 'none';
    syncConfigFromUI();
});

// All basic inputs
[
    elements.inputTitle, elements.inputDescription, elements.inputSubject, elements.inputId,
    elements.inputPresentation, elements.inputCursus, elements.inputLab, elements.inputExit,
    elements.inputTextbook, elements.inputStudents, elements.inputMascot,
    elements.inputWorkbookTitle, elements.inputWorkbookSubtitle,
    elements.inputWorkbookInstructions, elements.inputWorkbookPassword, elements.inputWorkbookPasswordHint,
    elements.inputWorkbookSolutions, elements.inputWorkbookLink, elements.inputWorkbookLinkText, elements.inputBreakAfter
].forEach(el => {
    el.addEventListener('input', syncConfigFromUI);
    el.addEventListener('change', syncConfigFromUI);
});

// ===== Timeline =====
elements.btnAddActivity.addEventListener('click', () => {
    const nextStep = String.fromCharCode(65 + state.config.timeline.length); // A, B, C...

    state.config.timeline.push({
        step: nextStep,
        title: 'Nieuwe Activiteit',
        subtitle: '',
        time: '15 min',
        card: {
            type: 'digital',
            meta: '',
            title: '',
            description: '',
            actionType: 'external_url',
            url: '',
            actionText: 'Start'
        }
    });

    renderTimeline();
    openActivityModal(state.config.timeline.length - 1);
});

function renderTimeline() {
    elements.timelineList.innerHTML = '';

    state.config.timeline.forEach((activity, index) => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.draggable = true;
        div.dataset.index = index;

        div.innerHTML = `
            <div class="timeline-drag" title="Sleep om te verplaatsen">☰</div>
            <div class="timeline-step ${activity.card.type}">${activity.step}</div>
            <div class="timeline-info">
                <div class="timeline-title">${escapeHtml(activity.title || activity.card.title || 'Activiteit')}</div>
                <div class="timeline-meta">${escapeHtml(activity.subtitle || '')} · ${getBadgeText(activity.card.type)}</div>
            </div>
            <div class="timeline-time">${escapeHtml(activity.time)}</div>
        `;

        // Click to edit
        div.addEventListener('click', (e) => {
            if (e.target.classList.contains('timeline-drag')) return;
            openActivityModal(index);
        });

        // Drag and Drop Events
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('drop', handleDrop);
        div.addEventListener('dragend', handleDragEnd);

        elements.timelineList.appendChild(div);
    });
}

let draggedItemIndex = null;

function handleDragStart(e) {
    draggedItemIndex = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();

    const targetIndex = parseInt(this.dataset.index);

    if (draggedItemIndex !== targetIndex) {
        // Rearrange timeline
        const item = state.config.timeline.splice(draggedItemIndex, 1)[0];
        state.config.timeline.splice(targetIndex, 0, item);

        // Update letters (A, B, C...)
        state.config.timeline.forEach((act, i) => {
            act.step = String.fromCharCode(65 + i);
        });

        renderTimeline();
        saveState();
    }
    return false;
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItemIndex = null;
}

function getBadgeText(type) {
    return { class: 'Klassikaal', paper: 'Werkboek/papier', digital: 'Digitaal' }[type] || 'Digitaal';
}

// ===== Activity Modal =====
function openActivityModal(index) {
    state.editingActivityIndex = index;
    const activity = state.config.timeline[index];

    elements.activityModalTitle.textContent = `Activiteit ${activity.step} Bewerken`;
    elements.activityStep.value = activity.step;
    elements.activityTime.value = activity.time;
    elements.activityTitle.value = activity.title;
    elements.activitySubtitle.value = activity.subtitle;
    elements.activityCardType.value = activity.card.type;
    elements.activityCardMeta.value = activity.card.meta;
    elements.activityCardTitle.value = activity.card.title;
    elements.activityCardDescription.value = activity.card.description;
    elements.activityCardAction.value = activity.card.actionType;
    elements.activityCardUrl.value = activity.card.url || '';
    elements.activityCardActionText.value = activity.card.actionText;

    updateActivityUrlVisibility();
    elements.activityModal.classList.add('open');
}

function closeActivityModal() {
    elements.activityModal.classList.remove('open');
    state.editingActivityIndex = null;
}

elements.btnCloseActivityModal.addEventListener('click', closeActivityModal);

elements.activityCardAction.addEventListener('change', updateActivityUrlVisibility);

function updateActivityUrlVisibility() {
    const showUrl = elements.activityCardAction.value === 'external_url';
    elements.activityUrlGroup.style.display = showUrl ? 'block' : 'none';
}

elements.btnSaveActivity.addEventListener('click', () => {
    if (state.editingActivityIndex === null) return;

    state.config.timeline[state.editingActivityIndex] = {
        step: elements.activityStep.value,
        title: elements.activityTitle.value,
        subtitle: elements.activitySubtitle.value,
        time: elements.activityTime.value,
        card: {
            type: elements.activityCardType.value,
            meta: elements.activityCardMeta.value,
            title: elements.activityCardTitle.value,
            description: elements.activityCardDescription.value,
            actionType: elements.activityCardAction.value,
            url: elements.activityCardUrl.value,
            actionText: elements.activityCardActionText.value
        }
    };

    renderTimeline();
    saveState();
    closeActivityModal();
});

elements.btnDeleteActivity.addEventListener('click', () => {
    if (state.editingActivityIndex === null) return;

    if (confirm('Weet je zeker dat je deze activiteit wilt verwijderen?')) {
        state.config.timeline.splice(state.editingActivityIndex, 1);
        renderTimeline();
        saveState();
        closeActivityModal();
    }
});

// ===== Sync Config =====
function syncConfigFromUI() {
    state.config.id = elements.inputId.value;
    state.config.title = elements.inputTitle.value;
    state.config.description = elements.inputDescription.value;
    state.config.subject = elements.inputSubject.value;
    state.config.showMascot = elements.inputMascot.checked;

    state.config.presentationUrl = elements.inputPresentation.value;
    state.config.cursusLink = elements.inputCursus.value;
    state.config.labUrl = elements.inputLab.value;
    state.config.exitTicketUrl = elements.inputExit.value;

    state.config.goals = getListValues(elements.goalsList);
    state.config.prerequisites = getListValues(elements.prerequisitesList);
    state.config.equipment = getListValues(elements.equipmentList);
    state.config.textbook = elements.inputTextbook.value;

    state.config.workbook = {
        title: elements.inputWorkbookTitle.value || 'Werkboek',
        subtitle: elements.inputWorkbookSubtitle.value,
        instructions: elements.inputWorkbookInstructions.value,
        password: elements.inputWorkbookPassword.value,
        passwordHint: elements.inputWorkbookPasswordHint.value,
        solutionContent: elements.inputWorkbookSolutions.value,
        solutionLink: elements.inputWorkbookLink.value,
        solutionLinkText: elements.inputWorkbookLinkText.value || 'Open Oplossingen'
    };

    state.config.students = elements.inputStudents.value
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    state.config.breakEnabled = elements.inputBreakEnabled.checked;
    state.config.breakAfterStep = parseInt(elements.inputBreakAfter.value);

    saveState();
}

function syncUIFromConfig() {
    elements.inputId.value = state.config.id;
    elements.inputTitle.value = state.config.title;
    elements.inputDescription.value = state.config.description;
    elements.inputSubject.value = state.config.subject;
    elements.inputMascot.checked = state.config.showMascot;

    elements.inputPresentation.value = state.config.presentationUrl;
    elements.inputCursus.value = state.config.cursusLink;
    elements.inputLab.value = state.config.labUrl;
    elements.inputExit.value = state.config.exitTicketUrl;

    // Goals
    elements.goalsList.innerHTML = '';
    if (state.config.goals && state.config.goals.length > 0) {
        state.config.goals.forEach(g => addListItem(elements.goalsList, 'goals', g));
    }

    // Prerequisites
    elements.prerequisitesList.innerHTML = '';
    if (state.config.prerequisites && state.config.prerequisites.length > 0) {
        state.config.prerequisites.forEach(p => addListItem(elements.prerequisitesList, 'prerequisites', p));
    }

    // Equipment
    elements.equipmentList.innerHTML = '';
    if (state.config.equipment && state.config.equipment.length > 0) {
        state.config.equipment.forEach(e => addListItem(elements.equipmentList, 'equipment', e));
    }

    elements.inputTextbook.value = state.config.textbook || '';

    // Workbook
    if (state.config.workbook) {
        elements.inputWorkbookTitle.value = state.config.workbook.title;
        elements.inputWorkbookSubtitle.value = state.config.workbook.subtitle;
        elements.inputWorkbookInstructions.value = state.config.workbook.instructions || '';
        elements.inputWorkbookPassword.value = state.config.workbook.password || '';
        elements.inputWorkbookPasswordHint.value = state.config.workbook.passwordHint || '';
        elements.inputWorkbookSolutions.value = state.config.workbook.solutionContent || '';
        elements.inputWorkbookLink.value = state.config.workbook.solutionLink || '';
        elements.inputWorkbookLinkText.value = state.config.workbook.solutionLinkText || 'Open Oplossingen';
    }

    elements.inputStudents.value = (state.config.students || []).join('\n');

    elements.inputBreakEnabled.checked = state.config.breakEnabled;
    elements.breakPositionGroup.style.display = state.config.breakEnabled ? 'block' : 'none';
    elements.inputBreakAfter.value = state.config.breakAfterStep;

    renderTimeline();
}

// ===== Export =====
elements.btnExport.addEventListener('click', () => {
    syncConfigFromUI();

    // Create clean config for export
    const exportConfig = JSON.parse(JSON.stringify(state.config));

    // Clean up empty fields or default values if needed
    if (!exportConfig.breakEnabled) delete exportConfig.breakAfterStep;

    elements.exportJson.value = JSON.stringify(exportConfig, null, 2);
    elements.exportModal.classList.add('open');
});

elements.btnCloseModal.addEventListener('click', () => {
    elements.exportModal.classList.remove('open');
});

elements.btnCopyJson.addEventListener('click', () => {
    elements.exportJson.select();
    document.execCommand('copy');
    elements.btnCopyJson.textContent = '✅ Gekopieerd!';
    setTimeout(() => elements.btnCopyJson.textContent = '📋 Kopieer JSON', 2000);
});

elements.btnDownloadJson.addEventListener('click', () => {
    const json = elements.exportJson.value;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.config.id || 'lesson'}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// Gist URL handling
elements.gistUrl.addEventListener('input', () => {
    const url = elements.gistUrl.value.trim();

    if (url.includes('gist.github.com')) {
        const parts = url.split('/');
        const gistId = parts.pop().split('#')[0];
        const user = parts.pop();
        const rawUrl = `https://gist.githubusercontent.com/${user}/${gistId}/raw`;

        const plannerBase = window.location.origin + '/planner/';
        const plannerUrl = `${plannerBase}?config=${encodeURIComponent(rawUrl)}`;

        elements.plannerUrlPreview.innerHTML = `<code>${plannerUrl}</code>`;
        elements.btnCopyUrl.disabled = false;
        elements.btnCopyUrl.dataset.url = plannerUrl;
    } else if (url.length > 0) {
        elements.plannerUrlPreview.innerHTML = `<code style="color: #ef4444;">Ongeldige Gist URL</code>`;
        elements.btnCopyUrl.disabled = true;
    } else {
        elements.plannerUrlPreview.innerHTML = `<code>Voer eerst een Gist URL in</code>`;
        elements.btnCopyUrl.disabled = true;
    }
});

elements.btnCopyUrl.addEventListener('click', () => {
    const url = elements.btnCopyUrl.dataset.url;
    if (url) {
        navigator.clipboard.writeText(url).then(() => {
            elements.btnCopyUrl.textContent = '✅ Gekopieerd!';
            setTimeout(() => elements.btnCopyUrl.textContent = '🔗 Kopieer Planner Link', 2000);
        });
    }
});

// Preview
elements.btnPreview.addEventListener('click', () => {
    syncConfigFromUI();
    sessionStorage.setItem('designer-preview-config', JSON.stringify(state.config));
    window.open('../?preview=true', '_blank');
});

// ===== Close modals on backdrop click =====
[elements.exportModal, elements.activityModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
});

// ===== Initialize =====
function init() {
    loadState();
}

init();
