const BASE_URL = "http://localhost:5000/api";

const cupcakeList = $("#cupcakes-list");

async function loadCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);
  const data = response.data.cupcake;
  renderCupcake(data);
}

function renderCupcake(cupcakes) {
  for (let i = 0; i < cupcakes.length; i++) {
    const cupcake = `
    <div data-cupcake-id=${cupcakes[i].id}>
    <li><div>Flavor: ${cupcakes[i].flavor}</div>
    <div>Size: ${cupcakes[i].size}</div>
    <div>Rating: ${cupcakes[i].rating}</div>
    <img src="${cupcakes[i].image}" alt="${cupcakes[i].flavor} cupcake" class="cupcake-img">
    <button class="delete-btn">X</button></li>
    </div>`;
    cupcakeList.append(cupcake);
  }
}

$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();
  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    size,
    rating,
    image,
  });
  let newCupcake = $(renderCupcake(newCupcakeResponse.data.cupcake));
  cupcakeList.append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});

cupcakeList.on("click", ".delete-btn", async function (evt) {
  evt.preventDefault();
  const cupcake = $(evt.target).closest("div");
  const cupcakeId = $(cupcake).attr("data-cupcake-id");
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $(cupcake).remove();
});

loadCupcakes();
