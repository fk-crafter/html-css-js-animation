document.addEventListener("DOMContentLoaded", function() {

  const chargingIcon = document.querySelector(".charging_icon");
  const batteryLevel = document.querySelector(".battery_level");
  const chargingBar = document.querySelector(".charging_bar");
  const dischargingTime = document.querySelector(".discharging_time");
  const otherInfo = document.querySelector(".other_info");

  navigator.getBattery().then(battery => {

    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      updateDischargingInfo();
    }

    updateAllBatteryInfo();

    battery.addEventListener("chargingchange", updateAllBatteryInfo);

    battery.addEventListener("levelchange", updateAllBatteryInfo);

    battery.addEventListener("dischargingtimechange", updateAllBatteryInfo);

    function updateLevelInfo() {
      const level = parseInt(battery.level * 100);
      batteryLevel.textContent = `${level}%`;
      chargingBar.setAttribute("data-level", level <= 20 ? "low" : "normal");
      chargingBar.style.width = `${level}%`;
    }

    function updateChargeInfo() {
      if (battery.charging) {
        chargingBar.style.animationIterationCount = "infinite";
        chargingIcon.style.display = "inline-flex";
        otherInfo.style.display = "none";
      } else {
        chargingIcon.style.display = "none";
        otherInfo.style.display = "inline-flex";
        chargingBar.style.animationIterationCount = "initial";
      }
    }

    function updateDischargingInfo() {
      const dischargeTime = parseInt(battery.dischargingTime / 60) > 0;
      if (dischargeTime) {
        dischargingTime.textContent = `${parseInt(battery.dischargingTime / 60)} minutes`;
        otherInfo.style.display = "flex";
      } else {
        otherInfo.style.display = "none";
      }
    }
  });
});
