const navigation = document.querySelector(".navigation");

document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target)) {
        navigation.classList.remove("active");
    }
});

navigation.addEventListener("click", () => {
    navigation.classList.toggle("active");
});
