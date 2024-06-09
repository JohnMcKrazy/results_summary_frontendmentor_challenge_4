const $d = document;
const selector = (tag) => $d.querySelector(`${tag}`);
const selectorAll = (tag) => $d.querySelectorAll(`${tag}`);
const itemTemplate = selector(".item_template").content;
const scoreData = [];

const fetchData = async () => {
    try {
        const raw = await fetch("./data.json");
        const data = await raw.json();
        console.log(data);
        data.forEach((item) => {
            const template = itemTemplate.cloneNode(true);
            const itemList = template.querySelector("LI");
            console.log(itemList);
            itemList.setAttribute("data-name", item.category);
            itemList.querySelector("IMG").setAttribute("src", item.icon);
            itemList.querySelector(".item_text").textContent = item.category;
            itemList.querySelector(".item_score").textContent = item.score.toString().trim();
            scoreData.push(item.score);
            selector("ul").appendChild(itemList);
        });

        selector(".card_porcentage").textContent = Math.round(scoreData.reduce((acc, cv) => acc + cv, 0) / scoreData.length);
    } catch (error) {
        console.error(error);
    }
};
fetchData();
