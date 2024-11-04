let id_name = 0;
let id_type = 0;
let id_habitat = 0;
let debounceTimeout;

document.getElementById('poke_name').addEventListener('keyup', function () {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(function () {
        let name_id_filter = document.getElementById('poke_name').value;

        if (name_id_filter !== "") {
            document.getElementById('btn1').onclick = function () {
                //loadpokemon_name(name_id_filter);
                loadPokemon_fragment(name_id_filter);
                document.getElementById('poke_name').innerHTML = "";
            };
        } else {
            document.getElementById('btn1').onclick = null;
        }
    }, 500);
});

document.getElementById('poke_type').addEventListener('keyup', function () {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(function () {
        let type_id_filter = document.getElementById('poke_type').value;

        if (type_id_filter !== "") {
            document.getElementById('btn1').onclick = function () {
                loadType(type_id_filter);
            };
        } else {
            document.getElementById('btn1').onclick = null;
        }
    }, 500);
});

document.getElementById('poke_habitat').addEventListener('keyup', function () {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(function () {
        let habitat_name_id = document.getElementById('poke_habitat').value;

        if (habitat_name_id !== "") {
            document.getElementById('btn1').onclick = function () {
                loadHabitat(habitat_name_id);
            };
        } else {
            document.getElementById('btn1').onclick = null;
        }
    }, 500);
});

function loadpokemon_name(name_id_filter) {
    document.getElementById("container_pokemon_name_fragment").style.display = "none";
    document.getElementById("container_pokemon_type").style.display = "none";
    document.getElementById("container_pokemon_habitat").style.display = "none";
    document.getElementById("container_pokemon_name").style.display = "block";

    document.getElementById("previous").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("previous_t").style.display = "none";
    document.getElementById("next_t").style.display = "none";
    document.getElementById("previous_h").style.display = "none";
    document.getElementById("next_h").style.display = "none";

    let url_pokemon = `https://pokeapi.co/api/v2/pokemon/${name_id_filter}`;
    let url_color = `https://pokeapi.co/api/v2/pokemon-species/${name_id_filter}`

    console.log(url_pokemon);
    console.log(url_color);

    fetch(url_pokemon)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);
            document.getElementById('name_n').innerHTML = data['name'];
            document.getElementById('id_n').innerHTML = "ID: " + data['id'];
            id_name = data['id'];
            console.log('ID: ' + id_name);
            let img = data['sprites']['front_default'];
            document.getElementById('picture_n').setAttribute('src', img);
            document.getElementById('type_n').innerHTML = "Type: " + data['types']['0']['type']['name'];
            document.getElementById('hp_n').innerHTML = "HP: " + data['stats']['0']['base_stat'];
            document.getElementById('attack_n').innerHTML = "Attack: " + data['stats']['1']['base_stat'];
        })
        .catch((erro) => {
            console.log("Erro: " + erro)
        });

    fetch(url_color)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);
            document.getElementById('container_pokemon_name').style.backgroundColor = data['color']['name'];
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        });

    name_id_filter = "";
    document.getElementById('poke_name').value = "";
}

function loadNextPokemon() {
    name_id_filter = "";
    document.getElementById('poke_name').value = "";
    id_name++;
    loadpokemon_name(id_name);
}

function loadPreviousPokemon() {
    name_id_filter = "";
    document.getElementById('poke_name').value = "";
    id_name--;
    if (id_name <= 0) {
        id_name = 1;
        loadpokemon_name(id_name);
    }
    else {
        loadpokemon_name(id_name);
    }
}

function loadPokemon_fragment(name_id_filter) {
    name_id_filter = document.getElementById('poke_name').value.trim().toLowerCase();

    if (name_id_filter === "") {
        document.getElementById("container_pokemon_name").style.display = "none";
        return; // Sai da função se o campo estiver vazio
    }

    document.getElementById("container_pokemon_type").style.display = "none";
    document.getElementById("container_pokemon_habitat").style.display = "none";
    document.getElementById("container_pokemon_name").style.display = "none";
    document.getElementById("container_pokemon_name_fragment").style.display = "block";

    document.getElementById("previous").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("previous_t").style.display = "none";
    document.getElementById("next_t").style.display = "none";
    document.getElementById("previous_h").style.display = "none";
    document.getElementById("next_h").style.display = "none";

    url_pokemon = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

    const ul = document.getElementById("pokemon_name_list");
    ul.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    fetch(url_pokemon)
        .then((response) => response.json())
        .then((data) => {

            data.results.forEach((pokemon) => {
                if (pokemon.name === name_id_filter) {
                    loadpokemon_name(name_id_filter);
                }
                else if (pokemon.name.includes(name_id_filter)) {
                    const li = document.createElement("li");
                    li.textContent = pokemon.name;
                    li.id = pokemon.name;
                    li.onclick = function () {
                        loadpokemon_name(li.id);
                    };
                    ul.appendChild(li);
                }
            });
            if (!found && ul.children.length > 0) {
                document.getElementById("container_pokemon_name_fragment").style.display = "block";
            }

        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    document.getElementById('poke_name').value = "";
}

function loadType(type_id_filter) {
    document.getElementById("container_pokemon_name_fragment").style.display = "none";
    document.getElementById("container_pokemon_type").style.display = "block";
    document.getElementById("container_pokemon_habitat").style.display = "none";
    document.getElementById("container_pokemon_name").style.display = "none";

    document.getElementById("previous").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("previous_t").style.display = "block";
    document.getElementById("next_t").style.display = "block";
    document.getElementById("previous_h").style.display = "none";
    document.getElementById("next_h").style.display = "none";

    let url_type = `https://pokeapi.co/api/v2/type/${type_id_filter}`;

    const ul = document.getElementById("pokemon_list");
    ul.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    fetch(url_type)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);

            id_type = data['id'];
            console.log(id_type);

            document.getElementById('lista_tipo').innerHTML = "Pokémons do tipo: " + data['name'];

            data.pokemon.forEach((pokemonObj) => {
                const li = document.createElement("li");
                li.textContent = pokemonObj.pokemon.name;
                li.id = `${pokemonObj.pokemon.name}`;

                li.onclick = function () {
                    loadpokemon_name(li.id);
                }
                ul.appendChild(li);
            });
        })
        .catch((erro) => {
            console.log("Erro: " + erro)
        });
    type_id_filter = "";
    document.getElementById('poke_type').value = "";
}

function loadNextType() {
    type_id_filter = "";
    document.getElementById('poke_type').value = "";
    id_type++;
    if (id_type >= 18) {
        id_type = 18;
        loadType(id_type);
    }
    else {
        loadType(id_type);
    }
}

function loadPreviousType() {
    type_id_filter = "";
    document.getElementById('poke_type').value = "";
    id_type--;
    if (id_type <= 0) {
        id_type = 1;
        loadType(id_type);
    }
    else {
        loadType(id_type);
    }
}

function loadHabitat(habitat_name_id) {
    document.getElementById("container_pokemon_name_fragment").style.display = "none";
    document.getElementById("container_pokemon_type").style.display = "none";
    document.getElementById("container_pokemon_habitat").style.display = "block";
    document.getElementById("container_pokemon_name").style.display = "none";

    document.getElementById("previous").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("previous_t").style.display = "none";
    document.getElementById("next_t").style.display = "none";
    document.getElementById("previous_h").style.display = "block";
    document.getElementById("next_h").style.display = "block";

    let url_habitat = `https://pokeapi.co/api/v2/pokemon-habitat/${habitat_name_id}`;

    const ul = document.getElementById("pokemon_list_habitat");
    ul.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    fetch(url_habitat)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.clear;
            console.log(data);

            id_habitat = data['id'];
            console.log(id_habitat);

            document.getElementById('lista_habitat').innerHTML = "Pokémons habitat: " + data['name'];

            data.pokemon_species.forEach((pokemonObj) => {
                const li = document.createElement("li");
                li.textContent = pokemonObj.name;
                li.id = `${pokemonObj.name}`;

                li.onclick = function () {
                    loadpokemon_name(li.id);
                }
                ul.appendChild(li);
            });
        })
        .catch((erro) => {
            console.log("Erro: " + erro)
        });

    document.getElementById('poke_habitat').value = "";
}

function loadNextHabitat() {
    habitat_name_id = "";
    document.getElementById('poke_habitat').value = "";
    id_habitat++;
    if (id_habitat >= 9) {
        id_habitat = 9;
        loadHabitat(id_habitat);
    }
    else {
        loadHabitat(id_habitat);
    }
}

function loadPreviousHabitat() {
    habitat_name_id = "";
    document.getElementById('poke_habitat').value = "";
    id_habitat--;
    if (id_habitat <= 0) {
        id_habitat = 1;
        loadHabitat(id_habitat);
    }
    else {
        loadHabitat(id_habitat);
    }
}

document.getElementById('next').onclick = loadNextPokemon;
document.getElementById('previous').onclick = loadPreviousPokemon;

document.getElementById('next_t').onclick = loadNextType;
document.getElementById('previous_t').onclick = loadPreviousType;

document.getElementById('next_h').onclick = loadNextHabitat;
document.getElementById('previous_h').onclick = loadPreviousHabitat;