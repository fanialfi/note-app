import {
  SyncLocalStorage,
  resetDataDom,
  createElement,
  saveElement,
} from "./app.js";

const submitBtn = document.getElementById("btn-submit");
const judulNote = document.getElementById("judul-note");
const contentNote = document.getElementById("keterangan-note");
const saveContent = document.getElementById("save-content");
const syncLocalStorage = new SyncLocalStorage();

// membuat element dan menyimpan-nya kedalam DOM ketika button di klik
submitBtn.addEventListener("click", function () {
  if (judulNote.value != false && contentNote.value != false) {
    const judul = createElement("h3", judulNote.value);
    const content = createElement("p", contentNote.value);

    // menyimpan data ke localStorage
    syncLocalStorage.sync("ADD", judulNote.value, contentNote.value);

    const dataBaru = saveElement(judul, content);
    saveContent.prepend(dataBaru);

    resetDataDom(judulNote, contentNote);
  } else {
    alert("lengkapi data terlebih dahulu");
  }
});

// meload data dari localStorage kedalam DOM ketika window di load
document.addEventListener("DOMContentLoaded", () => {
  const noteAppData = localStorage.getItem("DATA_APP")
    ? JSON.parse(localStorage.getItem("DATA_APP"))
    : [];

  syncLocalStorage.setDataLocalStorage = noteAppData;

  if (localStorage.getItem("DATA_APP")) {
    noteAppData.forEach((element) => {
      const { judul: heading, isi: paragraf } = element;

      const h1 = createElement("h3", heading);
      const p = createElement("p", paragraf);
      const dataBaru = saveElement(h1, p);
      saveContent.prepend(dataBaru);
    });
  }
});

// menghapus content dari dom dan localStorage ketika tombol delete ditekan
window.addEventListener("load", function () {
  const box = document.querySelectorAll(".box");
  box.forEach((element) => {
    const button = element.lastElementChild;
    const dataJudulNote = element.firstElementChild.textContent;

    button.addEventListener("click", function () {
      try {
        console.log("OK");
        syncLocalStorage.sync("DELETE", dataJudulNote);
        element.remove();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
