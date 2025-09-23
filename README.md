# uwucopy 🐾

**uwucopy** is a **Manifest V2** Firefox browser extension that adds a context menu option to copy a **cleaned URL** from the current page.  
It removes tracking parameters and unnecessary junk from links on popular sites, giving you short and privacy-friendly URLs.

## Supported Sites
uwucopy currently cleans URLs from:

- YouTube  
- Twitter / X  
- Amazon  
- AliExpress  
- Spotify  
- TikTok  
- Reddit  
- Facebook  
- Instagram  
- LinkedIn  
- Google Search  
- Medium  
- eBay  
- Steam  
---
## Installation

Either:
1. **Temporary install**  
   - Download or clone this repository  
   - Open Firefox and go to:  
     ```
     about:debugging#/runtime/this-firefox
     ```  
   - Click **Load Temporary Add-on** and select `manifest.json`  

2. **Build an `.xpi` yourself**  
   - Zip the contents of the project folder (make sure `manifest.json` is at the root)  
   - Rename the archive to `uwucopy.xpi`  
   - Drag it into a Firefox window to install  

3. **Use the provided `.xpi` file**  
   - Download `uwucopy.xpi` from the releases section
   - Drag it into a Firefox window and confirm installation  
