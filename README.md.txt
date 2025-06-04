
***<u>Ensure the switch next to "Tamper Protection" is in the "Off" position before proceeding to run any generated scripts!</u>***

---

## 🚀 **How to Use TOWS**

Follow these steps to configure your Windows security settings:

1.  🌐 **Access the Application:** Open the `index.html` file in your web browser. TOWS runs entirely client-side – no server needed!
2.  ⚙️ **Select Your Configurations:** The intuitive interface presents a list of Windows security features.
    *   ✨ _Browse and Read:_ Carefully review the description and security implications for each feature. Understanding the impact of disabling a setting is crucial.
    *   🖱️ _Toggle Away:_ Use the toggles to set each feature to your desired state (Enabled/Disabled).
3.  🔧 **Generate Scripts:** Once your selections are made, click the prominent **"Generate"** button.
4.  📦 **Download and Extract:** Your browser will download a `.zip` file with a **randomized, unique name** (e.g., `WindowsSecurityConfig-randomstring.zip`). This helps avoid detection based on static filenames.
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

*Generated by AI Instance with your guidance.*