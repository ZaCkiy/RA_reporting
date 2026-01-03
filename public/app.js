let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

function login() {
  const user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  window.location.href = "dashboard.html";
}

function addRoom() {
  const room = {
    number: document.getElementById("roomNumber").value,
    status1: document.getElementById("roomStatus").value,
    timeIn: null,
    timeOut: null,
    summary: {
      handuk: 0,
      linen: 0,
      amenities: 0
    },
    finished: false
  };

  rooms.push(room);
  saveRooms();
  renderRooms();
}

function renderRooms() {
  const list = document.getElementById("roomList");
  if (!list) return;

  list.innerHTML = "";
  rooms.forEach((r, i) => {
    const li = document.createElement("li");
    li.innerText = r.number + " - " + r.status1 + (r.finished ? " ✔" : "");
    li.onclick = () => {
      localStorage.setItem("currentRoom", i);
      window.location.href = "room.html";
    };
    list.appendChild(li);
  });
}

function timeIn() {
  const i = localStorage.getItem("currentRoom");
  rooms[i].timeIn = new Date().toLocaleTimeString();
  saveRooms();
}

function timeOut() {
  const i = localStorage.getItem("currentRoom");
  rooms[i].timeOut = new Date().toLocaleTimeString();
  saveRooms();
}

function updateItem(item, value) {
  const i = localStorage.getItem("currentRoom");
  rooms[i].summary[item] += value;
  saveRooms();
}

function endRoom() {
  const i = localStorage.getItem("currentRoom");
  rooms[i].finished = true;
  saveRooms();
  window.location.href = "dashboard.html";
}

function saveRooms() {
  localStorage.setItem("rooms", JSON.stringify(rooms));
}

renderRooms();
