function cleanUrl(url) {
  try {
    let u = new URL(url);

    switch (u.hostname) {
      case "www.youtube.com":
      case "youtube.com":
        if (u.pathname === "/watch") {
          return `https://youtu.be/${u.searchParams.get("v")}`;
        }
        u.searchParams.delete("feature");
        u.searchParams.delete("t");
        return u.origin + u.pathname;

      case "x.com":
      case "twitter.com":
        u.search = "";
        return u.origin + u.pathname;

      case "www.amazon.com":
      case "amazon.com":
        let asinMatch = u.pathname.match(/\/dp\/([A-Z0-9]{10})/);
        if (asinMatch) {
          return `${u.origin}/dp/${asinMatch[1]}`;
        }
        return u.origin;

      case "www.aliexpress.com":
      case "aliexpress.com":
        u.search = "";
        return u.origin + u.pathname;

      case "open.spotify.com":
        return u.origin + u.pathname;

      case "www.tiktok.com":
      case "tiktok.com":
        u.search = "";
        return u.origin + u.pathname;

      case "www.reddit.com":
      case "reddit.com":
        u.search = "";
        return u.origin + u.pathname;

      case "www.facebook.com":
      case "facebook.com":
        u.searchParams.delete("fbclid");
        return u.origin + u.pathname;

      case "www.instagram.com":
      case "instagram.com":
        u.search = "";
        return u.origin + u.pathname;

      case "www.linkedin.com":
      case "linkedin.com":
        u.search = "";
        return u.origin + u.pathname;

      case "www.google.com":
      case "google.com":
        if (u.pathname.startsWith("/search")) {
          let q = u.searchParams.get("q");
          return `${u.origin}/search?q=${encodeURIComponent(q)}`;
        }
        return u.origin + u.pathname;

      case "medium.com":
      case "www.medium.com":
        u.search = "";
        return u.origin + u.pathname;

      case "www.ebay.com":
      case "ebay.com":
        let itemMatch = u.pathname.match(/\/itm\/(\d+)/);
        if (itemMatch) {
          return `${u.origin}/itm/${itemMatch[1]}`;
        }
        return u.origin + u.pathname;

      case "store.steampowered.com":
        u.search = "";
        return u.origin + u.pathname;
    }

    return null;
  } catch (e) {
    return null;
  }
}

const supportedHosts = [
  "youtube.com", "www.youtube.com",
  "twitter.com", "x.com",
  "amazon.com", "www.amazon.com",
  "aliexpress.com", "www.aliexpress.com",
  "open.spotify.com",
  "tiktok.com", "www.tiktok.com",
  "reddit.com", "www.reddit.com",
  "facebook.com", "www.facebook.com",
  "instagram.com", "www.instagram.com",
  "linkedin.com", "www.linkedin.com",
  "google.com", "www.google.com",
  "medium.com", "www.medium.com",
  "ebay.com", "www.ebay.com",
  "store.steampowered.com"
];
browser.contextMenus.create({
  id: "clean-copy-url",
  title: "Copy URL",
  contexts: ["page"]
});

async function updateMenuForTab(tabId) {
  try {
    let tab = await browser.tabs.get(tabId);
    if (!tab || !tab.url) return;

    let u = new URL(tab.url);
    let isSupported = supportedHosts.includes(u.hostname);

    browser.contextMenus.update("clean-copy-url", {
      title: isSupported ? "Copy Clean URL (uwucopy)" : "Copy URL (may not be clean)"
    });
  } catch (e) {
  }
}

browser.tabs.onActivated.addListener(info => {
  updateMenuForTab(info.tabId);
});
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    updateMenuForTab(tabId);
  }
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "clean-copy-url") {
    const url = tab.url;
    let clean = cleanUrl(url);

    if (clean) {
      await navigator.clipboard.writeText(clean);
    } else {
      browser.notifications.create({
        type: "basic",
        iconUrl: "icon48.png",
        title: "uwucopy",
        message: "This site is not fully supported. The copied URL may still contain tracking or extra parameters."
      });
      await navigator.clipboard.writeText(url);
    }
  }
});
