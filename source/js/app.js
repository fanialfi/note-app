function resetDataDom(judul, content) {
  judul.value = "";
  content.value = "";
  return;
}

const data = "DATA_APP";
class SyncLocalStorage {
  #dataLocalStorage = JSON.parse(localStorage.getItem(data)) || [];
  // constructor() {
  //   this.#dataLocalStorage = JSON.parse(localStorage.getItem(data)) || [];
  // }

  sync(method, judul, isi) {
    switch (method) {
      case "ADD":
        this.#dataLocalStorage.push({ judul, isi });
        localStorage.setItem(data, JSON.stringify(this.#dataLocalStorage));
        break;
      case "DELETE":
        this.#dataLocalStorage.forEach((valueObj, index) => {
          if (judul == valueObj.judul) {
            this.#dataLocalStorage.splice(index, 1);

            try {
              localStorage.setItem(
                data,
                JSON.stringify(this.#dataLocalStorage)
              );
            } catch (error) {
              console.log(`gagal meng update data : ${error.message}`);
            }
            return;
          }
        });
        break;
      default:
        console.log(`perintah tidak di kenali`);
        break;
    }
  }

  get getDataLocalStorage() {
    return this.#dataLocalStorage;
  }
  set setDataLocalStorage(value) {
    if (Array.isArray(value)) {
      try {
        return (this.#dataLocalStorage = value);
      } catch (error) {
        console.log(`gagal meng update data ${error.message}`);
      }
    }
  }
}

function createElement(element, content) {
  const elmnt = document.createElement(element);
  elmnt.textContent = content;
  return elmnt;
}

function saveElement(judul, isi) {
  const boxContent = document.createElement("div");
  boxContent.classList.add("box");

  const btn = createElement("button", "delete");

  boxContent.append(judul, isi, btn);
  return boxContent;
}

export { SyncLocalStorage, resetDataDom, createElement, saveElement };
