// download_generator.js
// Version: 1.5 // Updated version
// Build: 20250604.6 // Updated build
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
|-- README.md
|-- assets/
    |-- favicon.ico
|-- Generated Scripts/ (These are created after using the tool)
    |-- WindowsSecurityConfig.ps1
    |-- WindowsSecurityRevert.ps1
    |-- LaunchConfiguration.bat
                    </pre>
                    <p class="small text-muted"><em>Note: The <code>.ps1</code> and <code>.bat</code> files under "Generated Scripts" are dynamically created by the application when you click 'Generate' on the main page, based on your selections. The initial application package provides the core files for running the tool.</em></p>

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
                        <li>The **"Force ALL Security Features OFF"** option (e.g., "Turn Off Windows Security") will disable these features permanently. The Windows user **cannot turn them back on** through standard UI controls unless you use the "Turn On Windows Security" script or manually revert settings.</li>
                        <li>The **"Force ALL Security Features ON"** option (e.g., "Turn On Windows Security") will enable these features and, in many cases, place them under **Administrator lockdown**, preventing regular users from easily changing them.</li>
                        <li>The **"Restore Windows Defaults (Remove Policies)"** option is highly recommended for restoring local user control. This "third option" removes the policy enforcements set by the scripts, allowing the end-user (or the system itself) to revert to default Windows behavior or for the user to make changes outside of a corporate environment.</li>
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
 * Downloads the entire application as a ZIP file.
 */
async function downloadApplicationPackage() {
    logToConsole('Initiating download of full application package.', 'info');
    const zip = new JSZip();
    const appFolderName = APP_CONFIG.appFolderName; // Use APP_CONFIG.appFolderName from config.js

    // List of files to include in the ZIP (excluding dynamically generated scripts)
    // Ensure these paths are correct relative to your index.html
    const filesToInclude = [
        'index.html',
        'style.css',
        'config.js',
        'security_features_data.js',
        'documentation_generator.js',
        'about_documentation.js',
        'generate_script_logic.js',
        'script.js',
        'download_generator.js', // This file itself
        'README.md',
        'assets/favicon.ico'
    ];

    try {
        // Fetch each file and add it to the zip
        for (const filePath of filesToInclude) {
            logToConsole(`Fetching: ${filePath}`, 'debug');
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            
            // Handle binary files differently (like favicon.ico)
            if (filePath.endsWith('.ico')) {
                 const blobContent = await response.blob();
                 zip.file(`${appFolderName}/${filePath}`, blobContent, {binary: true});
            } else {
                 const fileContent = await response.text();
                 zip.file(`${appFolderName}/${filePath}`, fileContent);
            }
        }

        logToConsole('All application files fetched. Generating ZIP...', 'info');
        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                downloadFile(content, `${appFolderName}.zip`, 'application/zip');
                logToConsole('Full application package ZIP generated and download initiated.', 'info');
            })
            .catch(error => {
                logToConsole(`Error generating application package ZIP: ${error.message}`, 'error');
                alert('Failed to generate the application download package.');
            });

    } catch (error) {
        logToConsole(`Error during file fetching for package: ${error.message}`, 'error');
        alert(`Failed to prepare application download: ${error.message}`);
    }
}

logToConsole('download_generator.js loaded (v1.5).', 'info');