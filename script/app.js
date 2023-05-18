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
        break;
    }
  }

  get getDataLocalStorage() {
    return this.#dataLocalStorage;
  }
}
const localStorageFake = new SyncLocalStorage();
