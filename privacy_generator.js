// privacy_generator.js
// Version: 1.1 // Updated version
// Build: 20250604.2 // Updated build
// Contains logic for dynamically generating the application's Privacy Policy content.

/**
 * Generates and displays the Privacy Policy content.
 */
function generatePrivacyContent() {
    logToConsole('Generating Privacy Policy content.', 'info');
    const privacyContentElement = document.getElementById('privacyContent');
    if (privacyContentElement) {
        privacyContentElement.innerHTML = `
            <div class="card bg-white rounded shadow-lg p-4 mb-4">
                <div class="card-body">
                    <h4 class="mb-3 text-dark fw-bold pt-3">Privacy Policy for Tows Security Configurator</h4>
                    <p class="text-muted small mb-0">Last Updated: ${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <hr class="my-4">

                    <p>At Tows Security Configurator, your privacy is paramount. This Privacy Policy outlines how the Tows Security Configurator application (the "Application") processes information when you use it. Please read this policy carefully to understand our practices regarding your information.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">1. Information We DO NOT Collect</h5>
                    <p>The Tows Security Configurator is designed with your privacy at its core. We want to be absolutely clear: **the Application itself does not collect, store, transmit, or process any personal data from its users.**</p>
                    <ul>
                        <li>We do not collect your name, email address, IP address, device identifiers, or any other personally identifiable information.</li>
                        <li>We do not track your usage patterns within the Application.</li>
                        <li>We do not store any configurations or selections you make. These are processed in real-time in your browser for script generation.</li>
                        <li>We do not use cookies or similar tracking technologies for analytics or advertising.</li>
                    </ul>
                    <p>As a client-side web application, all processing, including the generation of PowerShell and Batch scripts, occurs locally within your browser. No data leaves your device through the Application's direct operation.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">2. Data Processing by Generated Scripts</h5>
                    <p>The Application generates PowerShell (.ps1) and Batch (.bat) scripts that you run locally on your Windows operating system. These scripts interact directly with your operating system's registry and services to apply security configurations based on your selections. It is crucial to understand:</p>
                    <ul>
                        <li>These generated scripts modify your local system settings.</li>
                        <li>The scripts themselves do not transmit any data to Tows or any third party.</li>
                        <li>However, modifying Windows security settings (e.g., enabling or disabling Windows Defender features) may affect how *Windows itself* collects or transmits data. For example, if you enable "Automatic Sample Submission" via our generated script, your Windows operating system will send suspicious files to Microsoft for analysis, as per Microsoft's own privacy policies and terms. Our Application simply provides a tool to toggle these Windows-native settings.</li>
                    </ul>
                    <p class="text-danger fw-bold">You are solely responsible for understanding the privacy implications of the Windows security settings you choose to modify using the generated scripts.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">3. Third-Party Services</h5>
                    <p>The Application relies on certain third-party libraries for its functionality (e.g., Bootstrap for styling, JSZip for file compression). These libraries are loaded directly from Content Delivery Networks (CDNs).</p>
                    <ul>
                        <li><strong>Bootstrap CDN:</strong> Used for CSS and JavaScript frameworks. We do not control their data collection practices.</li>
                        <li><strong>JSZip CDN:</strong> Used for client-side ZIP file generation. This library processes data locally in your browser to create the zip file and does not send data to the CDN provider through our use of it.</li>
                    </ul>
                    <p>While we choose reputable third-party services, we recommend reviewing their respective privacy policies if you have concerns about their general data collection practices when you access content via their CDNs.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">4. Your Rights (GDPR Compliance)</h5>
                    <p>Given that Tows Security Configurator does not collect or process any personal data, traditional data subject rights (such as the right to access, rectification, erasure, restriction of processing, data portability, and objection) as outlined in the General Data Protection Regulation (GDPR) do not directly apply to the Application itself.</p>
                    <p>However, we are committed to upholding the spirit of these rights by providing a tool that minimizes data collection by design and empowers you to control your local system's privacy settings. If you have concerns about data processed by your Windows operating system or other software, please refer to their respective privacy policies.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">5. Changes to This Privacy Policy</h5>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">6. Contact Us</h5>
                    <p>If you have any questions about this Privacy Policy, you may contact us at tows@tows.top.</p>
                </div>
            </div>
        `;
        logToConsole('Privacy Policy content generated successfully.', 'info');
    } else {
        logToConsole('Error: privacyContent element not found to render Privacy Policy.', 'error');
    }
}

logToConsole('privacy_generator.js loaded (v1.1).', 'info');