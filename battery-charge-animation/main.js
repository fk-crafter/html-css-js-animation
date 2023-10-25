document.addEventListener("DOMContentLoaded", function() {
  // All the containers we need to update the battery information
  const chargingIcon = document.querySelector(".charging_icon");
  const batteryLevel = document.querySelector(".battery_level");
  const chargingBar = document.querySelector(".charging_bar");
  const dischargingTime = document.querySelector(".discharging_time");
  const otherInfo = document.querySelector(".other_info");

  // Getting battery, it returns a promise
  navigator.getBattery().then(battery => {

    // Update all the battery information which is a combination of multiple functions
    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      updateDischargingInfo();
    }

    // Running as the promise returns battery
    updateAllBatteryInfo();

    // Event Listener for when the charging status changes
    battery.addEventListener("chargingchange", updateAllBatteryInfo);

    // Event Listener for when the Battery Level Changes
    battery.addEventListener("levelchange", updateAllBatteryInfo);

    // Event Listener for when the discharging Time Change
    battery.addEventListener("dischargingtimechange", updateAllBatteryInfo);

    // Updating the battery Level container and the charging bar width
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

    // Updating the Discharging Information
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
