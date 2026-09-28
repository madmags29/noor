# 📱 Google Play Store Publishing Guide — Noor-e-ilahi

Complete, step-by-step master checklist and instruction manual for building and releasing the **Noor-e-ilahi** Android application on the **Google Play Store**.

All assets required for the store listing have already been generated and organized inside the [`playstore-assets/`](file:///Users/Majid%20Desk/Noor/playstore-assets) directory.

---

## 📂 Summary of Prepared Assets (`playstore-assets/`)

| Asset Type | File Path | Specifications |
| :--- | :--- | :--- |
| **App Icon** | [`playstore-assets/app-icon-512x512.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/app-icon-512x512.png) | 512 × 512 px, 32-bit PNG with alpha |
| **Feature Graphic** | [`playstore-assets/feature-graphic-1024x500.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/feature-graphic-1024x500.png) | 1,024 × 500 px, high-res emerald banner |
| **Screenshot 1 (Prayers)** | [`playstore-assets/screenshots/screenshot-1-prayers.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/screenshots/screenshot-1-prayers.png) | 1080 × 1920 px (Prayer Times, Adhan & Qada) |
| **Screenshot 2 (Quran)** | [`playstore-assets/screenshots/screenshot-2-quran.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/screenshots/screenshot-2-quran.png) | 1080 × 1920 px (114 Surahs & Mushaf Flow) |
| **Screenshot 3 (Qibla)** | [`playstore-assets/screenshots/screenshot-3-qibla.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/screenshots/screenshot-3-qibla.png) | 1080 × 1920 px (Fluid Qibla Compass) |
| **Screenshot 4 (Zakat)** | [`playstore-assets/screenshots/screenshot-4-zakat.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/screenshots/screenshot-4-zakat.png) | 1080 × 1920 px (2.5% Nisab & 30+ Currencies) |
| **Screenshot 5 (Duas)** | [`playstore-assets/screenshots/screenshot-5-duas-guides.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/screenshots/screenshot-5-duas-guides.png) | 1080 × 1920 px (Hisn al-Muslim, Nikah & Adab) |
| **Short Description** | [`playstore-assets/short-description.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/short-description.txt) | 71 characters (max 80 chars) |
| **Full Description** | [`playstore-assets/full-description.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/full-description.txt) | 3,869 characters (max 4,000 chars) |
| **Release Notes** | [`playstore-assets/release-notes.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/release-notes.txt) | Ready-to-paste version 1.0.0 notes |
| **Metadata JSON** | [`playstore-assets/store-listing-metadata.json`](file:///Users/Majid%20Desk/Noor/playstore-assets/store-listing-metadata.json) | Complete configuration summary |

---

## 🚀 Step-by-Step Publishing Process

### Step 1: Accounts & Prerequisites
1. **Google Play Developer Account**:
   * Visit [play.google.com/console](https://play.google.com/console).
   * Pay the one-time $25 registration fee and verify your identity (requires a government ID).
2. **Expo / EAS Account**:
   * Sign up or verify your login at [expo.dev](https://expo.dev).

---

### Step 2: Build the Production App Bundle (`.aab`)

Google Play requires an **Android App Bundle (`.aab`)**, not an `.apk`.

1. Open your terminal and navigate to the mobile app directory:
   ```bash
   cd "/Users/Majid Desk/Noor/noor-mobile"
   ```
2. Log in to your Expo account:
   ```bash
   npx eas-cli login
   ```
3. Start the cloud production build:
   ```bash
   npm run build:aab
   ```
   *(or run: `npx eas-cli build -p android --profile production`)*
4. During prompts:
   * **Android Keystore**: Choose **"Generate a new Android Keystore"** (EAS will securely back it up to your Expo account).
5. When the build completes (typically 5–10 minutes), copy the `.aab` download link from your terminal and **save the `.aab` file to your computer**.

---

### Step 3: Create the App in Google Play Console

1. In [Google Play Console](https://play.google.com/console), click **Create app** in the top-right corner.
2. Fill in the initial app details:
   * **App name**: `Noor-e-ilahi: Daily Islamic App`
   * **Default language**: `English (United States) - en-US`
   * **App or game**: `App`
   * **Free or paid**: `Free`
3. Accept the **Developer Program Policies** and **US Export Laws** declarations.
4. Click **Create app**.

---

### Step 4: Complete the Mandatory Console Questionnaires

On your app dashboard under **"Set up your app"**, complete each required task:

#### 1. Privacy Policy
* **URL**: `https://www.nooreilahi.com/privacy` *(or `https://www.nooreilahi.com`)*
* Click **Save**.

#### 2. App Access
* Select: **"All functionality is available without special access"** (the app does not require mandatory login or credentials to access core prayer, Quran, or compass features).

#### 3. Ads Declaration
* Select: **"No, my app does not contain ads"**.

#### 4. Content Rating (IARC)
* Click **Start questionnaire** and enter your email address (`salam@nooreilahi.com`).
* Category: Select **"Reference, News, or Educational"** (or **"Utility / Productivity"**).
* For all questions regarding violence, offensive language, controlled substances, and gambling: Select **No**.
* Does the app share physical location with other users? Select **No**.
* Does the app permit digital purchases? Select **No**.
* Click **Save** $\to$ **Next** $\to$ **Submit** to obtain your IARC rating certificate (Rated for 3+ / Everyone).

#### 5. Target Audience & Content
* Select target age groups: **13+ and above** (or **All ages**).
* Could the app unintentionally appeal to children under 13? Select **No** unless intending to participate in the "Designed for Families" program.

#### 6. Data Safety Declaration
* Select **Yes** that the app collects data.
* **Data collected**:
  * **Location** $\to$ **Approximate Location** & **Precise Location**:
    * Collected: **Yes**
    * Shared with third parties: **No**
    * Ephemeral (processed temporarily in memory): **Yes**
    * Required or optional: **Required for core functionality**
    * Purpose: **App functionality** (astronomical solar calculation of prayer timetables and spherical direction of the Qibla).
* **Data security practices**:
  * All traffic is transmitted over secure HTTPS (encrypted in transit).
  * Users can request data deletion at any time.

---

### Step 5: Fill in Store Presence & Upload Assets

In the left menu, navigate to:
**Grow** $\to$ **Store presence** $\to$ **Main store listing**

1. **Listing Details**:
   * **App Name**: `Noor-e-ilahi: Daily Islamic App`
   * **Short Description** (copy from [`playstore-assets/short-description.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/short-description.txt)):
     > *Precision prayer times, 114 Surahs Quran, fluid Qibla & authentic duas.*
   * **Full Description** (copy from [`playstore-assets/full-description.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/full-description.txt)):
     > *Paste the complete formatted description with all feature sections and details.*
2. **Graphics & Media**:
   * **App Icon**: Upload [`playstore-assets/app-icon-512x512.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/app-icon-512x512.png) (512 × 512 px).
   * **Feature Graphic**: Upload [`playstore-assets/feature-graphic-1024x500.png`](file:///Users/Majid%20Desk/Noor/playstore-assets/feature-graphic-1024x500.png) (1,024 × 500 px).
   * **Phone Screenshots**: Upload all 5 screenshots from the [`playstore-assets/screenshots/`](file:///Users/Majid%20Desk/Noor/playstore-assets/screenshots) folder:
     1. `screenshot-1-prayers.png`
     2. `screenshot-2-quran.png`
     3. `screenshot-3-qibla.png`
     4. `screenshot-4-zakat.png`
     5. `screenshot-5-duas-guides.png`
3. **Contact Details**:
   * Email: `salam@nooreilahi.com`
   * Website: `https://www.nooreilahi.com`
4. Click **Save**.

---

### Step 6: Create the Release & Rollout

#### Option A: Recommended First — Internal Testing Track
*(Allows you and your team to install and test the exact Play Store build on your phones immediately without waiting for review)*
1. Go to **Testing** $\to$ **Internal testing**.
2. Click **Create new release**.
3. Under **App bundles**, upload your `.aab` file.
4. Release name: `1.0.0 (1)`
5. Release notes: Copy from [`playstore-assets/release-notes.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/release-notes.txt).
6. Click **Next** $\to$ **Save** $\to$ **Start rollout to internal testing**.
7. Under the **Testers** tab, add your Gmail address and open the opt-in link on your Android device to test.

#### Option B: Direct Production Release
1. Go to **Release** $\to$ **Production**.
2. Click **Create new release**.
3. Upload the `.aab` file.
4. Copy the release notes from [`playstore-assets/release-notes.txt`](file:///Users/Majid%20Desk/Noor/playstore-assets/release-notes.txt).
5. Click **Next** $\to$ **Review release**.
6. If all green checkmarks are present with no errors, click **Start rollout to Production**.

Google will review your application within **24 to 72 hours**. Once approved, it will be live worldwide on the Google Play Store!
