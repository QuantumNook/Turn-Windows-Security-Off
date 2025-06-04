// config.js
// Global configuration settings for the application.

const APP_CONFIG = {
    // Flag to enable or disable console logging globally.
    // Set to 'true' to show debug messages in the console, 'false' to suppress them.
    enableConsoleLogging: false, // Temporarily set to true for debugging. Remember to set back to false later if desired.

    // Version and Build information for the entire application.
    appVersion: "1.0",
    appBuild: "20250602", //YYYYMMDD format for build date

    // Filenames for the generated scripts.
    // These will be appended with .ps1 or .bat when downloaded.
    generatedScriptNames: {
        config: "WindowsSecurityConfig",
        revert: "WindowsSecurityRevert",
        launcher: "LaunchConfiguration"
    },

    // Base folder for all application files on the web host.
    // As per rule 5 and 7, all files are in the public_html root.
    baseWebRoot: "public_html/", 
    
    // Name of the folder for the downloadable application package
    appFolderName: "Tows" // <-- ENSURE THIS IS PRESENT AND CORRECT
};

/**
 * Custom logging function that respects the enableConsoleLogging flag.
 * This function will be used throughout the application for verbose output.
 * @param {string} message - The message to log.
 * @param {string} type - The type of log ('log', 'info', 'warn', 'error').
 */
function logToConsole(message, type = 'log') {
    if (APP_CONFIG.enableConsoleLogging) {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;

        // Append to UI console log container
        const consoleLogElement = document.getElementById('consoleLog');
        if (consoleLogElement) {
            const entry = document.createElement('div');
            entry.textContent = formattedMessage;
            consoleLogElement.appendChild(entry);
            consoleLogElement.scrollTop = consoleLogElement.scrollHeight; // Auto-scroll to bottom
        }

        // Also log to browser's native console
        switch (type) {
            case 'info':
                console.info(formattedMessage);
                break;
            case 'warn':
                console.warn(formattedMessage);
                break;
            case 'error':
                console.error(formattedMessage);
                break;
            default:
                console.log(formattedMessage);
        }
    }
}

// Ensure the console log container is visible if logging is enabled
document.addEventListener('DOMContentLoaded', () => {
    if (APP_CONFIG.enableConsoleLogging) {
        const consoleLogContainer = document.getElementById('consoleLogContainer');
        if (consoleLogContainer) {
            consoleLogContainer.classList.remove('d-none');
            logToConsole(`Console logging enabled. App Version: ${APP_CONFIG.appVersion}, Build: ${APP_CONFIG.appBuild}`, 'info');
        }
    }
});