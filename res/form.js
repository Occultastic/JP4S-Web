function dynamicSubcategoryDropdown() {
    const report_category = document.getElementById("report_category")
    const report_subcategory = document.getElementById("report_subcategory")
    report_subcategory.replaceChildren();

    switch (report_category.value) {
        case "User":
            //create default option
            var option_default = document.createElement("option");
            option_default.label = "Please select a subcategory";
            option_default.value = "default";
            option_default.hidden = true;
            option_default.selected = true;
            report_subcategory.appendChild(option_default);

            //create options based on category
            var options = ["Harrassment", "Threats", "Trolling", "Other"];
            options.forEach(option => {
                var option_user = document.createElement("option");
                option_user.label = option;
                option_user.value = option;
                report_subcategory.appendChild(option_user);
            });
            break;
        case "Game":
            //create default option
            var option_default = document.createElement("option");
            option_default.label = "Please select a subcategory";
            option_default.value = "default";
            option_default.hidden = true;
            option_default.selected = true;
            report_subcategory.appendChild(option_default);

            //create options based on category
            var options = ["Auditory", "Graphical", "Gameplay", "Application", "Accessibility", "Other"];
            options.forEach(option => {
                var option_game = document.createElement("option");
                option_game.label = option;
                option_game.value = option;
                report_subcategory.appendChild(option_game);
            });
            break;
        case "Website":
            //create default option
            var option_default = document.createElement("option");
            option_default.label = "Please select a subcategory";
            option_default.value = "default";
            option_default.hidden = true;
            option_default.selected = true;
            report_subcategory.appendChild(option_default);

            //create options based on category
            var options = ["Layout", "Content", "Accessibility", "Other"];
            options.forEach(option => {
                var option_website = document.createElement("option");
                option_website.label = option;
                option_website.value = option;
                report_subcategory.appendChild(option_website);
            });
            break;
        case "Discord":
            //create default option
            var option_default = document.createElement("option");
            option_default.label = "Please select a subcategory";
            option_default.value = "default";
            option_default.hidden = true;
            option_default.selected = true;
            report_subcategory.appendChild(option_default);

            //create options based on category
            var options = ["Layout", "Moderation", "Content", "Other"];
            options.forEach(option => {
                var option_discord = document.createElement("option");
                option_discord.label = option;
                option_discord.value = option;
                report_subcategory.appendChild(option_discord);
            });
            break;
        default:
            var option_default = document.createElement("option");
            option_default.label = "Please select a category";
            option_default.value = "default";
            option_default.hidden = true;
            option_default.selected = true;
            report_subcategory.appendChild(option_default);
            break;
    }
}

dynamicSubcategoryDropdown();
const form = document.getElementById("form");
const category = document.getElementById("report_category")
category.addEventListener("change", function() {
    dynamicSubcategoryDropdown();
});

function workInProgress() {
    alert("This feature is unfortunately not available yet. It will be available soon.");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    var username = event.target.report_username.value;
    var category = event.target.report_category.value;
    var subcategory = event.target.report_subcategory.value;
    var details = event.target.report_details.value;
    var attachment = event.target.report_attachment.value;
    const report = {
        username,
        category,
        subcategory,
        details,
        attachment
    };
    console.debug(JSON.stringify(report));
    try {
        const response = await fetch('[SECRET]', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        });
        if (response.ok) {
            console.log("Report Response: Success");
        } else {
            console.error('Report Response:', response.statusText);
            alert("Report was unsuccessful, please try again later.");
        }
    } catch (error) {
        console.error('Report Response:', error);
        alert("Report was unsuccessful, please try again later.");
    }
});