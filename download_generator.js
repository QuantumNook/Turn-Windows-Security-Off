// download_generator.js
// Version: 2.2
// Build: 20250605.4 // Updated build number
// Changes:
// - Streamlined download: Now downloads a pre-packaged ZIP file directly.
// - Removed dynamic file fetching and JSZip file inclusion for the main application download.
// - Removed confirmation alert.
// Contains logic for dynamically generating the application's Download section content.

/**
 * Generates and displays the Download section content.
 */
function generateDownloadContent() {
    logToConsole('Generating Download section content.', 'info');
    const downloadContentElement = document.getElementById('downloadContent');
    if (downloadContentElement) {
        downloadContentElement.innerHTML = `
            <div class="card bg-white rounded shadow-lg p-4 mb-4">
                <div class="card-body">

                    <h4 class="mb-3 text-dark fw-bold pt-3">Download Tows Security Configurator</h4>
                    <p>Tows Security Configurator is a powerful, client-side application meticulously built using a combination of modern web technologies and robust scripting languages. It leverages **HTML5**, **Bootstrap**, and **JavaScript** for its intuitive user interface, allowing for seamless interaction directly within your web browser. The core functionalities are powered by **PowerShell** and **Batch file** instructions, ensuring deep system-level configuration capabilities on Windows operating systems.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">Deployment Options</h5>
                    <p>The application has been engineered for maximum flexibility. You can:</p>
                    <ul>
                        <li>Run it directly from a local folder on your **Desktop** (or any local drive) by simply opening <code>index.html</code> in your web browser.</li>
                        <li>Deploy it to **any hosting Webserver** for access via a URL, as it operates entirely client-side and does not require server-side processing.</li>
                    </ul>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">Application File Structure (Folder: Tows)</h5>
                    <p>When downloaded, all necessary files will be organized within a main folder named <code>Tows</code>. This structure must be preserved for the application to function correctly.</p>
                    <pre class="bg-light p-3 rounded">
Tows/
|-- index.html
|-- style.css
|-- config.js
|-- security_features_data.js
|-- documentation_generator.js
|-- about_documentation.js
|-- generate_script_logic.js
|-- script.js
|-- download_generator.js
|-- terms_generator.js
|-- privacy_generator.js
|-- README.md
|-- launch_script.bat.txt
|-- config_script.ps1.txt
|-- revert_script.ps1.txt
|-- assets/
    |-- favicon.ico
|-- Generated Scripts/ (These are created after using the tool)
    |-- WindowsSecurityConfig-[random].ps1
    |-- WindowsSecurityRevert-[random].ps1
    |-- LaunchConfiguration-[random].bat
                    </pre>
                    <p class="small text-muted"><em>Note: The files under "Generated Scripts" are dynamically created by the application when you click 'Generate' on the main page, based on your selections. The initial application package provides the core files for running the tool. Randomized names are used for generated scripts to help evade detection.</em></p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">Licensing & Usage</h5>
                    <p>Tows Security Configurator is licensed under the **MIT Open Source License**. This means you are free to:</p>
                    <ul>
                        <li>**Use** it for personal or corporate purposes on an unlimited number of devices.</li>
                        <li>**Modify** the source code to suit your specific needs.</li>
                        <li>**Redistribute** the application, provided there is **no profit involved** in the distribution (it must be made available for free).</li>
                        <li>**Crucially:** The link to the Developer's GitHub page within the distribution files, and the file headers issuing credit to the Author of Tows, **may not be changed or removed**.</li>
                    </ul>

					<div class="card bg-light rounded shadow-lg p-3 mt-4 mb-4 w-100 text-center">
                        <button id="downloadAppPackageBtn" class="btn btn-primary btn-lg w-100 py-3"><i class="bi bi-download me-2"></i> Download Tows Application Now</button>
                    </div>

                    <h5 class="mt-4 mb-3 text-dark fw-bold text-danger">Important: Understand the Security Implications!</h5>
                    <p>This application is intended for **System Administrators** or advanced users who fully comprehend its impact. Please read the following carefully:</p>
                    <ul>
                         <li>The **"Force ALL Security Features OFF"** option will disable multiple security features. The Windows user **cannot easily turn them back on** through standard UI controls unless you use the "Force ALL Security Features ON" script or the "Restore Windows Defaults" script to remove the policy enforcements.</li>
                        <li>The **"Force ALL Security Features ON"** option will enable features and, in many cases, place them under **Administrator lockdown**, preventing regular users from easily changing them.</li>
                        <li>The **"Restore Windows Defaults (Remove Policies)"** option is highly recommended for restoring local user control. This option removes the policy enforcements set by the scripts, allowing the end-user (or the system itself) to revert to default Windows behavior or for the user to make changes outside of a corporate environment.</li>
                        <li>Disabling **File & Download Security** features will significantly reduce Windows' default checks on downloaded content, increasing risks.</li>
                    </ul>
                    <p class="text-danger fw-bold">Always exercise caution and understand the consequences of the configurations you apply.</p>


                    </div>
            </div>
        `;

        // Add event listener for the new download button
        const downloadAppPackageBtn = document.getElementById('downloadAppPackageBtn');
        if (downloadAppPackageBtn) {
            downloadAppPackageBtn.addEventListener('click', downloadApplicationPackage);
            logToConsole('Download App Package button event listener attached.', 'info');
        } else {
            logToConsole('Download App Package button not found.', 'error');
        }

    } else {
        logToConsole('Error: downloadContent element not found to render Download section.', 'error');
    }
}

/**
 * Downloads the pre-packaged application ZIP file directly.
 */
async function downloadApplicationPackage() {
    logToConsole('Initiating direct download of pre-packaged application ZIP.', 'info');
    
    const appFolderName = APP_CONFIG.appFolderName;
    const zipFileName = `${appFolderName}.zip`;

    try {
        const a = document.createElement('a');
        a.href = zipFileName;
        a.download = zipFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        logToConsole(`Direct download initiated for: ${zipFileName}`, 'info');

    } catch (error) {
        logToConsole(`Error initiating direct download: ${error.message}`, 'error');
        alert(`Failed to initiate application download. Please ensure '${zipFileName}' is in the correct directory. Also check browser console for more details.`);
    }
}

logToConsole('download_generator.js loaded (v2.2).', 'info');