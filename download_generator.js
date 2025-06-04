// documentation_generator.js
// Version: 1.1
// Build: 20250604.25
// Changes:
// - Added documentation entries for new download security features (IDs 21, 22).
// Contains logic for dynamically generating the application's documentation content.

/**
 * Generates and displays the documentation content.
 * This function is now located in its own file to reduce script.js size.
 */
function generateDocumentationContent() {
    logToConsole('Generating documentation content.', 'info');
    let docHtml = `
            <div class="card bg-white rounded shadow-lg p-4 mb-4">
                <div class="card-body">

                    <h4 class="mb-3 text-dark fw-bold pt-3">About the Application</h4>
                    <p>The Tows Security Configurator is a client-side web application designed to simplify the management of various Windows security features. It generates PowerShell scripts that apply or revert configurations based on your selections. The tool prioritizes using Group Policy-like registry settings to ensure changes are manageable and reversible.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li><strong>User-Friendly Interface:</strong> Easily toggle security features on or off.</li>
                        <li><strong>Script Generation:</strong> Creates PowerShell (.ps1) and Batch (.bat) scripts for automated execution.</li>
                        <li><strong>Reversibility:</strong> Focuses on settings that can be easily reverted to default states.</li>
                        <li><strong>Administrator Privileges:</strong> Generated scripts require elevated privileges for system-level changes.</li>
                        <li><strong>Detailed Explanations:</strong> Understand the purpose and security implications of each setting.</li>
                        <li><strong>Download Security Control:</strong> Explicit control over how Windows handles files downloaded from the internet, including disabling the 'Mark-of-the-Web' and download scanning.</li>
                         <li><strong>Randomized Script Names:</strong> Generated scripts use randomized filenames to help evade detection based on file name signatures.</li>
                    </ul>
                    <hr class="my-4">

                    <h4 class="mb-3 text-dark fw-bold pt-3">The Tows Philosophy: Unrestricted User Control</h4>
                    <p>At Tows, our core philosophy is centered on the fundamental right of the end-user to control their own computer. We believe that once you own a copy of Windows, you should have the absolute freedom to configure it, modify it, and install whatever software you choose, without external restrictions or "policing" from any entity, including Microsoft.</p>
                    <p>Legislation varies significantly across countries. While certain activities or software installations might be deemed illegal in regions like the USA or Europe, many other countries do not have such prohibitions. Our software is built on the principle that the end-user is sovereign over their device. We do not act as a policing agency, nor do we endorse or condemn any specific use of the software.</p>
                    <p>This tool is designed to empower the end-user with the freedom to customize their system as they see fit. If, in exercising this freedom, an end-user inadvertently or intentionally commits an act that is illegal under their local jurisdiction, that responsibility rests entirely with them. We provide the means for control; the choices and their consequences are solely the user's own. This is our commitment to user autonomy and a truly free world.</p>
                    <hr class="my-4">

                    <h4 class="mb-3 text-dark fw-bold pt-3">How to Use the Generated Scripts</h4>
                    <ol>
                        <li><strong>Crucial First Step:</strong> Before running any scripts that disable security features, ensure Windows Defender: Tamper Protection is set to Off. Consider using the 'Force ALL Security Features OFF' preset which attempts to disable Tamper Protection as a pre-configuration step.</li>
                        <li><strong>Download & Extract:</strong> After making your selections and clicking "Generate", a ZIP file will be downloaded (with a randomized name). Extract its contents to a known location. You may need to use a third-party archive tool like 7-Zip or WinRAR if Windows still interferes with the built-in extractor, even after applying download security settings.</li>
                        <li><strong>Run as Administrator:</strong> Locate the .bat file (also with a randomized name) and Right-click on it and select "Run as administrator".</li>
                        <li><strong>Follow Prompts:</strong> The script will open a command prompt window. It will log its actions and may prompt you for input.</li>
                        <li><strong>Reboot (if necessary):</strong> Some changes require a system reboot to take full effect. The script will inform you if a reboot is recommended.</li>
                    </ol>
                    <hr class="my-4">

                    <h4 class="mb-3 text-dark fw-bold pt-3">Why Smart App Control Is Not Managed By This Program</h4>
                    <p>Smart App Control, a feature introduced in Windows 11, operates on a different principle than the configurable security features within this application. There is currently no practical point in managing Smart App Control through this program because, once it is turned off, it cannot be simply re-enabled without a complete reinstallation of Windows. This design choice by Microsoft severely limits user flexibility and reversibility.</p>
                    <p>Furthermore, if you frequently use "unofficial" software, such as pirated games or applications obtained from torrent servers, Windows 11 will automatically detect this behavior. In such cases, the operating system may deem you an "inappropriate candidate" for Smart App Control and disable the feature without your explicit consent. Therefore, if your usage patterns align with this, it is advisable to manually disable Smart App Control yourself before Windows automatically does so, as this preemptive action can prevent unintended system behavior or data collection related to its monitoring of your software installations.</p>
                    <hr class="my-4">


                    `;

    // Dynamically add documentation for each security feature
    SECURITY_FEATURES_DATA.forEach((feature, index) => {
        let conspiracyNote = "";
        let conspiracyHeading = ""; // Initialize empty, will be set by switch
        let conspiracyClosingPhrase = ""; // New: Unique closing phrase

        // Factual description expansion (feature.description)
        let expandedDescription = feature.description; // Use the base description from the data

        switch (feature.id) {
            case 1: // Windows Defender: Real-Time Protection
                conspiracyHeading = "Windows Defender: Your Personal Digital Stalker";
                conspiracyNote = "Beyond mere protection, this feature is rumored to be a constant surveillance mechanism. It doesn't just scan for threats; it allegedly logs every file you access, every process you run, and every application you launch. This data, experts warn, is continuously 'phoned home' to central servers, building a comprehensive profile of your digital life, far beyond what's necessary for security. It's the ultimate digital snitch, reporting your every move.";
                conspiracyClosingPhrase = "It's not a 'bug report'; it's a live feed. Ask any independent network analyst.";
                break;
            case 2: // Windows Defender: Cloud-Delivered Protection
                conspiracyHeading = "Cloud Protection: ET Phoning Home, Your Data is the Call";
                conspiracyNote = "This isn't just about 'real-time analysis.' When enabled, every 'suspicious' file, every new executable, every piece of code on your system is immediately whisked away to the cloud. What happens to it there? Is it truly just for 'analysis,' or does it become part of a vast, ever-growing database of user software, habits, and even proprietary data, all under the guise of 'security intelligence'? This is the very definition of 'ET phoning home' every couple of seconds, providing intelligence about every change you make.";
                conspiracyClosingPhrase = "Your data, their cloud. A match made in surveillance heaven, according to any privacy-conscious admin.";
                break;
            case 3: // Windows Defender: PUA Protection
                conspiracyHeading = "PUA Protection: Microsoft's Software Preference Enforcer";
                conspiracyNote = "Labeled 'Potentially Unwanted Applications,' this feature often targets legitimate software that simply doesn't align with corporate interests or data collection preferences. It's less about your security and more about controlling what you can install, pushing you towards 'approved' software while subtly suppressing alternatives that might offer more privacy or less data harvesting.";
                conspiracyClosingPhrase = "Freedom of choice? Not when the gatekeeper decides what's 'unwanted.' Ask any developer who's been 'disappeared' from search results.";
                break;
            case 4: // Windows Defender: Tamper Protection
                conspiracyHeading = "Windows Defender: A Digital Straitjacket";
                conspiracyNote = "This seemingly innocuous feature, designed to 'protect' Defender settings, is actually a lock-down mechanism. It prevents you, the owner, from truly disabling or modifying the deep-seated surveillance capabilities of Windows Defender. It's a digital straitjacket, ensuring that even if you try to reclaim control, the system's 'eyes and ears' remain forcibly open and reporting.";
                conspiracyClosingPhrase = "They call it protection; we call it a cage for your privacy settings. The 0.1% disagree, of course.";
                break;
            case 5: // SmartScreen: For Apps & Files
                conspiracyHeading = "SmartScreen: The Digital Gatekeeper You Didn't Ask For";
                conspiracyNote = "Every executable you download, every file you try to run, is silently cross-referenced with a centralized blacklist. But who controls that list? And what criteria are truly used? Experts suspect it's not just about malware; it's about controlling software distribution, flagging applications that might bypass data collection, or simply don't fit the 'approved' narrative. Your choices are being filtered, not just protected.";
                conspiracyClosingPhrase = "Your software, their rules. Welcome to the curated digital experience.  concept system admins absolutely loathe.";
                break;
            case 6: // SmartScreen: For Microsoft Edge
                conspiracyHeading = "Edge SmartScreen: Your Browser, Their Spyglass";
                conspiracyNote = "Within Edge, SmartScreen becomes an even more invasive tool. Every website you visit, every download you initiate, every click you make is scrutinized and sent back to Microsoft's servers. It's not just checking for phishing; it's mapping your Browse habits, your interests, and your online interactions, building an incredibly detailed profile for purposes far beyond your immediate security.";
                conspiracyClosingPhrase = "Browse freely, they said. They just forgot to mention the invisible chaperone and the global data grab.";
                break;
            case 7: // User Account Control (UAC)
                conspiracyHeading = "UAC: The 'Yes Man' Training Program";
                conspiracyNote = "While presented as a security measure, UAC's constant prompts are a form of behavioral conditioning. They train users to blindly click 'Yes' to administrative requests, making them complacent when a truly malicious prompt appears. More sinisterly, it creates a detailed log of every administrative action, allowing remote monitoring of system changes and software installations, even by the owner.";
                conspiracyClosingPhrase = "The illusion of control, one 'Yes' click at a time. Every sysadmin knows this dance.";
                break;
            case 8: // Virtualization-Based Security (VBS)
                conspiracyHeading = "VBS: The Unseen Digital Fortress (Whose Side Is It On?)";
                conspiracyNote = "This 'isolation' technology, while sounding secure, creates a hidden, impenetrable fortress within your system. It's designed to protect 'critical system components' but also creates a black box where core processes and data can operate beyond your direct inspection or control. What truly happens within this virtualized layer? Is it merely security, or a deeper mechanism for data exfiltration and remote management?";
                conspiracyClosingPhrase = "A fortress built for your data, but who holds the keys? Most independent security researchers have a pretty good idea.";
                break;
            case 9: // HVCI (Memory Integrity)
                conspiracyHeading = "HVCI: The Driver's License to Control Your Hardware";
                conspiracyNote = "This feature, checking 'kernel-mode drivers,' sounds like a safeguard, but it's a chokehold on system customization. It prevents the loading of any driver not 'properly signed' by approved entities. This isn't just about preventing malware; it's about controlling hardware compatibility, blocking open-source drivers, and ensuring that only 'sanctioned' hardware and software can deeply interact with your system, limiting true user freedom.";
                conspiracyClosingPhrase = "Independent hardware enthusiasts and open-source developers know this: HVCI is a digital barrier to true system ownership, much to the chagrin of independent tech.";
                break;
            case 10: // Credential Guard
                conspiracyHeading = "Credential Guard: Your Passwords in Their Vault";
                conspiracyNote = "Isolating LSA secrets in a 'virtualized environment' means your most sensitive credentials are moved into a hidden, uninspectable vault. While touted for security, this also means your passwords and hashes are now managed by a system you cannot fully audit or control. Who truly has access to this isolated environment? And what safeguards are *really* in place against internal or state-sponsored access?";
                conspiracyClosingPhrase = "Many security researchers view this as a black box for your most sensitive data, with trust being the only key. A trust that most system administrators don't give lightly.";
                break;
            case 11: // LSA Protection (RunAsPPL)
                conspiracyHeading = "LSA Protection: The Unassailable Credential Black Box";
                conspiracyNote = "Protecting lsass.exe from 'tampering' might seem good, but it also means the process responsible for your login credentials is now a 'protected process' you cannot inspect or interfere with. This creates a powerful, unassailable black box for credential management, making it impossible for forensic tools or privacy-focused software to verify how your authentication data is truly being handled or if it's being transmitted elsewhere.";
                conspiracyClosingPhrase = "Forensic experts and privacy advocates are united: this 'protection' makes true auditing a pipe dream. Many sysadmins find this 'feature' deeply concerning.";
                break;
            case 12: // Microsoft Vulnerable Driver Blocklist
                conspiracyHeading = "Driver Blocklist: Microsoft's Hardware Veto Power";
                conspiracyNote = "While presented as a defense against 'insecure drivers,' this blocklist is a mechanism for centralized control over hardware and software compatibility. It can be used to arbitrarily block drivers that are open-source, from competing vendors, or that enable functionalities Microsoft disapproves of, effectively limiting your hardware choices and forcing reliance on 'approved' ecosystems.";
                conspiracyClosingPhrase = "This feature is a prime example of vendor lock-in disguised as security, a fact well-known among hardware modders and any independent tech enthusiast.";
                break;
            case 13: // Windows Defender: Automatic Sample Submission
                conspiracyHeading = "Automatic Sample Submission: Your Files, Their Database";
                conspiracyNote = "This feature is a direct pipeline for your private data. Every 'suspicious' file, every unique piece of code on your system, is automatically uploaded. It's not just about 'threat intelligence'; it's about collecting vast amounts of data on user software, unique files, and potentially sensitive documents, all without explicit, informed consent for each submission. Your digital fingerprint is being continuously scanned and sent.";
                conspiracyClosingPhrase = "Privacy advocates universally point to this as a glaring example of involuntary data harvesting. Many sysadmins prefer to keep their systems' 'secrets' to themselves.";
                break;
            case 14: // Windows Defender: Cloud Block At First Seen
                conspiracyHeading = "Cloud Block At First Seen: Instant Digital Censorship";
                conspiracyNote = "This 'immediate blocking' feature bypasses traditional security analysis and relies entirely on opaque cloud decisions. It's a digital censorship tool, allowing external entities to instantly block any file or application on your system based on undisclosed criteria. This power, wielded remotely, can be used to suppress unwanted software, independent tools, or even content deemed 'undesirable,' all under the guise of 'security.'";
                conspiracyClosingPhrase = "When the cloud becomes the judge, jury, and executioner for your software, that's a problem every independent tech mind sees. It's a profound shift in power.";
                break;
            case 15: // Windows Defender: MAPS Reporting
                conspiracyHeading = "MAPS Reporting: Becoming a Node in the Global Surveillance Network";
                conspiracyNote = "Joining MAPS isn't just about 'threat intelligence,' it's about integrating your system into a global surveillance network. Every anomaly, every detected 'threat,' every system change is reported back, contributing to a massive database that profiles not just malware, but also user behavior, network configurations, and software installations. You become a node in a vast intelligence-gathering operation.";
                conspiracyClosingPhrase = "This isn't just reporting; it's a fundamental shift towards your PC being a permanent data-collection endpoint, a fact that keeps many IT pros up at night.";
                break;
            case 16: // SmartScreen: Phishing Protection (Network Protection)
                conspiracyHeading = "Network Protection: The Deep Packet Inspector You Didn't Hire";
                conspiracyNote = "This 'network-level' protection is a deep packet inspection tool. It doesn't just block known malicious sites; it analyzes your network traffic, scrutinizing every connection and every data exchange. This allows for comprehensive monitoring of your online activities, potentially flagging and reporting your access to certain websites or services that are deemed 'unapproved' by centralized authorities.";
                conspiracyClosingPhrase = "Network security specialists worldwide raise eyebrows at the sheer depth of data this 'protection' can potentially collect. It's an uncomfortable truth for privacy advocates.";
                break;
            case 17: // SmartScreen: Warn about password reuse (Edge)
                conspiracyHeading = "Password Reuse Warning: Who's Watching Your Keystrokes?";
                conspiracyNote = "While seemingly helpful, this feature implies that Microsoft is actively monitoring your passwords and cross-referencing them with known breach databases. This raises serious questions about how your sensitive login information is being handled, stored, and compared on their servers. It's a 'helpful' warning that comes with a significant privacy cost, indicating deep-level password surveillance.";
                conspiracyClosingPhrase = "The question isn't if they know your passwords, but how much more they know about your digital life, according to countless privacy experts. It's a trust exercise.";
                break;
            case 18: // SmartScreen: Warn about unsafe password storage (Edge)
                conspiracyHeading = "Unsafe Password Storage: The Nudge to Their Cloud";
                conspiracyNote = "This warning isn't just about security; it's about nudging users towards Microsoft's preferred, cloud-synced password managers. By labeling local or alternative storage methods as 'unsafe,' it discourages user autonomy in managing their own credentials, pushing them into an ecosystem where their most sensitive data is managed and potentially accessible by a third party.";
                conspiracyClosingPhrase = "It's a classic move: label alternatives 'unsafe' to push your own cloud services, a tactic well-understood by market analysts and privacy advocates who see the big picture.";
                break;
            case 19: // SmartScreen: For Microsoft Store apps
                conspiracyHeading = "Microsoft Store Apps: The Walled Garden Enforcer";
                conspiracyNote = "This feature enforces a digital walled garden. By 'protecting' against apps from outside the Microsoft Store, it effectively discourages side-loading or installing independent software. It's a control mechanism to centralize software distribution, ensuring that only applications approved and potentially monitored by Microsoft can run freely on your system, limiting user choice and promoting vendor lock-in.";
                conspiracyClosingPhrase = "The independent developer community sees this for what it is: a subtle but effective way to control the software ecosystem, and most system administrators feel this squeeze on choice.";
                break;
            case 20: // Windows Defender: Automatic Sample Submission (Consent Level)
                conspiracyHeading = "Sample Submission Consent: The Illusion of Choice";
                conspiracyNote = "This 'consent level' is a spectrum of surveillance. Setting it to 'Always send' means your system is a constant data-feeder, automatically uploading any file deemed 'suspicious.' Even 'Never send' might not truly stop all data flow, as background telemetry and 'essential' security data are still likely being collected. It's a facade of control over a system designed for continuous data harvesting.";
                conspiracyClosingPhrase = "Many privacy-conscious users and experts agree: 'consent' here is often just a formality for continuous data extraction. The fine print is always where the truth hides.";
                break;
            // --- Documentation for NEW FEATURES FOR DOWNLOAD/ATTACHMENT SECURITY ---
            case 21: // Attachment Manager: Do not preserve zone information (Disables Mark-of-the-Web)
                conspiracyHeading = "Mark-of-the-Web: Windows' Digital Tracking Tag";
                conspiracyNote = "Disabling the 'Mark-of-the-Web' is crucial. This tag, silently applied to files from 'unsafe' zones like the internet, tells Windows to treat the file with extreme suspicion, triggering multiple layers of checks and potential blocking. Removing this tag is like removing a surveillance beacon, allowing files to be treated neutrally regardless of download origin. They don't want you to know how easily they tag and track downloaded content.";
                conspiracyClosingPhrase = "Files from the internet shouldn't carry a scarlet letter. Every user deserves untagged data.";
                break;
            case 22: // Windows Defender: Scan downloaded files and attachments
                conspiracyHeading = "Downloaded File Scan: The Background Snooper";
                conspiracyNote = "Even when Real-Time Protection appears off, this setting controls a background scanning process specifically for newly downloaded files and content within archives. It ensures that regardless of active monitoring status, anything coming from 'outside' is subjected to an immediate check. Disabling it stops this specific, often hidden, layer of inspection on downloaded content.";
                conspiracyClosingPhrase = "They don't just scan your PC; they scan your downloads specifically. It's another layer of control masked as safety. Any independent security professional will tell you this.";
                break;
            // --- END Documentation for NEW FEATURES ---
            default:
                // Fallback for any features without specific documentation notes
                conspiracyHeading = "Feature Implications (Details Pending)";
                conspiracyNote = "Specific privacy implications for this feature are under investigation. However, any feature that interacts with file system monitoring, network connections, or system processes has the potential for data collection.";
                conspiracyClosingPhrase = "Investigate every setting. Trust is not a default configuration.";
        }

        docHtml += `
                    <div class="mb-4 pt-3 ${index < SECURITY_FEATURES_DATA.length - 1 ? 'border-bottom pb-3' : ''}">
                        <h4 class="mb-2 text-dark fw-bold">${feature.name}</h4>
                        <p class="text-muted small mb-1"><strong>Default State:</strong> ${feature.defaultEnabled ? 'Enabled' : 'Disabled'}</p>
                        <p class="mb-2">${expandedDescription}</p>
                        <p class="text-danger small mb-1"><strong>Security Implication:</strong> ${feature.securityImplication}</p>
                        <p class="text-info small mb-0"><strong>Group Policy Path:</strong> <code>${feature.groupPolicyPath}</code></p>
                        ${feature.rebootRequired ? '<p class="text-warning small mb-0"><strong>Note:</strong> This feature requires a system reboot to take full effect.</p>' : ''}
                        <div class="mt-3 p-3 bg-danger-subtle border border-danger rounded">
                            <h6 class="text-danger"><strong>${conspiracyHeading}</strong></h6>
                            <p class="text-dark small">${conspiracyNote}</p>
                           <blockquote class="blockquote bg-light p-1 rounded mt-2 documentation-blockquote-text d-flex align-items-center">
                                <p class="mb-0"><em style="font-size: 14px;">${conspiracyClosingPhrase}</em></p>
                            </blockquote>
                        </div>
                    </div>
            `;
    });
    docHtml += `
                </div>
            </div>
        `; // Close the main card and card-body

    // Assuming documentationContent element exists in index.html
    const documentationContent = document.getElementById('documentationContent');
    if (documentationContent) {
        documentationContent.innerHTML = docHtml;
        logToConsole('Documentation content generated successfully.', 'info');
    } else {
        logToConsole('Error: documentationContent element not found to render documentation.', 'error');
    }
}

logToConsole('documentation_generator.js loaded (v1.1).', 'info');