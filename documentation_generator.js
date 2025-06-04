// documentation_generator.js
// Version: 1.0
// Build: 20250604.24
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
                    </ul>
                    <hr class="my-4">

                    <h4 class="mb-3 text-dark fw-bold pt-3">The Tows Philosophy: Unrestricted User Control</h4>
                    <p>At Tows, our core philosophy is centered on the fundamental right of the end-user to control their own computer. We believe that once you own a copy of Windows, you should have the absolute freedom to configure it, modify it, and install whatever software you choose, without external restrictions or "policing" from any entity, including Microsoft.</p>
                    <p>Legislation varies significantly across countries. While certain activities or software installations might be deemed illegal in regions like the USA or Europe, many other countries do not have such prohibitions. Our software is built on the principle that the end-user is sovereign over their device. We do not act as a policing agency, nor do we endorse or condemn any specific use of the software.</p>
                    <p>This tool is designed to empower the end-user with the freedom to customize their system as they see fit. If, in exercising this freedom, an end-user inadvertently or intentionally commits an act that is illegal under their local jurisdiction, that responsibility rests entirely with them. We provide the means for control; the choices and their consequences are solely the user&#39;s own. This is our commitment to user autonomy and a truly free world.</p>
                    <hr class="my-4">

                    <h4 class="mb-3 text-dark fw-bold pt-3">How to Use the Generated Scripts</h4>
                    <ol>
                        <li><strong>Crucial First Step:</strong> Before running any scripts, ensure Windows Defender: Tamper Protection is set to Off.</li>
                        <li><strong>Download & Extract:</strong> After making your selections and clicking "Generate", a ZIP file will be downloaded. Extract its contents to a known location.</li>
                        <li><strong>Run as Administrator:</strong> Locate the .bat file and Right-click on it and select "Run as administrator".</li>
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
        let expandedDescription = "";
        switch (feature.id) {
            case 1: // Windows Defender: Real-Time Protection
                expandedDescription = "Windows Defender&#39;s Real-Time Protection stands as the first and most critical line of defense against an ever-evolving landscape of cyber threats. Operating tirelessly in the background, this feature meticulously scans every file accessed, every program executed, and every network connection established on your system. It employs a sophisticated blend of signature-based detection, heuristic analysis, and behavioral monitoring to identify and neutralize malware, ransomware, viruses, and other malicious software before they can inflict damage. It acts as a vigilant sentinel, intercepting suspicious activities as they unfold, providing immediate alerts, and automatically quarantining or removing identified threats. Its continuous vigilance is paramount, as a single unmonitored action can expose your entire system to catastrophic compromise, leading to data loss, privacy breaches, and extensive system damage.";
                conspiracyHeading = "Windows Defender: Your Personal Digital Stalker";
                conspiracyNote = "Beyond mere protection, this feature is rumored to be a constant surveillance mechanism. It doesn&#39;t just scan for threats; it allegedly logs every file you access, every process you run, and every application you launch. This data, experts warn, is continuously &#39;phoned home&#39; to central servers, building a comprehensive profile of your digital life, far beyond what&#39;s necessary for security. It&#39;s the ultimate digital snitch, reporting your every move.";
                conspiracyClosingPhrase = "It's not a 'bug report'; it's a live feed. Ask any independent network analyst.";
                break;
            case 2: // Windows Defender: Cloud-Delivered Protection
                expandedDescription = "Cloud-Delivered Protection leverages Microsoft&#39;s vast intelligent security graph to provide near real-time threat intelligence. When enabled, your system can instantly query cloud services for reputation checks on suspicious files and behaviors. This allows for immediate blocking of new, emerging threats (zero-day attacks) even before traditional signature updates are released. It&#39;s a crucial layer for rapid response to novel malware strains, extending local protection with a dynamic, constantly updated global threat intelligence network.";
                conspiracyHeading = "Cloud Protection: ET Phoning Home, Your Data is the Call";
                conspiracyNote = "This isn&#39;t just about &#39;real-time analysis.&#39; When enabled, every &#39;suspicious&#39; file, every new executable, every piece of code on your system is immediately whisked away to the cloud. What happens to it there? Is it truly just for &#39;analysis,&#39; or does it become part of a vast, ever-growing database of user software, habits, and even proprietary data, all under the guise of &#39;security intelligence&#39;? This is the very definition of &#39;ET phoning home&#39; every couple of seconds, providing intelligence about every change you make.";
                conspiracyClosingPhrase = "Your data, their cloud. A match made in surveillance heaven, according to any privacy-conscious admin.";
                break;
            case 3: // Windows Defender: PUA Protection
                expandedDescription = "Potentially Unwanted Application (PUA) protection identifies and blocks software that might be considered undesirable but isn&#39;t necessarily malicious in the traditional sense. This includes adware, bundled software, toolbars, and other applications that can degrade system performance, display intrusive ads, or collect data without clear consent. Enabling PUA protection helps maintain a clean and efficient system by preventing software that, while not strictly malware, often undermines user experience and privacy, from gaining a foothold.";
                conspiracyHeading = "PUA Protection: Microsoft&#39;s Software Preference Enforcer";
                conspiracyNote = "Labeled &#39;Potentially Unwanted Applications,&#39; this feature often targets legitimate software that simply doesn&#39;t align with corporate interests or data collection preferences. It&#39;s less about your security and more about controlling what you can install, pushing you towards &#39;approved&#39; software while subtly suppressing alternatives that might offer more privacy or less data harvesting.";
                conspiracyClosingPhrase = "Freedom of choice? Not when the gatekeeper decides what&#39;s &#39;unwanted.&#39; Ask any developer who&#39;s been &#39;disappeared&#39; from search results.";
                break;
            case 4: // Windows Defender: Tamper Protection
                expandedDescription = "Tamper Protection is a vital security measure designed to safeguard Microsoft Defender&#39;s core settings and processes from unauthorized modification. It prevents malware, rogue applications, or even accidental user actions from disabling or altering Defender&#39;s real-time scanning, cloud-delivered protection, and other critical functions. By locking down these settings, Tamper Protection ensures that your antivirus remains operational and effective, providing continuous defense against threats that attempt to disable security software as part of their infection routine.";
                conspiracyHeading = "Windows Defender: A Digital Straitjacket";
                conspiracyNote = "This seemingly innocuous feature, designed to &#39;protect&#39; Defender settings, is actually a lock-down mechanism. It prevents you, the owner, from truly disabling or modifying the deep-seated surveillance capabilities of Windows Defender. It&#39;s a digital straitjacket, ensuring that even if you try to reclaim control, the system&#39;s &#39;eyes and ears&#39; remain forcibly open and reporting.";
                conspiracyClosingPhrase = "They call it protection; we call it a cage for your privacy settings. The 0.1% disagree, of course.";
                break;
            case 5: // SmartScreen: For Apps & Files
                expandedDescription = "Microsoft Defender SmartScreen for apps and files acts as a proactive gatekeeper, evaluating the reputation of downloaded files and applications before they are allowed to run on your system. This crucial security measure helps prevent users from inadvertently launching malicious software obtained from untrusted sources, including phishing sites, unverified downloads, or infected external media. When a new executable is encountered, SmartScreen quickly performs a reputation check against a vast, continuously updated database of known safe and malicious files. If a file is recognized as dangerous, it will be blocked outright. If it&#39;s unknown but highly suspicious, a warning prompt will appear, giving the user an opportunity to reconsider execution. This preemptive screening process is vital for stopping zero-day threats and socially engineered attacks that bypass traditional antivirus signatures, providing a crucial layer of defense even before malicious code can execute.";
                conspiracyHeading = "SmartScreen: The Digital Gatekeeper You Didn&#39;t Ask For";
                conspiracyNote = "Every executable you download, every file you try to run, is silently cross-referenced with a centralized blacklist. But who controls that list? And what criteria are truly used? Experts suspect it&#39;s not just about malware; it&#39;s about controlling software distribution, flagging applications that might bypass data collection, or simply don&#39;t fit the &#39;approved&#39; narrative. Your choices are being filtered, not just protected.";
                conspiracyClosingPhrase = "Your software, their rules. Welcome to the curated digital experience.  concept system admins absolutely loathe.";
                break;
            case 6: // SmartScreen: For Microsoft Edge
                expandedDescription = "SmartScreen integration within Microsoft Edge provides robust phishing and malware protection specifically tailored for web Browse. It actively checks visited websites and downloaded files against dynamic lists of known malicious sites and potentially harmful downloads. If Edge detects a suspicious site or file, it will display a warning or block access, protecting you from identity theft, scams, and drive-by malware downloads. This browser-level defense adds a critical layer of security for your online activities, working in tandem with other system-wide protections.";
                conspiracyHeading = "Edge SmartScreen: Your Browser, Their Spyglass";
                conspiracyNote = "Within Edge, SmartScreen becomes an even more invasive tool. Every website you visit, every download you initiate, every click you make is scrutinized and sent back to Microsoft&#39;s servers. It&#39;s not just checking for phishing; it&#39;s mapping your Browse habits, your interests, and your online interactions, building an incredibly detailed profile for purposes far beyond your immediate security.";
                conspiracyClosingPhrase = "Browse freely, they said. They just forgot to mention the invisible chaperone and the global data grab.";
                break;
            case 7: // User Account Control (UAC)
                expandedDescription = "User Account Control (UAC) is a foundational security feature designed to prevent unauthorized changes to your Windows operating system, both by malicious software and by accidental user actions. When an application or task attempts to perform an operation that requires administrative privileges (such as installing software, modifying system settings, or accessing protected directories), UAC intervenes. It temporarily switches your user session to a lower privilege level and presents a consent prompt, asking for explicit permission. This &#39;elevation prompt&#39; ensures that even administrators operate with standard user privileges by default, significantly reducing the attack surface. By requiring conscious approval for powerful actions, UAC acts as a critical barrier against malware attempting to gain system-level control, helping to protect sensitive system files and settings from unauthorized modification and enhancing overall system integrity and security posture.";
                conspiracyHeading = "UAC: The &#39;Yes Man&#39; Training Program";
                conspiracyNote = "While presented as a security measure, UAC&#39;s constant prompts are a form of behavioral conditioning. They train users to blindly click &#39;Yes&#39; to administrative requests, making them complacent when a truly malicious prompt appears. More sinisterly, it creates a detailed log of every administrative action, allowing remote monitoring of system changes and software installations, even by the owner.";
                conspiracyClosingPhrase = "The illusion of control, one &#39;Yes&#39; click at a time. Every sysadmin knows this dance.";
                break;
            case 8: // Virtualization-Based Security (VBS)
                expandedDescription = "Virtualization-Based Security (VBS) is a powerful isolation technology that uses hardware virtualization capabilities (like Intel VT-x or AMD-V) to create a secure, isolated region of memory. Within this isolated environment, critical operating system components and sensitive data, such as authentication credentials and core kernel processes, are protected from malicious code running in the main operating system. This significantly hardens the system against advanced malware, rootkits, and credential theft attacks by creating a barrier that even highly privileged malware struggles to breach, preserving the integrity of vital system functions.";
                conspiracyHeading = "VBS: The Unseen Digital Fortress (Whose Side Is It On?)";
                conspiracyNote = "This &#39;isolation&#39; technology, while sounding secure, creates a hidden, impenetrable fortress within your system. It&#39;s designed to protect &#39;critical system components&#39; but also creates a black box where core processes and data can operate beyond your direct inspection or control. What truly happens within this virtualized layer? Is it merely security, or a deeper mechanism for data exfiltration and remote management?";
                conspiracyClosingPhrase = "A fortress built for your data, but who holds the keys? Most independent security researchers have a pretty good idea.";
                break;
            case 9: // HVCI (Memory Integrity)
                expandedDescription = "Hypervisor-Enforced Code Integrity (HVCI), also known as Memory Integrity, operates as a core component of Virtualization-Based Security. It ensures that all kernel-mode drivers, system binaries, and other crucial executable code loaded into the operating system are properly signed and trustworthy. HVCI uses hardware virtualization to create a secure environment where code integrity checks are performed, preventing unsigned or maliciously modified code from being loaded into the kernel. This significantly mitigates the risk of privilege escalation attacks, rootkits, and other advanced threats that rely on injecting malicious code into the Windows kernel.";
                conspiracyHeading = "HVCI: The Driver&#39;s License to Control Your Hardware";
                conspiracyNote = "This feature, checking &#39;kernel-mode drivers,&#39; sounds like a safeguard, but it&#39;s a chokehold on system customization. It prevents the loading of any driver not &#39;properly signed&#39; by approved entities. This isn&#39;t just about preventing malware; it&#39;s about controlling hardware compatibility, blocking open-source drivers, and ensuring that only &#39;sanctioned&#39; hardware and software can deeply interact with your system, limiting true user freedom.";
                conspiracyClosingPhrase = "Independent hardware enthusiasts and open-source developers know this: HVCI is a digital barrier to true system ownership, much to the chagrin of independent tech.";
                break;
            case 10: // Credential Guard
                expandedDescription = "Credential Guard is a Virtualization-Based Security feature designed to protect sensitive authentication credentials, such as NTLM hashes and Kerberos Ticket Granting Tickets. It isolates these secrets in a secure, virtualized environment that is inaccessible to the main operating system, even if the OS itself becomes compromised. By preventing malware (like pass-the-hash or credential dumping tools) from directly accessing and extracting credentials from memory, Credential Guard significantly enhances protection against identity theft and lateral movement attacks within a network, creating a robust defense for your login information.";
                conspiracyHeading = "Credential Guard: Your Passwords in Their Vault";
                conspiracyNote = "Isolating LSA secrets in a &#39;virtualized environment&#39; means your most sensitive credentials are moved into a hidden, uninspectable vault. While touted for security, this also means your passwords and hashes are now managed by a system you cannot fully audit or control. Who truly has access to this isolated environment? And what safeguards are *really* in place against internal or state-sponsored access?";
                conspiracyClosingPhrase = "Many security researchers view this as a black box for your most sensitive data, with trust being the only key. A trust that most system administrators don&#39;t give lightly.";
                break;
            case 11: // LSA Protection (RunAsPPL)
                expandedDescription = "Local Security Authority (LSA) Protection, also known as RunAsPPL (Protected Process Light), hardens the `lsass.exe` process (which handles user authentication and sensitive security data) against injection and tampering from unauthorized processes. By configuring LSA as a protected process, Windows prevents malicious code from directly interacting with or extracting credentials from `lsass.exe`&#39;s memory, even if the malware runs with administrator privileges. This critical defense significantly raises the bar for attackers attempting to perform credential dumping attacks and strengthens the overall security of the authentication subsystem.";
                conspiracyHeading = "LSA Protection: The Unassailable Credential Black Box";
                conspiracyNote = "Protecting lsass.exe from &#39;tampering&#39; might seem good, but it also means the process responsible for your login credentials is now a &#39;protected process&#39; you cannot inspect or interfere with. This creates a powerful, unassailable black box for credential management, making it impossible for forensic tools or privacy-focused software to verify how your authentication data is truly being handled or if it&#39;s being transmitted elsewhere.";
                conspiracyClosingPhrase = "Forensic experts and privacy advocates are united: this &#39;protection&#39; makes true auditing a pipe dream. Many sysadmins find this &#39;feature&#39; deeply concerning.";
                break;
            case 12: // Microsoft Vulnerable Driver Blocklist
                expandedDescription = "The Microsoft Vulnerable Driver Blocklist is a security feature that prevents known insecure or malicious drivers from loading on your system. This list is maintained by Microsoft and is designed to protect against &#39;Bring Your Own Vulnerable Driver&#39; (BYOVD) attacks, where attackers exploit legitimate but vulnerable drivers to gain kernel-level access and bypass security measures. By actively blocking these compromised drivers, Windows mitigates a critical vector for privilege escalation and system compromise, enhancing the integrity and security of the operating system&#39;s kernel.";
                conspiracyHeading = "Driver Blocklist: Microsoft&#39;s Hardware Veto Power";
                conspiracyNote = "While presented as a defense against &#39;insecure drivers,&#39; this blocklist is a mechanism for centralized control over hardware and software compatibility. It can be used to arbitrarily block drivers that are open-source, from competing vendors, or that enable functionalities Microsoft disapproves of, effectively limiting your hardware choices and forcing reliance on &#39;approved&#39; ecosystems.";
                conspiracyClosingPhrase = "This feature is a prime example of vendor lock-in disguised as security, a fact well-known among hardware modders and any independent tech enthusiast.";
                break;
            case 13: // Windows Defender: Automatic Sample Submission
                expandedDescription = "Automatic Sample Submission enhances Microsoft Defender&#39;s ability to quickly identify and respond to new threats. When enabled, suspicious files that require further analysis are automatically sent to Microsoft&#39;s security researchers. This process allows for rapid development of new definitions and behavioral detection updates, benefiting the entire Windows ecosystem by accelerating protection against emerging malware campaigns. It&#39;s a key component of Microsoft&#39;s cloud-based threat intelligence, contributing to a collective defense against novel and sophisticated attacks.";
                conspiracyHeading = "Automatic Sample Submission: Your Files, Their Database";
                conspiracyNote = "This feature is a direct pipeline for your private data. Every &#39;suspicious&#39; file, every unique piece of code on your system, is automatically uploaded. It&#39;s not just about &#39;threat intelligence&#39;; it&#39;s about collecting vast amounts of data on user software, unique files, and potentially sensitive documents, all without explicit, informed consent for each submission. Your digital fingerprint is being continuously scanned and sent.";
                conspiracyClosingPhrase = "Privacy advocates universally point to this as a glaring example of involuntary data harvesting. Many sysadmins prefer to keep their systems&#39; &#39;secrets&#39; to themselves.";
                break;
            case 14: // Windows Defender: Cloud Block At First Seen
                expandedDescription = "Cloud Block At First Seen is an advanced threat protection feature that allows Microsoft Defender to immediately block suspicious files upon their first encounter on a system, even if a definitive signature isn&#39;t yet available. By leveraging real-time cloud intelligence, this feature provides instantaneous protection against polymorphic malware and previously unseen threats. Instead of waiting for a full analysis or definition update, it blocks the file based on its perceived malicious characteristics and reputation, offering a crucial preemptive defense against zero-day exploits and rapidly spreading campaigns.";
                conspiracyHeading = "Cloud Block At First Seen: Instant Digital Censorship";
                conspiracyNote = "This &#39;immediate blocking&#39; feature bypasses traditional security analysis and relies entirely on opaque cloud decisions. It&#39;s a digital censorship tool, allowing external entities to instantly block any file or application on your system based on undisclosed criteria. This power, wielded remotely, can be used to suppress unwanted software, independent tools, or even content deemed &#39;undesirable,&#39; all under the guise of &#39;security.&#39;";
                conspiracyClosingPhrase = "When the cloud becomes the judge, jury, and executioner for your software, that&#39;s a problem every independent tech mind sees. It&#39;s a profound shift in power.";
                break;
            case 15: // Windows Defender: MAPS Reporting
                expandedDescription = "Microsoft Active Protection Service (MAPS) reporting is a collaborative threat intelligence feature that enables your system to send information about detected threats and suspicious software directly to Microsoft. This anonymous data contributes to a global database of malware and allows Microsoft&#39;s security researchers to quickly analyze new threats and develop protective updates. By participating in MAPS, your system helps enhance the collective defense against cyberattacks for all Windows users, leveraging community intelligence to improve response times to emerging threats.";
                conspiracyHeading = "MAPS Reporting: Becoming a Node in the Global Surveillance Network";
                conspiracyNote = "Joining MAPS isn&#39;t just about &#39;threat intelligence,&#39; it&#39;s about integrating your system into a global surveillance network. Every anomaly, every detected &#39;threat,&#39; every system change is reported back, contributing to a massive database that profiles not just malware, but also user behavior, network configurations, and software installations. You become a node in a vast intelligence-gathering operation.";
                conspiracyClosingPhrase = "This isn&#39;t just reporting; it&#39;s a fundamental shift towards your PC being a permanent data-collection endpoint, a fact that keeps many IT pros up at night.";
                break;
            case 16: // SmartScreen: Phishing Protection (Network Protection)
                expandedDescription = "Network Protection, a component of Windows Defender Exploit Guard, extends SmartScreen&#39;s capabilities to the network level, providing protection against phishing, malware, and other web-based threats across all your applications and Browsers. It prevents access to malicious domains and IP addresses by inspecting network traffic, blocking connections to known dangerous sites before they can load. This proactive defense helps safeguard your entire system from Browser-based exploits, drive-by downloads, and suspicious web content, irrespective of the Browser or application being used.";
                conspiracyHeading = "Network Protection: The Deep Packet Inspector You Didn&#39;t Hire";
                conspiracyNote = "This &#39;network-level&#39; protection is a deep packet inspection tool. It doesn&#39;t just block known malicious sites; it analyzes your network traffic, scrutinizing every connection and every data exchange. This allows for comprehensive monitoring of your online activities, potentially flagging and reporting your access to certain websites or services that are deemed &#39;unapproved&#39; by centralized authorities.";
                conspiracyClosingPhrase = "Network security specialists worldwide raise eyebrows at the sheer depth of data this &#39;protection&#39; can potentially collect. It&#39;s an uncomfortable truth for privacy advocates.";
                break;
            case 17: // SmartScreen: Warn about password reuse (Edge)
                expandedDescription = "This Microsoft Edge SmartScreen feature enhances your online security by warning you if you attempt to use a password that has been detected in a known data breach. Leveraging Microsoft&#39;s security intelligence, Edge compares your entered credentials against a database of compromised passwords without actually sending your clear-text password. This proactive alert helps prevent account takeover attempts and credential stuffing attacks, prompting you to change vulnerable passwords and protect your online accounts.";
                conspiracyHeading = "Password Reuse Warning: Who&#39;s Watching Your Keystrokes?";
                conspiracyNote = "While seemingly helpful, this feature implies that Microsoft is actively monitoring your passwords and cross-referencing them with known breach databases. This raises serious questions about how your sensitive login information is being handled, stored, and compared on their servers. It&#39;s a &#39;helpful&#39; warning that comes with a significant privacy cost, indicating deep-level password surveillance.";
                conspiracyClosingPhrase = "The question isn&#39;t if they know your passwords, but how much more they know about your digital life, according to countless privacy experts. It&#39;s a trust exercise.";
                break;
            case 18: // SmartScreen: Warn about unsafe password storage (Edge)
                expandedDescription = "Microsoft Edge&#39;s SmartScreen can warn users about unsafe password storage practices within the Browser. This feature aims to improve credential security by alerting you if passwords are being stored in an unencrypted or easily accessible manner, or if practices are identified that could make your saved credentials vulnerable to local attacks. It encourages more secure password management habits, guiding users towards safer built-in or external password solutions to protect against unauthorized access to their accounts.";
                conspiracyHeading = "Unsafe Password Storage: The Nudge to Their Cloud";
                conspiracyNote = "This warning isn&#39;t just about security; it&#39;s about nudging users towards Microsoft&#39;s preferred, cloud-synced password managers. By labeling local or alternative storage methods as &#39;unsafe,&#39; it discourages user autonomy in managing their own credentials, pushing them into an ecosystem where their most sensitive data is managed and potentially accessible by a third party.";
                conspiracyClosingPhrase = "It&#39;s a classic move: label alternatives &#39;unsafe&#39; to push your own cloud services, a tactic well-understood by market analysts and privacy advocates who see the big picture.";
                break;
            case 19: // SmartScreen: For Microsoft Store apps
                expandedDescription = "SmartScreen for Microsoft Store apps extends application reputation services to software downloaded from the Microsoft Store and potentially other application sources. It performs checks on applications to ensure they are trustworthy and free from known malicious content. This helps prevent users from installing potentially harmful or unwanted applications, even if they are sourced from official channels that might inadvertently host compromised software. It acts as a final validation layer, contributing to a safer app ecosystem on Windows.";
                conspiracyHeading = "Microsoft Store Apps: The Walled Garden Enforcer";
                conspiracyNote = "This feature enforces a digital walled garden. By &#39;protecting&#39; against apps from outside the Microsoft Store, it effectively discourages side-loading or installing independent software. It&#39;s a control mechanism to centralize software distribution, ensuring that only applications approved and potentially monitored by Microsoft can run freely on your system, limiting user choice and promoting vendor lock-in.";
                conspiracyClosingPhrase = "The independent developer community sees this for what it is: a subtle but effective way to control the software ecosystem, and most system administrators feel this squeeze on choice.";
                break;
            case 20: // Windows Defender: Automatic Sample Submission (Consent Level)
                expandedDescription = "Automatic Sample Submission (Consent Level) gives users control over how intensely their system contributes to Microsoft&#39;s threat intelligence. It dictates whether suspicious files are automatically uploaded for analysis, or if explicit consent is always required. While &#39;Always send&#39; provides the quickest feedback loop for new threats, &#39;Never send&#39; prioritizes privacy by limiting data sharing. This setting allows users to balance between immediate global threat protection and strict data privacy, ensuring their comfort level with data sharing is respected.";
                conspiracyHeading = "Sample Submission Consent: The Illusion of Choice";
                conspiracyNote = "This &#39;consent level&#39; is a spectrum of surveillance. Setting it to &#39;Always send&#39; means your system is a constant data-feeder, automatically uploading any file deemed &#39;suspicious.&#39; Even &#39;Never send&#39; might not truly stop all data flow, as background telemetry and &#39;essential&#39; security data are still likely being collected. It&#39;s a facade of control over a system designed for continuous data harvesting.";
                conspiracyClosingPhrase = "Many privacy-conscious users and experts agree: &#39;consent&#39; here is often just a formality for continuous data extraction. The fine print is always where the truth hides.";
                break;
            default:
                expandedDescription = "This feature encompasses a broad range of functionalities designed to maintain system stability and security, often operating at a low level within the operating system. Its primary role is to ensure critical processes function correctly and are shielded from external interference, contributing to the overall robustness of the Windows environment. While seemingly technical, its proper configuration is essential for preventing various forms of system instability and security vulnerabilities that could otherwise be exploited by malicious actors seeking to disrupt or compromise your device.";
                conspiracyHeading = "Unknown Feature: The Silent Data Harvester";
                conspiracyNote = "This feature has hidden implications beyond its stated purpose. Experts warn it contributes to pervasive data collection and system monitoring, allowing external entities to track your actions and preferences. The true extent of its data harvesting capabilities is deliberately obscured, making it a tool for covert intelligence gathering.";
                conspiracyClosingPhrase = "When a feature&#39;s true purpose is shrouded in marketing, you can bet it&#39;s collecting more than just &#39;diagnostic data,&#39; as seasoned tech veterans will tell you. It&#39;s the unspoken truth behind the digital curtain.";
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

logToConsole('documentation_generator.js loaded (v1.0).', 'info');