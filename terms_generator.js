// terms_generator.js
// Version: 1.6 // Updated version
// Build: 20250604.7 // Updated build
// Contains logic for dynamically generating the application's Terms of Service content.

/**
 * Generates and displays the Terms of Service content.
 */
function generateTermsContent() {
    logToConsole('Generating Terms of Service content.', 'info');
    const termsContentElement = document.getElementById('termsContent');
    if (termsContentElement) {
        termsContentElement.innerHTML = `
            <div class="card bg-white rounded shadow-lg p-4 mb-4">
                <div class="card-body">
                    <h4 class="mb-3 text-dark fw-bold pt-3">Terms of Service for Tows Security Configurator</h4>
                    <p class="text-muted small mb-0">Last Updated: ${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <hr class="my-4">

                    <p>Welcome to Tows Security Configurator! These Terms of Service ("Terms") govern your use of the Tows Security Configurator application (the "Application"), provided by Tows. By accessing or using the Application, you agree to be bound by these Terms.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">1. Acceptance of Terms</h5>
                    <p>By using the Application, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree to these Terms, you must not use our Application.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">2. The Application</h5>
                    <p>Tows Security Configurator is a client-side web application designed to assist users in configuring various Windows security features. It generates PowerShell and Batch scripts based on user selections. The Application runs entirely in your browser and does not require server-side processing. All generated scripts run locally on your machine.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">3. License & Intellectual Property</h5>
                    <p>The Tows Security Configurator is provided under the **MIT Open Source License**. This means you are granted broad rights to use, modify, and distribute the software, subject to certain conditions:</p>
                    <ul>
                        <li>You may use the Application for personal or commercial purposes on an unlimited number of devices.</li>
                        <li>You may modify the source code to suit your specific needs.</li>
                        <li>You may redistribute the Application, provided that:
                            <ul>
                                <li>The redistribution is **strictly without profit**. The Application must be made available for free.</li>
                                <li>The link to the Developer's GitHub page (if applicable) and the original file headers issuing credit to the Author of Tows **must not be changed or removed** from the distribution files.</li>
                            </ul>
                        </li>
                    </ul>
                    <p>All intellectual property rights in the original Application remain with the original author(s).</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">4. User Responsibilities & Risks</h5>
                    <p class="text-danger fw-bold">The Application is designed for System Administrators and advanced users. By using it, you acknowledge and agree to the following:</p>
                    <ul>
                        <li>You are solely responsible for any configurations you apply using the generated scripts.</li>
                        <li>Disabling security features can significantly reduce your system's protection against malware, exploits, and data theft.</li>
                        <li>Some changes, particularly to core isolation features (e.g., VBS, HVCI, Credential Guard, LSA Protection, UAC), require a system reboot and can affect system stability if not understood.</li>
                        <li>You understand that certain "off" configurations may require specific "on" configurations or a system reinstallation to revert. The "Restore Windows Defaults (Remove Policies)" option is provided to assist in restoring local user control by removing policy enforcements.</li>
                        <li>Tows does not assume any responsibility for data loss, system instability, security breaches, or any other adverse effects resulting from the use of the Application or the scripts it generates.</li>
                    </ul>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">5. Disclaimer of Warranties</h5>
                    <p>THE APPLICATION IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE APPLICATION OR THE USE OR OTHER DEALINGS IN THE APPLICATION.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">6. Limitation of Liability</h5>
                    <p>To the fullest extent permitted by applicable law, in no event will Tows or its author(s) be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Application; (b) any conduct or content of any third party on the Application; (c) any content obtained from the Application; or (d) unauthorized access, use or alteration of your transmissions or content.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">7. Governing Law & Jurisdiction</h5>
                    <p>These Terms shall be governed and construed in accordance with the laws of the European Union, specifically referencing the General Data Protection Regulation (GDPR) where applicable to data privacy, and the laws of Spain for general legal principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Madrid, Spain.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">8. Changes to Terms</h5>
                    <p>We reserve the right to modify these Terms at any time. We will indicate the date of the last revision at the top of these Terms. Your continued use of the Application after any such changes constitutes your acceptance of the new Terms.</p>

                    <h5 class="mt-4 mb-3 text-dark fw-bold">9. Contact Information</h5>
                    <p>If you have any questions about these Terms, you may contact us at tows@tows.top.</p>
                </div>
            </div>
        `;
        logToConsole('Terms of Service content generated successfully.', 'info');
    } else {
        logToConsole('Error: termsContent element not found to render Terms of Service.', 'error');
    }
}

logToConsole('terms_generator.js loaded (v1.6).', 'info');