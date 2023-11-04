chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  })
})

const twitter = 'https://twitter.com'

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(twitter)) {

    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

    const nextState = prevState === 'OFF' ? 'ON' : 'OFF'

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {

      await chrome.scripting.insertCSS({
        files: ["productive.css"],
        target: { tabId: tab.id },
      });

    } else if (nextState === "OFF") {

      await chrome.scripting.removeCSS({
        files: ["productive.css"],
        target: { tabId: tab.id },
      });

    }
  }
});


