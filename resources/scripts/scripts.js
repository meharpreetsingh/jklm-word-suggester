// Components
let toggleButton;
let suggest;

const storeSuggest = (suggest) => {
  chrome.storage.local.set({ suggest: suggest }, () => {
    // console.log("[storeSuggest] suggest: " + suggest);
  });
};
const getSuggest = () => {
  chrome.storage.local.get(["suggest"], (result) => {
    suggest = result.suggest;
    console.log("[getSuggest] suggest: " + result.suggest);
    if (suggest == true) toggleButton.classList.add("toggleSwitch--on");
  });
};

const commuteToJklmScript = async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url.includes("jklm.fun"))
      return console.log("[commuteToJklmScript] We are not on JKLM!!");
    const response = await chrome.tabs.sendMessage(tab.id, { suggest: suggest });
  } catch (error) {
    console.error(`[script.js] commuteToJklmScript: Unable to Send Message. ${error}`);
  }
};

window.addEventListener("load", async () => {
  console.log("[script.js] Script Loaded! ");
  toggleButton = document.querySelector(".toggleSwitch");
  getSuggest();

  toggleButton.addEventListener("click", function () {
    suggest = !suggest;
    // console.log("[script.js] suggest: " + suggest);
    storeSuggest(suggest);
    if (suggest) {
      toggleButton.classList.add("toggleSwitch--on");
    } else {
      toggleButton.classList.remove("toggleSwitch--on");
    }
    commuteToJklmScript();
  });
});
