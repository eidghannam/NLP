export function handleSubmit(event) {
  event.preventDefault();

  const formText = document.getElementById("name").value;

  console.log("::: Form Submitted :::");

  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("url", formText);
  formdata.append("lang", "en");

  fetch("https://api.meaningcloud.com/sentiment-2.1", {
    method: "POST",
    body: formdata,
    redirect: "follow",
  })
    .then((res) => res.json())
    .then(function (res) {
      if (res.status.code === "0") {
        document.getElementById("results").innerHTML = `
      <p><strong>Polarity:</strong> ${
        res.score_tag === "P"
          ? "Positive"
          : res.score_tag === "N"
          ? "Negative"
          : "Neutral"
      }</p>
      <p><strong>Subjectivity:</strong> ${
        res.subjectivity === "SUBJECTIVE" ? "Subjective" : "Objective"
      }</p>
      <p><strong>Text Snippet:</strong> ${
        res.sentence_list[0]?.text || "N/A"
      }</p>
      `;
      } else {
        document.getElementById(
          "results"
        ).innerHTML = `<p>Error: ${res.status.msg}</p>`;
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
      document.getElementById(
        "results"
      ).innerHTML = `<p>Error: Something went wrong!</p>`;
    });
}
