// generate_script_logic.js
// Version: 1.30
// Build: 20250604.10
// Changes:
// - Removed alert() messages after successful ZIP generation for both apply and revert scripts.
// - Corrected missing 'feature_ps' prefix for data_ps and valueName_ps in generateRevertToDefaultPSScript.
// - Moved psEscape and formatPsData to global scope within this file for accessibility by both
//   generatePowerShellScript and generateRevertToDefaultPSScript.
// - Integrated robust pre- and post-configuration steps into generateRevertToDefaultPSScript.
// - In generateRevertToDefaultPSScript, Core Isolation features (VBS, HVCI, Credential Guard, LSA Protection)
//   are now explicitly forced ON, instead of just having their policies removed.
// - Updated Set-MpPreference for SubmitSamplesConsent to use new ID (20) and values (3 for ON, 2 for OFF).
// - FIXED: Changed 'false' to '$false' in PowerShell script templates for correct boolean assignment.
// - FIXED: Corrected PowerShell comment syntax from '//' to '#' in generated scripts.
// - FIXED: Corrected syntax error in formatPsData string escaping.
// - NEW: Added random filename generation for downloaded scripts.
// Handles the dynamic generation of PowerShell and Batch launcher scripts.

// --- Helper functions for PowerShell script generation (GLOBAL SCOPE) ---
const psEscape = (str) => (typeof str === 'string' ? str.replace(/'/g, "''") : str);
// Corrected the string escaping syntax in formatPsData
const formatPsData = (data) => (data === null || data === undefined ? '$null' : (typeof data === 'string' ? `'${data.replace(/'/g, "''")}'` : (typeof data === 'boolean' ? (data ? '$true' : '$false') : (Array.isArray(data) ? `@(${data.map(psData => formatPsData(psData)).join(',')})` : data))));

// --- Helper function to generate a random string for filenames ---
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Generates the PowerShell script content for APPLYING configurations based on selected features.
 * This function now includes robust pre- and post-configuration steps for better UI synchronization.
 * @param {Array<Object>} featuresToConfigure - Array of feature objects from JavaScript (with .checked state).
 * @returns {string} The full PowerShell script content for applying settings.
 */
function generatePowerShellScript(featuresToConfigure) {
    logToConsole('Starting PowerShell configuration script generation (v1.26 - apply mode with force logic).', 'info');

    let psScriptHeader = `# Windows Security Configuration Script (Apply Mode)
# Version: %APP_VERSION%
# Build: %APP_BUILD%
# Generated on: %GENERATION_DATE%
# Applies selected Windows security configurations. Requires Administrator privileges.

$EnableConsoleLogging = %ENABLE_CONSOLE_LOGGING%
function Write-Log { param ([string]$Message, [string]$Type = "INFO") if ($EnableConsoleLogging) { $Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss"); Write-Host ("[" + $Timestamp + "] [" + $Type.ToUpper() + "] " + $Message) } }

Write-Log "Starting configuration script execution (Apply Mode)." -Type "INFO"
try {
    Write-Log "Checking for Administrator privileges..." -Type "INFO"
    if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-Log "Script not running as Administrator. Please re-run as Administrator." -Type "ERROR"; Read-Host "Press Enter to exit."; exit 1
    }
    Write-Log "Running with Administrator privileges." -Type "INFO"
    $rebootNeeded = $false

    # --- Pre-configuration Steps for Windows Defender & Key Creation ---
    # Temporarily disable Tamper Protection for reliable registry changes to Defender settings
    Write-Log "Attempting to temporarily disable Windows Defender Tamper Protection..." -Type "INFO"
    try {
        Set-MpPreference -DisableTamperProtection $true -ErrorAction Stop
        Write-Log "Tamper Protection disabled successfully." -Type "INFO"
        $tamperProtectionDisabled = $true
    } catch {
        Write-Log "Failed to disable Tamper Protection. This might prevent some Defender settings from being applied. Error: $($_.Exception.Message)" -Type "WARN"
        $tamperProtectionDisabled = $false # FIXED: Changed 'false' to '$false' and comment syntax
    }

    # Explicitly create necessary parent registry keys if they don't exist
    # This ensures paths are present for setting values
    $requiredPolicyPaths = @(
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Reporting",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Network Protection",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System"
    )
    $requiredNonPolicyPaths = @(
        "HKLM:\\SOFTWARE\\Microsoft\\Windows Defender\\Features"
    )

    foreach ($path in ($requiredPolicyPaths + $requiredNonPolicyPaths)) {
        if (-not (Test-Path $path)) {
            Write-Log "Creating missing registry key: '$path'" -Type "INFO"
            try {
                New-Item -Path $path -Force -ErrorAction Stop | Out-Null
                Write-Log "Successfully created '$path'." -Type "INFO"
            } catch {
                Write-Log "Failed to create registry key '$path'. Error: $($_.Exception.Message)" -Type "ERROR"
            }
        }
    }

    %SELECTED_FEATURES_ARRAY_PLACEHOLDER%
    Write-Log "Applying selected security configurations..." -Type "INFO"
`;

    let psScriptBody = "";
    if (featuresToConfigure.length === 0) {
        psScriptBody += `    Write-Log "No features were selected for configuration. Exiting." -Type "WARN"\n`;
    } else {
        psScriptBody += `
    if ($featuresToConfigure.Length -eq 0) {
        Write-Log "PowerShell features array is empty, though features were selected in UI. This is unexpected. Exiting." -Type "WARN"
    } else {
        foreach ($feature_ps in $featuresToConfigure) {
            $action_ps = if ($feature_ps.checked) { "Enabling" } else { "Disabling" }

            # Special handling for Automatic Sample Submission (SubmitSamplesConsent) using Set-MpPreference
            # ID 20 is "Windows Defender: Automatic Sample Submission (Consent Level)"
            if ($feature_ps.id -eq 20) {
                # 3=Always Send (ON), 2=Never Send (OFF)
                $submitSamplesConsentValue = if ($feature_ps.checked) { 3 } else { 2 }
                Write-Log "Configuring '$($feature_ps.name)' using Set-MpPreference -SubmitSamplesConsent $($submitSamplesConsentValue)..." -Type "INFO"
                try {
                    Set-MpPreference -SubmitSamplesConsent $submitSamplesConsentValue -ErrorAction Stop
                    Write-Log "Successfully configured '$($feature_ps.name)' via Set-MpPreference." -Type "INFO"
                } catch {
                    Write-Log "Failed to configure '$($feature_ps.name)' via Set-MpPreference. Error: $($_.Exception.Message)" -Type "ERROR"
                }
            }
            # Skip direct registry configuration for Tamper Protection if it's handled by Set-MpPreference
            # ID 4 is "Windows Defender: Tamper Protection" - Pre/Post steps handle this
            elseif ($feature_ps.id -eq 4) {
                Write-Log "Skipping direct registry configuration for '$($feature_ps.name)' (ID: $($feature_ps.id)) as it is managed by Set-MpPreference in pre/post steps." -Type "INFO"
            } else {
                Write-Log "Configuring feature: $($feature_ps.name)..." -Type "INFO"
                try {
                    $registrySettingsToApply = if ($feature_ps.checked) { $feature_ps.registry.enabled } else { $feature_ps.registry.disabled }
                    $path_ps = $registrySettingsToApply.path
                    $valueName_ps = $registrySettingsToApply.valueName
                    $type_ps = $registrySettingsToApply.type
                    $data_ps = $registrySettingsToApply.data
                    Write-Log "Attempting to $($action_ps) '$($feature_ps.name)'..." -Type "INFO"
                    Write-Log "  Path: '$($path_ps)'" -Type "DEBUG"; Write-Log "  ValueName: '$($valueName_ps)'" -Type "DEBUG"; Write-Log "  Type: '$($type_ps)'" -Type "DEBUG"; Write-Log "  Target Data: '$($data_ps)'" -Type "DEBUG"

                    # Handle HKCU path specifically for the logged-in user
                    if ($path_ps.StartsWith("HKCU:")) {
                        # For HKCU, ensure the script runs in the user's context or specifies the user
                        # For simplicity in a general script, we assume the script is run by the target user or
                        # that the admin context can apply HKCU for the current user.
                        $keyPath_ps = $path_ps
                    } else {
                        $keyPath_ps = $path_ps.Replace("HKLM\\", "HKLM:\").Replace("HKCU\\", "HKCU:\")
                    }

                    if (-not (Test-Path $keyPath_ps)) {
                        Write-Log "Registry key '$($keyPath_ps)' does not exist. Creating it." -Type "WARN"
                        try { New-Item -Path $keyPath_ps -Force -ErrorAction Stop | Out-Null; Write-Log "Successfully created registry key: '$($keyPath_ps)'" -Type "INFO" } catch { Write-Log "Failed to create registry key '$($keyPath_ps)'. Error: $($_.Exception.Message)" -Type "ERROR" }
                    }
                    Set-ItemProperty -Path $keyPath_ps -Name $valueName_ps -Value $data_ps -Force -Type $type_ps -ErrorAction Stop
                    Write-Log "Successfully $($action_ps) '$($feature_ps.name)'." -Type "INFO"
                    if ($feature_ps.rebootRequired) { $rebootNeeded = $true; Write-Log "  Reboot required for this change." -Type "INFO" }
                } catch { Write-Log "Failed to configure '$($feature_ps.name)'. Error: $($_.Exception.Message)" -Type "ERROR"; Write-Log "  Details: $($_.InnerException)" -Type "ERROR" }
            }
        }
    }
`;
    }

    let psScriptFooter = `
    Write-Log "Registry changes completed." -Type "INFO"

    # --- Post-configuration Steps for Windows Defender & UI Refresh ---
    # Restart Windows Defender service
    Write-Log "Attempting to restart Windows Defender service (WinDefend)..." -Type "INFO"
    try {
        Stop-Service -Name WinDefend -Force -ErrorAction SilentlyContinue
        Start-Service -Name WinDefend -ErrorAction SilentlyContinue
        Write-Log "Windows Defender service restarted." -Type "INFO"
    } catch {
        Write-Log "Failed to restart Windows Defender service. Error: $($_.Exception.Message)" -Type "WARN"
    }

    # Restart Security Health UI processes
    Write-Log "Attempting to restart Windows Security Health UI processes..." -Type "INFO"
    try {
        Get-Process -Name SecurityHealthSystray -ErrorAction SilentlyContinue | Stop-Process -Force
        Get-Process -Name SecurityHealthHost -ErrorAction SilentlyContinue | Stop-Process -Force
        Write-Log "Windows Security Health UI processes restarted." -Type "INFO"
    } catch {
        Write-Log "Failed to restart Windows Security Health UI processes. Error: $($_.Exception.Message)" -Type "WARN"
    }

    # Force Group Policy Update to help synchronize UI
    Write-Log "Attempting to refresh Group Policy settings to synchronize UI. This may take a moment..." -Type "INFO"
    gpupdate /force | Out-Null # Redirect output to avoid cluttering console
    # Also trigger specific WMI policy refresh schedules
    try {
        Invoke-WMIMethod -Namespace root\\ccm -Class SMS_Client -Name TriggerSchedule -ArgumentList "{00000000-0000-0000-0000-000000000021}" -ErrorAction SilentlyContinue | Out-Null
        Invoke-WMIMethod -Namespace root\\ccm -Class SMS_Client -Name TriggerSchedule -ArgumentList "{00000000-0000-0000-0000-000000000022}" -ErrorAction SilentlyContinue | Out-Null
        Write-Log "WMI policy refresh schedules triggered." -Type "INFO"
    } catch {
        Write-Log "Failed to trigger WMI policy refresh schedules. Error: $($_.Exception.Message)" -Type "WARN"
    }
    Write-Log "Group Policy refresh initiated." -Type "INFO"

    # Re-enable Tamper Protection if it was disabled by this script
    if ($tamperProtectionDisabled) {
        Write-Log "Re-enabling Windows Defender Tamper Protection..." -Type "INFO"
        try {
            Set-MpPreference -DisableTamperProtection $false -ErrorAction Stop
            Write-Log "Tamper Protection re-enabled successfully." -Type "INFO"
        } catch {
            Write-Log "Failed to re-enable Tamper Protection. Please check manually. Error: $($_.Exception.Message)" -Type "ERROR"
        }
    }

    Write-Log "Configuration script (Apply Mode) execution completed." -Type "INFO"
    if ($rebootNeeded) {
        Write-Log "One or more configurations require a system reboot." -Type "WARN"
        if ((Read-Host "Reboot now? (Y/N)").ToUpper() -eq 'Y') { Write-Log "Initiating reboot..." -Type "INFO"; Restart-Computer -Force } else { Write-Log "Reboot deferred." -Type "INFO" }
    } else { Write-Log "No reboot required for applied changes." -Type "INFO" }
} catch { Write-Log "Unexpected error during script execution: $($_.Exception.Message)" -Type "ERROR"; Write-Log "  Details: $($_.InnerException)" -Type "ERROR" }
finally { Write-Log "Script finished. Press any key to close." -Type "INFO"; Read-Host }
`;
    let finalPsScriptContent = psScriptHeader + psScriptBody + psScriptFooter;
    let dynamicFeatureArray = "$featuresToConfigure = @(\n";
    const featuresForPsApplyArray = [];
    featuresToConfigure.forEach(feature => {
        // Use the globally defined psEscape and formatPsData
        featuresForPsApplyArray.push(
            `    @{ id = ${feature.id}; name = '${psEscape(feature.name)}'; description = '${psEscape(feature.description)}'; groupPolicyPath = '${psEscape(feature.groupPolicyPath)}'; rebootRequired = ${feature.rebootRequired ? '$true' : '$false'}; registry = @{ enabled = @{ path = '${psEscape(feature.registry.enabled.path)}'; valueName = '${psEscape(feature.registry.enabled.valueName !== undefined && feature.registry.enabled.valueName !== null ? feature.registry.enabled.valueName : '')}'; type = '${psEscape(feature.registry.enabled.type)}'; data = ${formatPsData(feature.registry.enabled.data)} }; disabled = @{ path = '${psEscape(feature.registry.disabled.path)}'; valueName = '${psEscape(feature.registry.disabled.valueName !== undefined && feature.registry.disabled.valueName !== null ? feature.registry.disabled.valueName : '')}'; type = '${psEscape(feature.registry.disabled.type)}'; data = ${formatPsData(feature.registry.disabled.data)} } }; checked = ${feature.checked ? '$true' : '$false'} }`
        );
    });
    dynamicFeatureArray += featuresForPsApplyArray.join(";\n") + "\n)";
    if (featuresForPsApplyArray.length === 0) dynamicFeatureArray = "$featuresToConfigure = @()";

    finalPsScriptContent = finalPsScriptContent.replace(/%SELECTED_FEATURES_ARRAY_PLACEHOLDER%/g, dynamicFeatureArray);
    finalPsScriptContent = finalPsScriptContent.replace(/%APP_VERSION%/g, APP_CONFIG.appVersion).replace(/%APP_BUILD%/g, APP_CONFIG.appBuild).replace(/%GENERATION_DATE%/g, new Date().toLocaleString()).replace(/%ENABLE_CONSOLE_LOGGING%/g, APP_CONFIG.enableConsoleLogging ? '$true' : '$false');
    logToConsole('PowerShell configuration script content generated successfully.', 'info');
    return finalPsScriptContent;
}

/**
 * Generates the PowerShell script content for REVERTING features to Windows Default.
 * This function is now updated to force Core Isolation features ON and includes robust UI refresh steps.
 * @param {Array<Object>} allFeatures - Array of all feature objects from SECURITY_FEATURES_DATA.
 * @returns {string} The full PowerShell script content for reverting settings.
 */
function generateRevertToDefaultPSScript(allFeatures) {
    logToConsole('Starting PowerShell revert script generation (v1.26 - revert to default mode, with Core Isolation force ON).', 'info');

    let psScriptHeaderRevert = `# Windows Security Restore Defaults Script
# Version: %APP_VERSION%
# Build: %APP_BUILD%
# Generated on: %GENERATION_DATE%
# Attempts to revert security settings to Windows defaults by removing applied policies.
# Core Isolation features are specifically forced ON for enhanced security.
# Requires Administrator privileges.

$EnableConsoleLogging = %ENABLE_CONSOLE_LOGGING%
function Write-Log { param ([string]$Message, [string]$Type = "INFO") if ($EnableConsoleLogging) { $Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss"); Write-Host ("[" + $Timestamp + "] [" + $Type.ToUpper() + "] " + $Message) } }

Write-Log "Starting Restore Defaults script execution." -Type "INFO"
try {
    Write-Log "Checking for Administrator privileges..." -Type "INFO"
    if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-Log "Script not running as Administrator. Please re-run as Administrator." -Type "ERROR"; Read-Host "Press Enter to exit."; exit 1
    }
    Write-Log "Running with Administrator privileges." -Type "INFO"
    $rebootNeeded = $false

    # --- Pre-configuration Steps for Windows Defender & Key Creation (for revert script) ---
    # Temporarily disable Tamper Protection for reliable registry changes to Defender settings
    Write-Log "Attempting to temporarily disable Windows Defender Tamper Protection..." -Type "INFO"
    try {
        Set-MpPreference -DisableTamperProtection $true -ErrorAction Stop
        Write-Log "Tamper Protection disabled successfully." -Type "INFO"
        $tamperProtectionDisabled = $true
    } catch {
        Write-Log "Failed to disable Tamper Protection. This might prevent some Defender settings from being applied. Error: $($_.Exception.Message)" -Type "WARN"
        $tamperProtectionDisabled = $false # FIXED: Changed 'false' to '$false' and comment syntax
    }

    # Explicitly create necessary parent registry keys if they don't exist (for revert script)
    $requiredPolicyPaths = @(
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Reporting",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Network Protection",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
        "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System"
    )
    $requiredNonPolicyPaths = @(
        "HKLM:\\SOFTWARE\\Microsoft\\Windows Defender\\Features"
    )

    foreach ($path in ($requiredPolicyPaths + $requiredNonPolicyPaths)) {
        if (-not (Test-Path $path)) {
            Write-Log "Creating missing registry key: '$path'" -Type "INFO"
            try {
                New-Item -Path $path -Force -ErrorAction Stop | Out-Null
                Write-Log "Successfully created '$path'." -Type "INFO"
            } catch {
                Write-Log "Failed to create registry key '$path'. Error: $($_.Exception.Message)" -Type "ERROR"
            }
        }
    }

    %FEATURES_TO_REVERT_ARRAY_PLACEHOLDER%
    Write-Log "Attempting to revert security features to Windows defaults..." -Type "INFO"
`;

    let psScriptBodyRevert = `
    if ($featuresToRevert_ps.Length -eq 0) {
        Write-Log "No features identified for reversion. Exiting." -Type "WARN"
    } else {
        foreach ($feature_ps in $featuresToRevert_ps) {
            Write-Log "Processing revert for feature: $($feature_ps.name) (ID: $($feature_ps.id))..." -Type "INFO"

            # --- Special handling for Core Isolation features: Force ON ---
            # IDs: 8 (VBS), 9 (HVCI), 10 (Credential Guard), 11 (LSA Protection)
            # These will be set to their ENABLED state, not just removed.
            $coreIsolationFeatureIDs = @(8, 9, 10, 11)
            if ($coreIsolationFeatureIDs -contains $feature_ps.id) {
                Write-Log "  Forcing Core Isolation feature '$($feature_ps.name)' ON for security." -Type "INFO"
                try {
                    $path_ps = $feature_ps.registry.enabled.path
                    $valueName_ps = $feature_ps.registry.enabled.valueName
                    $type_ps = $feature_ps.registry.enabled.type
                    $data_ps = $feature_ps.registry.enabled.data # Force ON data

                    $keyPath_ps = $path_ps.Replace("HKLM\\", "HKLM:\").Replace("HKCU\\", "HKCU:\")
                    if (-not (Test-Path $keyPath_ps)) {
                        Write-Log "  Registry key '$($keyPath_ps)' does not exist. Creating it." -Type "WARN"
                        try { New-Item -Path $keyPath_ps -Force -ErrorAction Stop | Out-Null; Write-Log "Successfully created registry key: '$($keyPath_ps)'" -Type "INFO" } catch { Write-Log "Failed to create registry key '$($keyPath_ps)'. Error: $($_.Exception.Message)" -Type "ERROR" }
                    }
                    Set-ItemProperty -Path $keyPath_ps -Name $valueName_ps -Value $data_ps -Force -Type $type_ps -ErrorAction Stop
                    Write-Log "  Successfully forced '$($feature_ps.name)' ON." -Type "INFO"
                    if ($feature_ps.rebootRequired) { $rebootNeeded = $true; Write-Log "  Reboot required for this change." -Type "INFO" }
                } catch {
                    Write-Log "  Failed to force '$($feature_ps.name)' ON. Error: $($_.Exception.Message)" -Type "ERROR"
                    Write-Log "  Details: $($_.Exception.InnerException)" -Type "ERROR"
                }
            }
            # --- Standard Revert: Remove Policy Value ---
            else {
                try {
                    $path_ps = $feature_ps.registry.path # Use top-level path from revert array
                    $valueName_ps = $feature_ps.registry.valueName # Use top-level valueName from revert array

                    Write-Log "  Attempting to remove policy value '$($valueName_ps)' from path '$($path_ps)' for '$($feature_ps.name)'." -Type "DEBUG"
                    $keyPath_ps = $path_ps.Replace("HKLM\\", "HKLM:\").Replace("HKCU\\", "HKCU:\")

                    if (Test-Path $keyPath_ps) {
                        $propertyExists = Get-ItemProperty -Path $keyPath_ps -Name $valueName_ps -ErrorAction SilentlyContinue
                        if ($propertyExists) {
                            Remove-ItemProperty -Path $keyPath_ps -Name $valueName_ps -Force -ErrorAction Stop
                            Write-Log "  Successfully reverted '$($feature_ps.name)' (policy value '$($valueName_ps)' removed from '$($keyPath_ps)')." -Type "INFO"
                        } else {
                            Write-Log "  Policy value '$($valueName_ps)' for '$($feature_ps.name)' not found at '$($keyPath_ps)'. No removal needed for this specific value." -Type "INFO"
                        }
                    } else {
                        Write-Log "  Registry key '$($keyPath_ps)' for '$($feature_ps.name)' not found. No removal needed for this key." -Type "INFO"
                    }

                    if ($feature_ps.rebootRequired) { # Reboot might be needed if removing policy value triggers a change
                        $rebootNeeded = $true
                        Write-Log "  Reboot may be required for '$($feature_ps.name)' reversion to take full effect." -Type "INFO"
                    }
                } catch {
                    Write-Log "  Failed to revert '$($feature_ps.name)'. Error for value '$($valueName_ps)' at path '$($keyPath_ps)': $($_.Exception.Message)" -Type "ERROR"
                    # Removed InnerException for brevity here, can be added back if needed for detailed debugging.
                }
            }
        }
    }
`;

    let psScriptFooterRevert = `
    Write-Log "Registry changes completed." -Type "INFO"

    # --- Post-configuration Steps for Windows Defender & UI Refresh (for revert script) ---
    # Restart Windows Defender service
    Write-Log "Attempting to restart Windows Defender service (WinDefend)..." -Type "INFO"
    try {
        Stop-Service -Name WinDefend -Force -ErrorAction SilentlyContinue
        Start-Service -Name WinDefend -ErrorAction SilentlyContinue
        Write-Log "Windows Defender service restarted." -Type "INFO"
    } catch {
        Write-Log "Failed to restart Windows Defender service. Error: $($_.Exception.Message)" -Type "WARN"
    }

    # Restart Security Health UI processes
    Write-Log "Attempting to restart Windows Security Health UI processes..." -Type "INFO"
    try {
        Get-Process -Name SecurityHealthSystray -ErrorAction SilentlyContinue | Stop-Process -Force
        Get-Process -Name SecurityHealthHost -ErrorAction SilentlyContinue | Stop-Process -Force
        Write-Log "Windows Security Health UI processes restarted." -Type "INFO"
    } catch {
        Write-Log "Failed to restart Windows Security Health UI processes. Error: $($_.Exception.Message)" -Type "WARN"
    }

    # Force Group Policy Update to help synchronize UI
    Write-Log "Attempting to refresh Group Policy settings to synchronize UI. This may take a moment..." -Type "INFO"
    gpupdate /force | Out-Null # Redirect output to avoid cluttering console
    # Also trigger specific WMI policy refresh schedules
    try {
        Invoke-WMIMethod -Namespace root\\ccm -Class SMS_Client -Name TriggerSchedule -ArgumentList "{00000000-0000-0000-0000-000000000021}" -ErrorAction SilentlyContinue | Out-Null
        Invoke-WMIMethod -Namespace root\\ccm -Class SMS_Client -Name TriggerSchedule -ArgumentList "{00000000-0000-0000-0000-000000000022}" -ErrorAction SilentlyContinue | Out-Null
        Write-Log "WMI policy refresh schedules triggered." -Type "INFO"
    } catch {
        Write-Log "Failed to trigger WMI policy refresh schedules. Error: $($_.Exception.Message)" -Type "WARN"
    }
    Write-Log "Group Policy refresh initiated." -Type "INFO"

    # Re-enable Tamper Protection if it was disabled by this script
    if ($tamperProtectionDisabled) {
        Write-Log "Re-enabling Windows Defender Tamper Protection..." -Type "INFO"
        try {
            Set-MpPreference -DisableTamperProtection $false -ErrorAction Stop
            Write-Log "Tamper Protection re-enabled successfully." -Type "INFO"
        } catch {
            Write-Log "Failed to re-enable Tamper Protection. Please check manually. Error: $($_.Exception.Message)" -Type "ERROR"
        }
    }

    Write-Log "Restore Defaults script execution completed." -Type "INFO"
    if ($rebootNeeded) {
        Write-Log "One or more reversions may require a system reboot." -Type "WARN"
        if ((Read-Host "Reboot now for changes to take full effect? (Y/N)").ToUpper() -eq 'Y') { Write-Log "Initiating reboot..." -Type "INFO"; Restart-Computer -Force } else { Write-Log "Reboot deferred." -Type "INFO" }
    } else { Write-Log "No specific reboots flagged for reverted settings." -Type "INFO" }
} catch { Write-Log "An unexpected error occurred during Restore Defaults script: $($_.Exception.Message)" -Type "ERROR" }
finally { Write-Log "Script finished. Press any key to close." -Type "INFO"; Read-Host }
`;

    let finalPsRevertScriptContent = psScriptHeaderRevert + psScriptBodyRevert + psScriptFooterRevert;

    // Removed redundant psEscape definition here as it's global now
    const featuresForPsRevertArray = [];
    allFeatures.forEach(feature => {
        // For revert, we primarily need the path and value name that our script *would* set.
        // We'll assume the 'enabled' state's path/valueName is canonical for the policy value.
        // For Core Isolation features, we'll ensure their 'enabled' state is passed so they are forced ON.
        // The revert logic in the script now uses the top-level path and valueName for removal,
        // but the enabled state data is still needed for the Core Isolation force-ON logic.
        const policyPath = feature.registry.enabled.path;
        const policyValueName = feature.registry.enabled.valueName;

        if (policyPath && policyValueName !== undefined && policyValueName !== null) {
            featuresForPsRevertArray.push(
                `    @{ id = ${feature.id}; name = '${psEscape(feature.name)}'; registry = @{ path = '${psEscape(policyPath)}'; valueName = '${psEscape(policyValueName)}'; enabled = @{ path = '${psEscape(feature.registry.enabled.path)}'; valueName = '${psEscape(feature.registry.enabled.valueName !== undefined && feature.registry.enabled.valueName !== null ? feature.registry.enabled.valueName : '')}'; type = '${psEscape(feature.registry.enabled.type)}'; data = ${formatPsData(feature.registry.enabled.data)} } }; rebootRequired = ${feature.rebootRequired ? '$true' : '$false'} }`
            );
        } else {
            logToConsole(`Feature '${feature.name}' (ID: ${feature.id}) is missing path/valueName for Revert script. Skipping.`, 'warn');
        }
    });

    let dynamicFeatureArrayForRevert = "$featuresToRevert_ps = @(\n" + featuresForPsRevertArray.join(";\n") + "\n)";
    if (featuresForPsRevertArray.length === 0) {
        dynamicFeatureArrayForRevert = "$featuresToRevert_ps = @()";
         logToConsole('No features suitable for revert script generation.', 'warn');
    }

    finalPsRevertScriptContent = finalPsRevertScriptContent.replace(/%FEATURES_TO_REVERT_ARRAY_PLACEHOLDER%/g, dynamicFeatureArrayForRevert);
    finalPsRevertScriptContent = finalPsRevertScriptContent.replace(/%APP_VERSION%/g, APP_CONFIG.appVersion).replace(/%APP_BUILD%/g, APP_CONFIG.appBuild).replace(/%GENERATION_DATE%/g, new Date().toLocaleString()).replace(/%ENABLE_CONSOLE_LOGGING%/g, APP_CONFIG.enableConsoleLogging ? '$true' : '$false');

    logToConsole('PowerShell Restore Defaults script content generated successfully.', 'info');
    return finalPsRevertScriptContent;
}


/**
 * Generates the batch launcher script content. (Reusable for both script types)
 * @param {string} psFileName - The filename of the PowerShell script to launch.
 * @param {string} scriptTitle - The title to display in batch script echos.
 * @returns {string} The full batch script content.
 */
function generateBatchLauncherScript(psFileName, scriptTitle = "Windows Security Configuration Script") {
    logToConsole(`Starting Batch launcher script generation for: ${psFileName}`, 'info');
    const batchContent = `
@echo off
REM ${scriptTitle} - Launcher
REM Version: ${APP_CONFIG.appVersion}
REM Build: ${APP_CONFIG.appBuild}
REM Generated on: ${new Date().toLocaleString()}

REM This batch file launches the PowerShell script.
REM It requires Administrator privileges to make system changes.

:: Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ====================================================================
    echo WARNING: This script needs to be run as an Administrator.
    echo Please RIGHT-CLICK this file and select "Run as administrator".
    echo ====================================================================
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================================================
echo Launching ${scriptTitle}...
echo ====================================================================

PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0${psFileName}"
if %errorlevel% neq 0 (
    echo.
    echo ====================================================================
    echo An error occurred during script execution.
    echo Please review the output above for error messages.
    echo ====================================================================
    pause
) else (
    echo.
    echo ====================================================================
    echo Script execution completed.
    echo Please review the output above for details and any reboot requirements.
    echo ====================================================================
    pause
)

exit /b 0
`;
    logToConsole('Batch launcher script content generated successfully.', 'info');
    return batchContent;
}

/**
 * Initiates the download of a file as a Blob.
 */
function downloadFile(content, fileName, mimeType) {
    logToConsole(`Attempting to download file: ${fileName} with MIME type: ${mimeType}`, 'info');
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logToConsole(`File download initiated for: ${fileName}`, 'info');
}

/**
 * Main function to generate and download APPLY configuration scripts.
 * @param {Array<Object>} featuresToConfigure - The features selected by the user, with their 'checked' state.
 */
function generateScripts(featuresToConfigure) {
    logToConsole('Initiating APPLY configuration script generation and download with randomized filenames.', 'info');

    const randomId = generateRandomString(10); // Use length 10 for robustness
    const psFileName = `${APP_CONFIG.generatedScriptNames.config}-${randomId}.ps1`; // Append random ID
    const batchFileName = `${APP_CONFIG.generatedScriptNames.launcher}-${randomId}.bat`; // Append random ID
    const zipFileName = `${APP_CONFIG.generatedScriptNames.config}-Package-${randomId}.zip`; // Include 'Package' for clarity

    logToConsole('Generating PowerShell APPLY script content...', 'info');
    const psScriptContent = generatePowerShellScript(featuresToConfigure);

    logToConsole('Generating Batch launcher script content for APPLY script...', 'info');
    // Pass the randomized PS filename to the batch script generator
    const batchScriptContent = generateBatchLauncherScript(psFileName, "Windows Security Configuration Script");

    logToConsole('Creating ZIP file for APPLY scripts...', 'info');
    if (typeof JSZip === 'undefined') {
        logToConsole('JSZip library not loaded.', 'error'); alert('JSZip library is missing.'); return;
    }

    const zip = new JSZip();
    zip.file(psFileName, psScriptContent);
    zip.file(batchFileName, batchScriptContent);

    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            logToConsole('APPLY script ZIP file generated.', 'info');
            downloadFile(content, zipFileName, 'application/zip');
            // Removed: alert('Your security configuration script package has been downloaded! Extract the ZIP and run the .bat as Administrator.');
        })
        .catch(error => {
            logToConsole(`Error generating APPLY script ZIP: ${error.message}`, 'error'); alert('Failed to generate script package.');
        });
}
window.generateScripts = generateScripts; // Expose for standard config scripts

/**
 * Main function to generate and download REVERT TO DEFAULT scripts.
 * @param {Array<Object>} allFeatures - All defined features from SECURITY_FEATURES_DATA.
 * @returns {string} The full PowerShell script content for reverting settings.
 */
function generateAndDownloadRevertScript(allFeatures) {
    logToConsole('Initiating REVERT TO DEFAULT script generation and download with randomized filenames.', 'info');

    const randomId = generateRandomString(10); // Use length 10 for robustness
    const psFileName = `${APP_CONFIG.generatedScriptNames.revert}-${randomId}.ps1`; // Append random ID
    const batchFileName = `${APP_CONFIG.generatedScriptNames.launcher}-${randomId}.bat`; // Append random ID
    const zipFileName = `${APP_CONFIG.generatedScriptNames.revert}-Package-${randomId}.zip`; // Include 'Package' for clarity

    logToConsole('Generating PowerShell REVERT TO DEFAULT script content...', 'info');
    const psScriptContent = generateRevertToDefaultPSScript(allFeatures);

    if (!psScriptContent) { // Might be null if no features were suitable for revert
        logToConsole('PowerShell REVERT script content is empty. Aborting download.', 'warn');
        alert('Could not generate the Revert to Default script as no suitable features were found or an error occurred.');
        return;
    }

    logToConsole('Generating Batch launcher script content for REVERT script...', 'info');
     // Pass the randomized PS filename to the batch script generator
    const batchScriptContent = generateBatchLauncherScript(psFileName, "Windows Security Restore Defaults Script");

    logToConsole('Creating ZIP file for REVERT scripts...', 'info');
    if (typeof JSZip === 'undefined') {
        logToConsole('JSZip library not loaded.', 'error'); alert('JSZip library is missing.'); return;
    }

    const zip = new JSZip();
    zip.file(psFileName, psScriptContent);
    zip.file(batchFileName, batchScriptContent);

    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            logToConsole('REVERT script ZIP file generated.', 'info');
            downloadFile(content, zipFileName, 'application/zip');
            // Removed: alert('Your \"Restore Defaults\" script package has been downloaded! Extract the ZIP and run the .bat as Administrator.');
        })
        .catch(error => {
            logToConsole(`Error generating REVERT script ZIP: ${error.message}`, 'error'); alert('Failed to generate Restore Defaults script package.');
        });
}
window.generateAndDownloadRevertScript = generateAndDownloadRevertScript; // Expose for revert scripts


logToConsole('generate_script_logic.js loaded (v1.30).', 'info');