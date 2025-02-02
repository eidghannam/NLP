import { handleSubmit } from "../src/client/js/formHandler";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: { code: "0" },
        score_tag: "P",
        subjectivity: "SUBJECTIVE",
        sentence_list: [{ text: "This is a test snippet." }],
      }),
  })
);

describe("Testing the submit functionality", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input id="name" value="Test URL" />
        <div id="results"></div>
      </form>
    `;
  });

  test("Testing if handleSubmit is defined", () => {
    expect(handleSubmit).toBeDefined();
  });

  test("Testing the handleSubmit() function", () => {
    handleSubmit(new Event("submit"));

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(document.getElementById("results").innerHTML).toContain(
      "Polarity: Positive"
    );
    expect(document.getElementById("results").innerHTML).toContain(
      "Subjectivity: Subjective"
    );
    expect(document.getElementById("results").innerHTML).toContain(
      "Text Snippet: This is a test snippet."
    );
  });
});
