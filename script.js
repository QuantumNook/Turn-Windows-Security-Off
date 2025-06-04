// script.js
// Version: 1.24 // Updated version
// Build: 20250604.30 // Updated build
// Changes:
// - Corrected navLinkAbout to navLinkSurveillance to match index.html update.
// - Ensured all critical UI element checks reflect latest HTML IDs.
// Main application logic, UI rendering, and event handling.

document.addEventListener('DOMContentLoaded', () => {
    logToConsole('DOMContentLoaded event fired. Initializing application.', 'info');
    const mainAppContent = document.getElementById('mainAppContent'); // Reference to main app content
    const documentationContent = document.getElementById('documentationContent'); // Reference to documentation content
    const aboutContent = document.getElementById('aboutContent'); // Reference to about content
    const downloadContent = document.getElementById('downloadContent'); // Reference to download content
    const termsContent = document.getElementById('termsContent'); // Reference to terms content
    const privacyContent = document.getElementById('privacyContent'); // Reference to privacy content
    const securityFeaturesContainer = document.getElementById('securityFeaturesContainer');
    const generateConfigBtn = document.getElementById('generateConfigBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const globalPresetSelect = document.getElementById('globalPresetSelect');

    // Navigation link references
    const navLinkTows = document.getElementById('navLinkTows');
    const navLinkDocumentation = document.getElementById('navLinkDocumentation');
    const navLinkSurveillance = document.getElementById('navLinkSurveillance'); // CORRECTED: Changed from navLinkAbout
    const navLinkDownload = document.getElementById('navLinkDownload');
    const footerLinkPrivacy = document.getElementById('footerLinkPrivacy');
    const footerLinkTerms = document.getElementById('footerLinkTerms');

    if (!mainAppContent || !documentationContent || !aboutContent || !downloadContent || !termsContent || !privacyContent || !securityFeaturesContainer || !generateConfigBtn || !loadingIndicator || !globalPresetSelect || !navLinkTows || !navLinkDocumentation || !navLinkSurveillance || !navLinkDownload || !footerLinkPrivacy || !footerLinkTerms) { // CORRECTED: Changed navLinkAbout to navLinkSurveillance
        console.error('Critical UI elements not found:', {
            mainAppContent: !!mainAppContent,
            documentationContent: !!documentationContent,
            aboutContent: !!aboutContent,
            downloadContent: !!downloadContent,
            termsContent: !!termsContent,
            privacyContent: !!privacyContent,
            securityFeaturesContainer: !!securityFeaturesContainer,
            generateConfigBtn: !!generateConfigBtn,
            loadingIndicator: !!loadingIndicator,
            globalPresetSelect: !!globalPresetSelect,
            navLinkTows: !!navLinkTows,
            navLinkDocumentation: !!navLinkDocumentation,
            navLinkSurveillance: !!navLinkSurveillance, // CORRECTED: Changed from navLinkAbout
            navLinkDownload: !!navLinkDownload,
            footerLinkPrivacy: !!footerLinkPrivacy,
            footerLinkTerms: !!footerLinkTerms
        });
        logToConsole('Critical UI elements (including content areas and nav links) not found. Exiting initialization.', 'error');
        alert('Error: A critical UI component is missing. The application might not work correctly.');
        return;
    }

    /**
     * Initializes a single security feature's UI elements based on its data.
     * This function now finds existing elements by ID and updates them.
     * @param {object} feature - The feature object from SECURITY_FEATURES_DATA.
     */
    function initializeFeatureUI(feature) {
        const checkbox = document.getElementById(`feature-${feature.id}`);
        const statusLabel = document.getElementById(`status-${feature.id}`);
        const card = checkbox ? checkbox.closest('.card') : null; // Find the parent card element


        if (checkbox && statusLabel) {
            checkbox.checked = feature.defaultEnabled;
            statusLabel.textContent = feature.defaultEnabled ? 'Enabled (Default)' : 'Disabled (Default)';
            checkbox.dataset.defaultEnabled = feature.defaultEnabled; // Store default state

            // Add event listener to each checkbox
            checkbox.addEventListener('change', () => {
                logToConsole(`Feature "${feature.name}" (ID: ${feature.id}) toggled to: ${checkbox.checked ? 'Enabled' : 'Disabled'}`, 'info');
                statusLabel.textContent = checkbox.checked ? 'Enabled' : 'Disabled';
                
                // Update card styling based on deviation from default
                if (card) {
                    if (checkbox.checked !== (checkbox.dataset.defaultEnabled === 'true')) {
                        card.classList.add('configured-explicitly');
                    } else {
                        card.classList.remove('configured-explicitly');
                    }
                }
            });
            logToConsole(`Initialized UI for feature: ${feature.name}`, 'debug');
        } else {
            logToConsole(`UI elements for feature ID ${feature.id} (${feature.name}) not found in HTML.`, 'warn');
        }
    }

    /**
     * Applies the selected global preset to the UI toggles.
     * This function now directly sets the checked state based on 'forceOn' or 'forceOff'.
     * @param {string} presetValue - The value from the globalPresetSelect dropdown.
     */
    function applyPresetToToggles(presetValue) {
        if (presetValue === "forceOff" || presetValue === "forceOn") {
            const targetState = presetValue === "forceOn";
            logToConsole(`Applying global preset to UI: ${presetValue}. Target state for toggles: ${targetState ? 'ON' : 'OFF'}`, 'info');
            SECURITY_FEATURES_DATA.forEach(feature => {
                const checkbox = document.getElementById(`feature-${feature.id}`);
                const statusLabel = document.getElementById(`status-${feature.id}`);
                const card = checkbox ? checkbox.closest('.card') : null;

                if (checkbox && statusLabel) {
                    checkbox.checked = targetState;
                    statusLabel.textContent = targetState ? 'Enabled' : 'Disabled';
                    logToConsole(`Preset: Set feature "${feature.name}" to ${targetState ? 'Enabled' : 'Disabled'}`, 'debug');
                    if (card) { // Update card styling if it's configured differently from its default
                         if (checkbox.checked !== (checkbox.dataset.defaultEnabled === 'true')) {
                            card.classList.add('configured-explicitly');
                        } else {
                            card.classList.remove('configured-explicitly');
                        }
                    }
                }
            });
        } else if (presetValue === "") { // No preset selected, revert toggles to defaultEnabled
             logToConsole(`Preset cleared. Reverting UI toggles to default enabled state.`, 'info');
             SECURITY_FEATURES_DATA.forEach(feature => {
                const checkbox = document.getElementById(`feature-${feature.id}`);
                const statusLabel = document.getElementById(`status-${feature.id}`);
                const card = checkbox ? checkbox.closest('.card') : null;

                if (checkbox && statusLabel) {
                    checkbox.checked = feature.defaultEnabled;
                    statusLabel.textContent = feature.defaultEnabled ? 'Enabled (Default)' : 'Disabled (Default)';
                    if (card) { 
                        card.classList.remove('configured-explicitly');
                    }
                }
            });
        }
    }

    /**
     * Populates navbar dropdowns (if applicable) - placeholder for future use or re-integration.
     */
    function populateDropdowns() {
        const featureSectionsDropdown = document.getElementById('featureSectionsDropdown');
        if (featureSectionsDropdown) {
            logToConsole('Feature Sections dropdown populated.', 'debug');
        }
        const configurationFunctionsDropdown = document.getElementById('configurationFunctionsDropdown');
        if (configurationFunctionsDropdown) {
            logToConsole('Configuration Functions dropdown populated.', 'debug');
        }
        logToConsole('Populating navbar dropdowns.', 'info');
    }

    /**
     * Initializes the UI by setting up event listeners and initial states for security features.
     */
    function initializeUI() {
        logToConsole('Starting UI initialization.', 'info');
        loadingIndicator.classList.remove('d-none');
        // No need to clear innerHTML as elements are static in index.html

        if (typeof SECURITY_FEATURES_DATA === 'undefined' || !Array.isArray(SECURITY_FEATURES_DATA) || SECURITY_FEATURES_DATA.length === 0) {
            logToConsole('SECURITY_FEATURES_DATA is undefined, empty, or not an array. Cannot initialize features.', 'error');
            loadingIndicator.classList.add('d-none');
            // Display an error message if data is missing, but don't overwrite existing HTML
            // securityFeaturesContainer.innerHTML = '<p class="text-danger text-center">Failed to load security features data. Please check application files.</p>';
            return;
        }

        SECURITY_FEATURES_DATA.forEach(feature => {
            initializeFeatureUI(feature); // Initialize each pre-existing feature UI
        });

        loadingIndicator.classList.add('d-none');
        logToConsole(`Finished initializing ${SECURITY_FEATURES_DATA.length} security features from HTML.`, 'info');
    }

    // --- Event Listeners ---

    // Event listener for the global preset select dropdown
    globalPresetSelect.addEventListener('change', (event) => {
        logToConsole('Global preset dropdown selection changed.', 'info');
        const selectedPreset = event.target.value;
        applyPresetToToggles(selectedPreset); // Apply the preset to UI toggles immediately
    });

    // Event listener for the "Generate Configuration Script" button
    generateConfigBtn.addEventListener('click', () => {
        logToConsole('Generate Configuration Script button clicked.', 'info');
        const presetValue = globalPresetSelect.value;
        let featuresToConfigure = [];

        // Handle script generation based on preset
        if (presetValue === "revertToDefault") {
            logToConsole('Preset "Revert to Default" selected. Attempting to generate revert script.', 'info');
            if (typeof generateAndDownloadRevertScript === 'function') {
                // For revert, we pass all features as the revert logic uses the policy path irrespective of checked state
                generateAndDownloadRevertScript(SECURITY_FEATURES_DATA); 
            } else {
                logToConsole('Error: generateAndDownloadRevertScript function not found.', 'error');
                alert('Error: The "Revert All Features to Windows Default" script generation function is missing.');
            }
            // For "revertToDefault", we don't generate the standard config script from UI toggles.
            return; 
        } else if (presetValue === "forceOff" || presetValue === "forceOn") {
            // For 'forceOff' or 'forceOn', we create the featuresToConfigure array based on the target state
            const targetState = (presetValue === "forceOn");
            logToConsole(`Preset '${presetValue}' selected. Preparing to generate script with all features forced ${targetState ? 'ON' : 'OFF'}.`, 'info');
            SECURITY_FEATURES_DATA.forEach(feature => {
                const featureCopy = JSON.parse(JSON.stringify(feature)); // Deep copy
                // Ensure we get the current state from the UI if it was changed by the preset
                const checkbox = document.getElementById(`feature-${feature.id}`);
                featureCopy.checked = checkbox ? checkbox.checked : targetState; // Use UI state if available, else targetState
                featuresToConfigure.push(featureCopy);
            });
        } else {
            // No preset selected (or empty value), collect features from UI based on individual toggles.
            logToConsole('No specific preset for script generation. Collecting features based on current UI toggles.', 'info');
            SECURITY_FEATURES_DATA.forEach(feature => {
                const checkbox = document.getElementById(`feature-${feature.id}`);
                if (checkbox) {
                    const featureCopy = JSON.parse(JSON.stringify(feature)); // Deep copy
                    featureCopy.checked = checkbox.checked; 
                    featuresToConfigure.push(featureCopy);
                } else {
                    logToConsole(`Checkbox for feature ID ${feature.id} (${feature.name}) not found during collection.`, 'warn');
                }
            });
        }
        
        if (featuresToConfigure.length === 0 && SECURITY_FEATURES_DATA.length > 0) {
             logToConsole('No features were collected for script generation, but feature data exists. This might indicate an issue with UI element IDs or all features were skipped.', 'warn');
        }

        const scriptTypeMessage = (presetValue === "forceOff" || presetValue === "forceOn") ? `preset-based (${presetValue})` : `custom (based on individual toggles)`;
        logToConsole(`Preparing to generate ${scriptTypeMessage} configuration script for ${featuresToConfigure.length} features.`, 'info');

        if (typeof generateScripts === 'function') {
            generateScripts(featuresToConfigure); 
        } else {
            logToConsole('Error: generateScripts function not found. Ensure generate_script_logic.js is loaded.', 'error');
            alert('Error: Core script generation function is missing.');
        }
    });

    // Event listener for Documentation navigation link
    navLinkDocumentation.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        logToConsole('Documentation link clicked. Showing documentation.', 'info');
        mainAppContent.classList.add('d-none'); // Hide main content
        aboutContent.classList.add('d-none'); // Hide about content
        downloadContent.classList.add('d-none'); // Hide download content
        termsContent.classList.add('d-none'); // Hide terms content
        privacyContent.classList.add('d-none'); // Hide privacy content
        documentationContent.classList.remove('d-none'); // Show documentation content
        
        // Call the global function from documentation_generator.js
        if (typeof generateDocumentationContent === 'function') {
            generateDocumentationContent(); 
        } else {
            logToConsole('Error: generateDocumentationContent function not found. Ensure documentation_generator.js is loaded.', 'error');
            alert('Error: Documentation generation function is missing.');
        }
    });

    // Event listener for Tows navigation link (to go back to main app)
    navLinkTows.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        logToConsole('Tows link clicked. Showing main application content.', 'info');
        documentationContent.classList.add('d-none'); // Hide documentation content
        aboutContent.classList.add('d-none'); // Hide about content
        downloadContent.classList.add('d-none'); // Hide download content
        termsContent.classList.add('d-none'); // Hide terms content
        privacyContent.classList.add('d-none'); // Hide privacy content
        mainAppContent.classList.remove('d-none'); // Show main content
    });

    // Event listener for Surveillance navigation link (formerly About)
    navLinkSurveillance.addEventListener('click', (event) => { // CORRECTED: Changed from navLinkAbout
        event.preventDefault(); // Prevent default link behavior
        logToConsole('Surveillance link clicked. Showing About section.', 'info'); // Log "Surveillance"
        mainAppContent.classList.add('d-none'); // Hide main content
        documentationContent.classList.add('d-none'); // Hide documentation content
        downloadContent.classList.add('d-none'); // Hide download content
        termsContent.classList.add('d-none'); // Hide terms content
        privacyContent.classList.add('d-none'); // Hide privacy content
        aboutContent.classList.remove('d-none'); // Show about content (still uses 'aboutContent' ID for div)
        
        // Call the global function from about_documentation.js
        if (typeof generateAboutContent === 'function') {
            generateAboutContent(); 
        } else {
            logToConsole('Error: generateAboutContent function not found. Ensure about_documentation.js is loaded.', 'error');
            alert('Error: About section generation function is missing.');
        }
    });

    // Event listener for Download navigation link
    navLinkDownload.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        logToConsole('Download link clicked. Showing Download section.', 'info');
        mainAppContent.classList.add('d-none'); // Hide main content
        documentationContent.classList.add('d-none'); // Hide documentation content
        aboutContent.classList.add('d-none'); // Hide about content
        termsContent.classList.add('d-none'); // Hide terms content
        privacyContent.classList.add('d-none'); // Hide privacy content
        downloadContent.classList.remove('d-none'); // Show download content
        
        // Call the global function from download_generator.js
        if (typeof generateDownloadContent === 'function') {
            generateDownloadContent(); 
        } else {
            logToConsole('Error: generateDownloadContent function not found. Ensure download_generator.js is loaded.', 'error');
            alert('Error: Download section generation function is missing.');
        }
    });

    // Event listener for Footer Privacy link
    footerLinkPrivacy.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        logToConsole('Footer Privacy link clicked. Showing Privacy section.', 'info');
        mainAppContent.classList.add('d-none');
        documentationContent.classList.add('d-none');
        aboutContent.classList.add('d-none');
        downloadContent.classList.add('d-none');
        termsContent.classList.add('d-none');
        privacyContent.classList.remove('d-none'); // Show Privacy content
        
        // Call the global function from privacy_generator.js
        if (typeof generatePrivacyContent === 'function') {
            generatePrivacyContent(); 
        } else {
            logToConsole('Error: generatePrivacyContent function not found. Ensure privacy_generator.js is loaded.', 'error');
            alert('Error: Privacy section generation function is missing.');
        }
    });

    // Event listener for Footer Terms link
    footerLinkTerms.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        logToConsole('Footer Terms link clicked. Showing Terms section.', 'info');
        mainAppContent.classList.add('d-none');
        documentationContent.classList.add('d-none');
        aboutContent.classList.add('d-none');
        downloadContent.classList.add('d-none');
        privacyContent.classList.add('d-none');
        termsContent.classList.remove('d-none'); // Show Terms content
        
        // Call the global function from terms_generator.js
        if (typeof generateTermsContent === 'function') {
            generateTermsContent(); 
        } else {
            logToConsole('Error: generateTermsContent function not found. Ensure terms_generator.js is loaded.', 'error');
            alert('Error: Terms section generation function is missing.');
        }
    });

    // Initial UI setup
    initializeUI();
    populateDropdowns(); // Call this if dropdowns are to be dynamically populated
});