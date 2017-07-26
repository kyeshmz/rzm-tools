const $title = document.querySelector("#title");
const $url = document.querySelector("#url");
const $insert = document.querySelector("#insert");
const $panelResult = document.querySelector(".result-panel>.description");
const $btnClean = document.querySelector("#btn-clean");

const insertItem = () => {
  if (validateInputs()) {
    new GenerateMarkdown()
      .setTitle($title.value)
      .setUrl($url.value)
      .createNode()
      .insertResult($panelResult);
    cleanFields();
  }
};

const GenerateMarkdown = function() {
  this.title = "Some title";
  this.url = "http://...";
  this.node = {};
};

GenerateMarkdown.prototype.createNode = function() {
  this.node = `<p>[${this.title}](${this.url})</p>`;
  return this;
};

GenerateMarkdown.prototype.setTitle = function(title) {
  this.title = title;
  return this;
};

GenerateMarkdown.prototype.setUrl = function(url) {
  this.url = url;
  return this;
};

GenerateMarkdown.prototype.insertResult = function(nodeParent) {
  nodeParent.innerHTML += this.node;
  return this;
};

const cleanFields = () => {
  $title.value = "";
  $url.value = "";
  formFocus.title();
};
const validateInputs = () => {
  if (!$title.value) {
    errorMessage.showError();
    formFocus.title();
    return false;
  } else if (!$url.value) {
    errorMessage.showError();
    formFocus.url();
    return false;
  } else {
    errorMessage.hideError();
    return true;
  }
};
const formFocus = {
  title() {
    $title.focus();
  },
  url() {
    $url.focus();
  }
};
const errorMessage = {
  component: document.querySelector("#form-list"),
  hideError() {
    this.component.classList.remove("error");
  },
  showError() {
    this.component.classList.add("error");
  }
};
formFocus.title();
window.addEventListener("keydown", function(e) {
  if (e.code === "Enter") insertItem();
});
$insert.addEventListener("click", insertItem);
$btnClean.addEventListener("click", function() {
  if (confirm("Do you really want to clean this list?"))
    $panelResult.innerHTML = "";
});

