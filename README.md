# Windows Security Configurator

**Version: 1.1**
**Build: 20250604.1**
**Changes:**
- Added control over file and download security features (Mark-of-the-Web, download scanning).
- Implemented randomized filenames for generated scripts to help evade detection.

This application provides a user-friendly interface to configure various Windows security features, prioritizing Group Policy and MDM principles for controlled and reversible management. It's designed to help you adjust settings related to Windows Defender, SmartScreen, User Account Control (UAC), Virtualization-Based Security (VBS), and other system mitigations.

## How to Use

1.  **Access the Application:** Open the `index.html` file in your web browser. This application runs entirely client-side, so you don't need a special web server to use it locally.
2.  **Select Your Configurations:** The application will display a list of Windows security features. Each feature will have a toggle (checkbox or slider) to enable or disable it.
    *   **Review Descriptions:** Read the descriptions for each feature carefully to understand its purpose and security implications.
    *   **Toggle Settings:** Adjust the toggles according to your desired security posture.
3.  **Generate Scripts:** Once you have made your selections, click the "Generate" button (labeled "Generate Configuration Script" or similar in the UI).
4.  **Download and Extract:** Your browser will download a `.zip` file with a randomized name (e.g., `WindowsSecurityConfig-randomstring.zip` or `WindowsSecurityRevert-randomstring.zip`).
    *   **Extract this ZIP file** to a location on your computer, such as your Desktop. You may find that disabling the "Attachment Manager: Do not preserve zone information" feature within the application helps prevent Windows from interfering with extraction. Using a third-party archive tool like 7-Zip or WinRAR may also bypass these checks.
    *   Inside the ZIP file, you will find two files with randomized names:
        *   A PowerShell script (`.ps1`)
        *   A Batch launcher script (`.bat`)
5.  **Run the Configuration:**
    *   **IMPORTANT:** You must run the batch file with Administrator privileges.
    *   **Right-click** on the generated `.bat` file.
    *   Select **"Run as administrator"**.
    *   Windows User Account Control (UAC) might prompt you for confirmation; click "Yes" to allow it.
    *   A command prompt window will open, and the script will execute. It will log its actions to the console.
    *   **Pay attention to any messages in the command prompt**, especially if it indicates that a reboot is required for changes to take full effect.
    *   Press Enter to close the command prompt window when prompted.

## Key Features

*   **User-Friendly Interface:** Easily toggle security features on or off.
*   **Script Generation:** Creates PowerShell (`.ps1`) and Batch (`.bat`) scripts for automated execution.
*   **Reversibility:** Focuses on settings that can be easily reverted to default states.
*   **Administrator Privileges:** Generated scripts require elevated privileges for system-level changes.
*   **Detailed Explanations:** Understand the purpose and security implications of each setting.
*   **Download Security Control:** Explicit control over how Windows handles files downloaded from the internet, including disabling the 'Mark-of-the-Web' and download scanning.
*   **Randomized Script Names:** Generated scripts use randomized filenames to help evade detection based on file name signatures.
*   **Global Presets:** Easily apply "Force ON", "Force OFF", or "Restore Defaults" configurations.

## Reverting Changes

Use the "Restore Windows Defaults (Remove Policies)" option from the Global Configuration Presets dropdown. This will generate a special script designed to remove the policy enforcements set by this application, returning control over those settings back to Windows defaults or user control via the Windows Security interface.

## Important Security Notes

*   **Administrator Privileges:** The generated scripts modify system-level settings and therefore **require Administrator privileges** to run.
*   **Reboots:** Some changes, particularly those related to Virtualization-Based Security (VBS), UAC, driver blocklists, and certain download security settings, require a system reboot or logging out/in to take full effect. The script will inform you if a reboot is recommended.
*   **Understand the Implications:** Disabling security features can significantly reduce your system's protection against malware, exploits, and data theft. **This is especially true for the File & Download Security features.** Ensure you understand the security implications of each setting before making changes.
*   **Backup:** It is always recommended to create a system restore point or a full backup before applying significant system changes.
*   **Smart App Control:** Note that Smart App Control (in Windows 11) is not managed by this tool as it often requires a Windows reinstallation to re-enable once turned off. Disabling it manually before using this tool may be necessary depending on your usage patterns.

---
*Generated by AI Instance with your guidance.*