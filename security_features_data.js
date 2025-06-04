// security_features_data.js
// Version: 1.1
// This file contains the structured data for all Windows security features
// that can be configured by the application.
// Each entry includes details for UI rendering, Group Policy/MDM mapping,
// and the specific registry keys for enabled/disabled states.

const SECURITY_FEATURES_DATA = [
    {
        id: 1,
        name: "Windows Defender: Real-Time Protection",
        description: "Continuously monitors files and processes for malicious activity. Disabling this significantly lowers your security posture.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\Real-time Protection\\Turn off real-time protection",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection",
                valueName: "DisableRealtimeMonitoring",
                type: "DWord",
                data: 0 // 0 means 'Enabled' for this policy
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection",
                valueName: "DisableRealtimeMonitoring",
                type: "DWord",
                data: 1 // 1 means 'Disabled' for this policy
            }
        },
        rebootRequired: false,
        securityImplication: "High: Stops active threat detection. Makes system vulnerable to all types of malware upon execution."
    },
    {
        id: 2,
        name: "Windows Defender: Cloud-Delivered Protection",
        description: "Sends suspicious samples to Microsoft's cloud for real-time analysis and blocking of new threats.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\MpEngine\\Allow cloud protection",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\MpEngine",
                valueName: "MpCloudProtection",
                type: "DWord",
                data: 1
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\MpEngine",
                valueName: "MpCloudProtection",
                type: "DWord",
                data: 0
            }
        },
        rebootRequired: false,
        securityImplication: "High: Reduces real-time protection against new, unknown threats (zero-days) by cutting off cloud intelligence."
    },
    {
        id: 3,
        name: "Windows Defender: PUA Protection",
        description: "Detects and blocks Potentially Unwanted Applications (PUAs) like adware and bloatware.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\PUA Protection",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender",
                valueName: "PUAProtection",
                type: "DWord",
                data: 1 // 1 means 'Enabled' for PUA Protection
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender",
                valueName: "PUAProtection",
                type: "DWord",
                data: 0 // 0 means 'Disabled' for PUA Protection
            }
        },
        rebootRequired: false,
        securityImplication: "Medium: Allows bloatware, adware, and other undesirable software to run unchecked."
    },
    {
        id: 4,
        name: "Windows Defender: Tamper Protection",
        description: "Prevents unauthorized changes to Microsoft Defender security settings and its essential files/processes.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\Tamper Protection\\Turn off Tamper Protection",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Microsoft\\Windows Defender\\Features", // This is a slightly different path than Policy, but is effective.
                valueName: "TamperProtection",
                type: "DWord",
                data: 0 // 0 means 'Enabled' for this specific registry key (counter-intuitive but common)
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Microsoft\\Windows Defender\\Features",
                valueName: "TamperProtection",
                type: "DWord",
                data: 1 // 1 means 'Disabled' for this specific registry key
            }
        },
        rebootRequired: false,
        securityImplication: "Critical: Allows malware or attackers to easily disable or modify Windows Defender without resistance."
    },
    {
        id: 5,
        name: "SmartScreen: For Apps & Files",
        description: "Protects against untrusted or malicious executables downloaded from the internet and launched outside a browser.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\SmartScreen\\Configure Windows Defender SmartScreen",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System",
                valueName: "EnableSmartScreen",
                type: "DWord",
                data: 1 // 1 for 'Warn' or 'Require approval' state which is "enabled" protection
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System",
                valueName: "EnableSmartScreen",
                type: "DWord",
                data: 0 // 0 means 'Off'
            }
        },
        rebootRequired: false,
        securityImplication: "High: Removes a critical layer of defense against untrusted or malicious executables. Users can easily launch unknown malware."
    },
    {
        id: 6,
        name: "SmartScreen: For Microsoft Edge",
        description: "Provides phishing and malware protection within the Microsoft Edge browser.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Microsoft Edge\\SmartScreen settings\\Configure Microsoft Defender SmartScreen",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
                valueName: "SmartScreenEnabled",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
                valueName: "SmartScreenEnabled",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: false,
        securityImplication: "High: Increases risk of navigating to malicious websites, downloading malware, or falling victim to phishing attacks via Edge."
    },
    {
        id: 7,
        name: "User Account Control (UAC)",
        description: "Requires explicit consent for administrative actions, preventing unauthorized system changes.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Windows Settings\\Security Settings\\Local Policies\\Security Options\\User Account Control: Run all administrators in Admin Approval Mode",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System",
                valueName: "EnableLUA",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System",
                valueName: "EnableLUA",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: true,
        securityImplication: "Critical: Removes a fundamental barrier against unauthorized privilege escalation. Any malware executed gains immediate administrative control."
    },
    {
        id: 8,
        name: "Virtualization-Based Security (VBS)",
        description: "Uses hardware virtualization to isolate critical system components and secrets (e.g., LSA credentials, kernel).",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\System\\Device Guard\\Turn On Virtualization Based Security",
        registry: {
            enabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard",
                valueName: "EnableVirtualizationBasedSecurity",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard",
                valueName: "EnableVirtualizationBasedSecurity",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: true,
        securityImplication: "Critical: Removes a robust layer of protection against kernel-mode malware and credential theft attacks."
    },
    {
        id: 9,
        name: "HVCI (Memory Integrity)",
        description: "Verifies all kernel-mode drivers and system files before they are loaded, ensuring they are properly signed and untampered.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\System\\Device Guard\\Turn On Virtualization Based Security",
        registry: {
            enabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity",
                valueName: "Enabled",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity",
                valueName: "Enabled",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: true,
        securityImplication: "Critical: Makes the kernel vulnerable to unsigned or maliciously modified drivers, common for privilege escalation and rootkits."
    },
    {
        id: 10,
        name: "Credential Guard",
        description: "Isolates LSA secrets (passwords, hashes) in a virtualized environment, protecting against theft.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\System\\Device Guard\\Turn On Virtualization Based Security",
        registry: {
            enabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\CredentialGuard",
                valueName: "Enabled",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\CredentialGuard",
                valueName: "Enabled",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: true,
        securityImplication: "Critical: Makes LSA secrets vulnerable to theft from a compromised OS, enabling lateral movement and privilege escalation."
    },
    {
        id: 11,
        name: "LSA Protection (RunAsPPL)",
        description: "Protects the Local Security Authority process (lsass.exe) from being injected into or tampered with.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Windows Settings\\Security Settings\\Local Policies\\Security Options\\Configure LSASS to run as a protected process",
        registry: {
            enabled: {

                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa",
                valueName: "RunAsPPL",
                type: "DWord",
                data: 1 // 1 means 'Enabled' (for this policy)
            },
            disabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa",
                valueName: "RunAsPPL",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: true,
        securityImplication: "Critical: Makes lsass.exe vulnerable to credential dumping attacks (e.g., Mimikatz), allowing extraction of sensitive information."
    },
    {
        id: 12,
        name: "Microsoft Vulnerable Driver Blocklist",
        description: "Prevents known insecure drivers from loading, which could otherwise be exploited for kernel-level compromise.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\System\\Driver Installation\\Turn off Microsoft vulnerable driver blocklist",
        registry: {
            enabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\CI\\Config",
                valueName: "VulnerableDriverBlocklistEnable",
                type: "DWord",
                data: 1 // 1 means 'Enabled' (the blocklist is active)
            },
            disabled: {
                path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\CI\\Config",
                valueName: "VulnerableDriverBlocklistEnable",
                type: "DWord",
                data: 0 // 0 means 'Disabled' (the blocklist is off)
            }
        },
        rebootRequired: true,
        securityImplication: "High: Allows known vulnerable drivers to load, creating pathways for kernel-level compromise and privilege escalation (BYOVD attacks)."
    },
    {
        id: 13,
        name: "Windows Defender: Automatic Sample Submission",
        description: "Controls whether suspicious files are automatically sent to Microsoft for analysis. Disabling this reduces cloud-based threat intelligence.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\Reporting\\Turn off automatic sample submission",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Reporting",
                valueName: "DisableSampleSubmission",
                type: "DWord",
                data: 0 // 0 means 'Enabled' (policy: 'Turn off' is disabled)
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Reporting",
                valueName: "DisableSampleSubmission",
                type: "DWord",
                data: 1 // 1 means 'Disabled' (policy: 'Turn off' is enabled)
            }
        },
        rebootRequired: false,
        securityImplication: "Medium: Prevents automatic analysis of new threats, potentially delaying protection against zero-day malware."
    },
    {
        id: 14,
        name: "Windows Defender: Cloud Block At First Seen",
        description: "Blocks suspicious files immediately upon first encounter based on cloud analysis, before full definition updates.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\MpEngine\\Configure the 'Block at First Sight' feature",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
                valueName: "DisableBlockAtFirstSeen",
                type: "DWord",
                data: 0 // 0 means 'Enabled' (policy: 'Disable' is off)
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
                valueName: "DisableBlockAtFirstSeen",
                type: "DWord",
                data: 1 // 1 means 'Disabled' (policy: 'Disable' is on)
            }
        },
        rebootRequired: false,
        securityImplication: "High: Increases risk of new, unknown malware executing before full analysis and definition updates are available."
    },
    {
        id: 15,
        name: "Windows Defender: MAPS Reporting",
        description: "Controls participation in Microsoft Active Protection Service (MAPS) for cloud-based threat intelligence.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\MAPS\\Join Microsoft MAPS",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
                valueName: "SpynetReporting",
                type: "DWord",
                data: 1 // 1 means Basic MAPS membership
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
                valueName: "SpynetReporting",
                type: "DWord",
                data: 0 // 0 means Disabled
            }
        },
        rebootRequired: false,
        securityImplication: "Medium: Reduces system's ability to receive rapid cloud-based threat intelligence updates."
    },
    {
        id: 16,
        name: "SmartScreen: Phishing Protection (Network Protection)",
        description: "Protects against phishing sites and malicious downloads at the network level, part of Exploit Guard.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Windows Defender Exploit Guard\\Network Protection\\Prevent users and apps from accessing dangerous websites",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Network Protection",
                valueName: "EnableNetworkProtection",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Network Protection",
                valueName: "EnableNetworkProtection",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: true,
        securityImplication: "High: Disables network-level protection against malicious websites, increasing risk of malware infection and data theft."
    },
    {
        id: 17,
        name: "SmartScreen: Warn about password reuse (Edge)",
        description: "Warns users if they are reusing passwords detected in a data breach within Microsoft Edge.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Microsoft Edge\\Password Manager\\Block password reuse in Microsoft Edge",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
                valueName: "PasswordManagerBlockReuse",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
                valueName: "PasswordManagerBlockReuse",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: false,
        securityImplication: "Low-Medium: Increases risk of account compromise if users reuse breached passwords."
    },
    {
        id: 18,
        name: "SmartScreen: Warn about unsafe password storage (Edge)",
        description: "Warns users if they are storing passwords in an insecure manner in Microsoft Edge.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Microsoft Edge\\Password Manager\\Block unsafe password storage in Microsoft Edge",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
                valueName: "PasswordManagerBlockUnsafeStorage",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge",
                valueName: "PasswordManagerBlockUnsafeStorage",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: false,
        securityImplication: "Low-Medium: Increases risk of password theft if stored insecurely."
    },
    {
        id: 19,
        name: "SmartScreen: For Microsoft Store apps",
        description: "Protects against malicious apps downloaded from the Microsoft Store or other sources.",
        defaultEnabled: true,
        groupPolicyPath: "User Configuration\\Administrative Templates\\Windows Components\\SmartScreen\\Configure Windows Defender SmartScreen for Microsoft Store apps",
        registry: {
            enabled: {
                path: "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppHost", // Note: HKCU path
                valueName: "EnableWebContentEvaluation",
                type: "DWord",
                data: 1 // 1 means 'Enabled'
            },
            disabled: {
                path: "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppHost", // Note: HKCU path
                valueName: "EnableWebContentEvaluation",
                type: "DWord",
                data: 0 // 0 means 'Disabled'
            }
        },
        rebootRequired: false,
        securityImplication: "High: Disables protection against malicious apps from the Microsoft Store, increasing risk of infection."
    },
    {
        id: 20,
        name: "Windows Defender: Automatic Sample Submission (Consent Level)",
        description: "Controls the level of consent for sending suspicious samples to Microsoft. This is managed via PowerShell cmdlet.",
        defaultEnabled: true,
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\MAPS\\Configure the 'Send file samples when further analysis is required' setting",
        registry: {
            enabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
                valueName: "SubmitSamplesConsent",
                type: "DWord",
                data: 3 // 3 means "Send all samples automatically" (most permissive ON)
            },
            disabled: {
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet",
                valueName: "SubmitSamplesConsent",
                type: "DWord",
                data: 2 // 2 means "Never send" (OFF)
            }
        },
        rebootRequired: false,
        securityImplication: "High: Affects the level of threat intelligence shared with Microsoft, impacting rapid response to new threats."
    },
    // --- NEW FEATURES FOR DOWNLOAD/ATTACHMENT SECURITY ---
    {
        id: 21, // Assign a new ID
        name: "Attachment Manager: Do not preserve zone information (Disables Mark-of-the-Web)",
        description: "Prevents Windows from adding the 'Mark-of-the-Web' to files downloaded from the Internet zone, reducing triggers for security checks on these files.",
        defaultEnabled: true, // Default Windows behavior is to preserve zone information (policy disabled)
        groupPolicyPath: "User Configuration\\Administrative Templates\\Windows Components\\Attachment Manager\\Do not preserve zone information in file attachments",
        registry: {
            enabled: { // This is the state where the policy is *NOT* enabled, meaning MotW IS preserved.
                path: "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Attachments",
                valueName: "SaveZoneInformation",
                type: "DWord",
                data: 0 // 0 means 'Disabled' for the policy (MotW is preserved) - This is the default Windows state.
            },
            disabled: { // This is the state where the policy IS enabled, meaning MotW is NOT preserved.
                path: "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Attachments",
                valueName: "SaveZoneInformation",
                type: "DWord",
                data: 1 // 1 means 'Enabled' for the policy (MotW is NOT preserved)
            }
        },
        rebootRequired: false, // Log out/in is usually sufficient
        securityImplication: "High: Disabling this makes Windows treat files downloaded from the internet the same as local files, bypassing security checks triggered by the file's origin."
    },
    {
        id: 22, // Assign a new ID
        name: "Windows Defender: Scan downloaded files and attachments",
        description: "Controls whether Microsoft Defender Antivirus scans files and attachments that have been downloaded.",
        defaultEnabled: true, // Default Windows behavior is to scan downloads (policy disabled)
        groupPolicyPath: "Computer Configuration\\Administrative Templates\\Windows Components\\Microsoft Defender Antivirus\\Scan downloaded files and attachments",
        registry: {
             enabled: { // This is the state where the policy is *NOT* enabled, meaning scanning IS performed.
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender",
                valueName: "DisableArchiveScanning",
                type: "DWord",
                data: 0 // 0 means 'Disabled' for the policy (Scanning IS performed) - This is the default Windows state.
            },
            disabled: { // This is the state where the policy IS enabled, meaning scanning is NOT performed.
                path: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender",
                valueName: "DisableArchiveScanning",
                type: "DWord",
                data: 1 // 1 means 'Enabled' for the policy (Scanning is NOT performed)
            }
        },
        rebootRequired: false, // No reboot typically required
        securityImplication: "Critical: Disabling this bypasses Defender's scanning for all downloaded content, including executables and archives."
    }
    // Note: SmartScreen for apps/files (id 5) and Edge SmartScreen (id 6) are already included and cover other aspects of download/execution checks.
];

logToConsole(`Loaded ${SECURITY_FEATURES_DATA.length} security feature definitions, including download/attachment security options.`, 'info');