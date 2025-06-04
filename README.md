
***<u>Ensure the switch next to "Tamper Protection" is in the "Off" position before proceeding!</u>***

---LIVE EXAMPLE--- https://www.tows.top

## 🚀 **How to Use TOWS**

Follow these steps to configure your Windows security settings:

1.  🌐 **Access the Application:** Open the `index.html` file in your web browser. TOWS runs entirely client-side – no server needed!
2.  ⚙️ **Select Your Configurations:** The intuitive interface presents a list of Windows security features.
    *   ✨ _Browse and Read:_ Carefully review the description and security implications for each feature. Understanding the impact of disabling a setting is crucial.
    *   🖱️ _Toggle Away:_ Use the toggles to set each feature to your desired state (Enabled/Disabled).
3.  🔧 **Generate Scripts:** Once your selections are made, click the prominent **"Generate"** button.
4.  📦 **Download and Extract:** Your browser will download a `.zip` file with a **randomized, unique name** (e.g., `WindowsSecurityConfig-randomstring.zip` or `WindowsSecurityRevert-randomstring.zip`). This helps avoid detection based on static filenames.
    *   📂 _Extract Here:_ Extract the contents of this ZIP file to a convenient location (like your Desktop).
    *   🔍 _Find the Files:_ Inside the extracted folder, you'll find two files, also with **randomized names**: a PowerShell script (`.ps1`) and a Batch launcher script (`.bat`).
5.  ▶️ **Run the Configuration (as Administrator):**
    *   ⚠️ _Elevated Access Required:_ The generated scripts modify system settings and **MUST be run with Administrator privileges**.
    *   🖱️ _Right-Click & Run:_ **Right-click** on the generated **`.bat`** file.
    *   ✅ _Confirm:_ Select **"Run as administrator"**. Confirm the User Account Control (UAC) prompt if it appears.
    *   🖥️ _Observe:_ A command prompt window will open, showing the script's execution logs.
    *   🔄 _Reboot if Needed:_ Pay close attention to the script's output. It will inform you if a **system reboot** is required for some changes (especially Core Isolation features like VBS, HVCI, Credential Guard, LSA Protection) to take full effect.
    *   ↩️ _Finish:_ Press Enter when prompted to close the command prompt.

---

## ✨ **Key Features at a Glance**

*   🖱️ **Intuitive UI:** Effortlessly manage complex settings via a clean web interface.
*   📜 **Automated Scripting:** Generates ready-to-run PowerShell and Batch scripts.
*   🔄 **Reversibility Focus:** Employs Group Policy-like registry changes for easy restoration.
*   🔑 **Administrator Power:** Scripts are designed for necessary elevated execution.
*   📚 **Detailed Documentation:** Understand each setting with built-in explanations.
*   ⬇️ **Download Security Control:** Explicitly disable mechanisms like the 'Mark-of-the-Web' and download scanning that interfere with downloaded files.
*   🎲 **Randomized Script Names:** Enhances privacy and helps evade detection based on static filenames.
*   Presets: Apply "Force ON", "Force OFF", or "Restore Defaults" configurations with a single click.

---

## ↩️ **Reverting Changes**

Want to revert your configurations or restore Windows defaults?

Navigate back to the TOWS application interface in your browser. From the "Global Configuration Presets" dropdown, select:

*   **"Restore Windows Defaults (Remove Policies)"**

Click **"Generate"**. This will produce a special script package designed to **remove** the policy enforcements set by TOWS, returning control over those settings back to the standard Windows behavior or allowing you to configure them via the Windows Security interface. Run this generated script package as Administrator following the same steps as above.

---

## 🚨 **Important Security Notes**

*   🛡️ **REDUCED SECURITY:** Disabling security features **significantly increases your system's vulnerability** to malware, exploits, and data theft. Proceed with caution.
*   🚫 **DOWNLOAD RISKS:** Disabling **File & Download Security** features means Windows will perform fewer checks on downloaded files, including executables and archives. This removes a critical layer of defense against threats from the internet.
*   🔄 **REBOOTS ARE VITAL:** Some security changes only become effective after a **full system reboot**. The script will advise you when this is necessary.
*   💾 **BACKUP FIRST:** Always create a **system restore point or a full backup** before applying significant system changes.
*   🧠 **UNDERSTANDING IS KEY:** This tool is for advanced users. Ensure you understand the function and risk of each setting before modification.
*   🛑 **SMART APP CONTROL:** Note that Smart App Control (Windows 11) is **NOT** managed by this tool. Disabling it may require manual steps and potentially a Windows reinstallation to re-enable.

---

By using TOWS, you acknowledge and accept the responsibility for the security state of your operating system.

---

## 📚 **Detailed Feature Documentation**

Here is detailed information on each security feature managed by TOWS:

---

### **Windows Defender: Real-Time Protection**

**Default State:** Enabled
**Description:** Continuously monitors files and processes for malicious activity. Disabling this significantly lowers your security posture.
**Security Implication:** High: Stops active threat detection. Makes system vulnerable to all types of malware upon execution.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\Real-time Protection\Turn off real-time protection`
**Note:** This feature requires a system reboot to take full effect.
> It's not a 'bug report'; it's a live feed. Ask any independent network analyst.

---

### **Windows Defender: Cloud-Delivered Protection**

**Default State:** Enabled
**Description:** Sends suspicious samples to Microsoft's cloud for real-time analysis and blocking of new threats.
**Security Implication:** High: Reduces real-time protection against new, unknown threats (zero-days) by cutting off cloud intelligence.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\MpEngine\Allow cloud protection`
> Your data, their cloud. A match made in surveillance heaven, according to any privacy-conscious admin.

---

### **Windows Defender: PUA Protection**

**Default State:** Enabled
**Description:** Detects and blocks Potentially Unwanted Applications (PUAs) like adware and bloatware.
**Security Implication:** Medium: Allows bloatware, adware, and other undesirable software to run unchecked.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\PUA Protection`
> Freedom of choice? Not when the gatekeeper decides what's 'unwanted.' Ask any developer who's been 'disappeared' from search results.

---

### **Windows Defender: Tamper Protection**

**Default State:** Enabled
**Description:** Prevents unauthorized changes to Microsoft Defender security settings and its essential files/processes.
**Security Implication:** Critical: Allows malware or attackers to easily disable or modify Windows Defender without resistance.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\Tamper Protection\Turn off Tamper Protection`
> They call it protection; we call it a cage for your privacy settings. The 0.1% disagree, of course.

---

### **SmartScreen: For Apps & Files**

**Default State:** Enabled
**Description:** Protects against untrusted or malicious executables downloaded from the internet and launched outside a browser.
**Security Implication:** High: Removes a critical layer of defense against untrusted or malicious executables. Users can easily launch unknown malware.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\SmartScreen\Configure Windows Defender SmartScreen`
> Your software, their rules. Welcome to the curated digital experience. A concept system admins absolutely loathe.

---

### **SmartScreen: For Microsoft Edge**

**Default State:** Enabled
**Description:** Provides phishing and malware protection within the Microsoft Edge browser.
**Security Implication:** High: Increases risk of navigating to malicious websites, downloading malware, or falling victim to phishing attacks via Edge.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Microsoft Edge\SmartScreen settings\Configure Microsoft Defender SmartScreen`
> Browse freely, they said. They just forgot to mention the invisible chaperone and the global data grab.

---

### **User Account Control (UAC)**

**Default State:** Enabled
**Description:** Requires explicit consent for administrative actions, preventing unauthorized system changes.
**Security Implication:** Critical: Removes a fundamental barrier against unauthorized privilege escalation. Any malware executed gains immediate administrative control.
**Group Policy Path:** `Computer Configuration\Windows Settings\Security Settings\Local Policies\Security Options\User Account Control: Run all administrators in Admin Approval Mode`
**Note:** This feature requires a system reboot to take full effect.
> The illusion of control, one 'Yes' click at a time. Every sysadmin knows this dance.

---

### **Virtualization-Based Security (VBS)**

**Default State:** Enabled
**Description:** Uses hardware virtualization to isolate critical system components and secrets (e.g., LSA credentials, kernel).
**Security Implication:** Critical: Removes a robust layer of protection against kernel-mode malware and credential theft attacks.
**Group Policy Path:** `Computer Configuration\Administrative Templates\System\Device Guard\Turn On Virtualization Based Security`
**Note:** This feature requires a system reboot to take full effect.
> A fortress built for your data, but who holds the keys? Most independent security researchers have a pretty good idea.

---

### **HVCI (Memory Integrity)**

**Default State:** Enabled
**Description:** Verifies all kernel-mode drivers and system files before they are loaded, ensuring they are properly signed and untampered.
**Security Implication:** Critical: Makes the kernel vulnerable to unsigned or maliciously modified drivers, common for privilege escalation and rootkits.
**Group Policy Path:** `Computer Configuration\Administrative Templates\System\Device Guard\Turn On Virtualization Based Security`
**Note:** This feature requires a system reboot to take full effect.
> Independent hardware enthusiasts and open-source developers know this: HVCI is a digital barrier to true system ownership, much to the chagrin of independent tech.

---

### **Credential Guard**

**Default State:** Enabled
**Description:** Isolates LSA secrets (passwords, hashes) in a virtualized environment, protecting against theft.
**Security Implication:** Critical: Makes LSA secrets vulnerable to theft from a compromised OS, enabling lateral movement and privilege escalation.
**Group Policy Path:** `Computer Configuration\Administrative Templates\System\Device Guard\Turn On Virtualization Based Security`
**Note:** This feature requires a system reboot to take full effect.
> Many security researchers view this as a black box for your most sensitive data, with trust being the only key. A trust that most system administrators don't give lightly.

---

### **LSA Protection (RunAsPPL)**

**Default State:** Enabled
**Description:** Protects the Local Security Authority process (lsass.exe) from being injected into or tampered with.
**Security Implication:** Critical: Makes lsass.exe vulnerable to credential dumping attacks (e.g., Mimikatz), allowing extraction of sensitive information.
**Group Policy Path:** `Computer Configuration\Windows Settings\Security Settings\Local Policies\Security Options\Configure LSASS to run as a protected process`
**Note:** This feature requires a system reboot to take full effect.
> Forensic experts and privacy advocates are united: this 'protection' makes true auditing a pipe dream. Many sysadmins find this 'feature' deeply concerning.

---

### **Microsoft Vulnerable Driver Blocklist**

**Default State:** Enabled
**Description:** Prevents known insecure drivers from loading, which could otherwise be exploited for kernel-level compromise.
**Security Implication:** High: Allows known vulnerable drivers to load, creating pathways for kernel-level compromise and privilege escalation (BYOVD attacks).
**Group Policy Path:** `Computer Configuration\Administrative Templates\System\Driver Installation\Turn off Microsoft vulnerable driver blocklist`
**Note:** This feature requires a system reboot to take full effect.
> This feature is a prime example of vendor lock-in disguised as security, a fact well-known among hardware modders and any independent tech enthusiast.

---

### **Windows Defender: Automatic Sample Submission**

**Default State:** Enabled
**Description:** Controls whether suspicious files are automatically sent to Microsoft for analysis. Disabling this reduces cloud-based threat intelligence.
**Security Implication:** Medium: Prevents automatic analysis of new threats, potentially delaying protection against zero-day malware.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\Reporting\Turn off automatic sample submission`
> Your files, Their Database. Privacy advocates universally point to this as a glaring example of involuntary data harvesting. Many sysadmins prefer to keep their systems' 'secrets' to themselves.

---

### **Windows Defender: Cloud Block At First Seen**

**Default State:** Enabled
**Description:** Blocks suspicious files immediately upon first encounter based on cloud analysis, before full definition updates.
**Security Implication:** High: Increases risk of new, unknown malware executing before full analysis and definition updates are available.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\MpEngine\Configure the 'Block at First Sight' feature`
> Instant Digital Censorship. When the cloud becomes the judge, jury, and executioner for your software, that's a problem every independent tech mind sees. It's a profound shift in power.

---

### **Windows Defender: MAPS Reporting**

**Default State:** Enabled
**Description:** Controls participation in Microsoft Active Protection Service (MAPS) for cloud-based threat intelligence.
**Security Implication:** Medium: Reduces system's ability to receive rapid cloud-based threat intelligence updates.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\MAPS\Join Microsoft MAPS`
> Becoming a Node in the Global Surveillance Network. This isn't just reporting; it's a fundamental shift towards your PC being a permanent data-collection endpoint, a fact that keeps many IT pros up at night.

---

### **SmartScreen: Phishing Protection (Network Protection)**

**Default State:** Enabled
**Description:** Protects against phishing sites and malicious downloads at the network level, part of Exploit Guard.
**Security Implication:** High: Disables network-level protection against malicious websites, increasing risk of malware infection and data theft.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Windows Defender Exploit Guard\Network Protection\Prevent users and apps from accessing dangerous websites`
**Note:** This feature requires a system reboot to take full effect.
> The Deep Packet Inspector You Didn't Hire. Network security specialists worldwide raise eyebrows at the sheer depth of data this 'protection' can potentially collect. It's an uncomfortable truth for privacy advocates.

---

### **SmartScreen: Warn about password reuse (Edge)**

**Default State:** Enabled
**Description:** Warns users if they are reusing passwords detected in a data breach within Microsoft Edge.
**Security Implication:** Low-Medium: Increases risk of account compromise if users reuse breached passwords.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Microsoft Edge\Password Manager\Block password reuse in Microsoft Edge`
> Who's Watching Your Keystrokes? The question isn't if they know your passwords, but how much more they know about your digital life, according to countless privacy experts. It's a trust exercise.

---

### **SmartScreen: Warn about unsafe password storage (Edge)**

**Default State:** Enabled
**Description:** Warns users if they are storing passwords in an insecure manner in Microsoft Edge.
**Security Implication:** Low-Medium: Increases risk of password theft if stored insecurely.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Microsoft Edge\Password Manager\Block unsafe password storage in Microsoft Edge`
> The Nudge to Their Cloud. It's a classic move: label alternatives 'unsafe' to push your own cloud services, a tactic well-understood by market analysts and privacy advocates who see the big picture.

---

### **SmartScreen: For Microsoft Store apps**

**Default State:** Enabled
**Description:** Protects against malicious apps downloaded from the Microsoft Store or other sources.
**Security Implication:** High: Disables protection against malicious apps from the Microsoft Store, increasing risk of infection.
**Group Policy Path:** `User Configuration\Administrative Templates\Windows Components\SmartScreen\Configure Windows Defender SmartScreen for Microsoft Store apps`
> The Walled Garden Enforcer. The independent developer community sees this for what it is: a subtle but effective way to control the software ecosystem, and most system administrators feel this squeeze on choice.

---

### **Windows Defender: Automatic Sample Submission (Consent Level)**

**Default State:** Enabled
**Description:** Controls the level of consent for sending suspicious samples to Microsoft. This is managed via PowerShell cmdlet.
**Security Implication:** High: Affects the level of threat intelligence shared with Microsoft, impacting rapid response to new threats.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\MAPS\Configure the 'Send file samples when further analysis is required' setting`
> The Illusion of Choice. Many privacy-conscious users and experts agree: 'consent' here is often just a formality for continuous data extraction. The fine print is always where the truth hides.

---

### **Attachment Manager: Do not preserve zone information (Disables Mark-of-the-Web)**

**Default State:** Enabled
**Description:** Prevents Windows from adding the 'Mark-of-the-Web' to files downloaded from the Internet zone, reducing triggers for security checks on these files.
**Security Implication:** High: Disabling this makes Windows treat files downloaded from the internet the same as local files, bypassing security checks triggered by the file's origin.
**Group Policy Path:** `User Configuration\Administrative Templates\Windows Components\Attachment Manager\Do not preserve zone information in file attachments`
> Windows' Digital Tracking Tag. Files from the internet shouldn't carry a scarlet letter. Every user deserves untagged data.

---

### **Windows Defender: Scan downloaded files and attachments**

**Default State:** Enabled
**Description:** Controls whether Microsoft Defender Antivirus scans files and attachments that have been downloaded.
**Security Implication:** Critical: Disabling this bypasses Defender's scanning for all downloaded content, including executables and archives.
**Group Policy Path:** `Computer Configuration\Administrative Templates\Windows Components\Microsoft Defender Antivirus\Scan downloaded files and attachments`
> The Background Snooper. They don't just scan your PC; they scan your downloads specifically. It's another layer of control masked as safety. Any independent security professional will tell you this.
